import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const SignIn = () => {
    const userRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
            console.log(userCredential);
            setSuccess(true);
            setEmail('');
            setPwd('');
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setErrMsg("Password is incorrect.");
            } else {
                console.error(error);
                setErrMsg(error.message);
                errRef.current.focus();
            }
        }
    }

    const togglePwdVisibility = () => {
        setShowPwd(prevState => !prevState);
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/">Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">
                            Password:
                        </label>
                        <div className="password-container">
                            <input
                                type={showPwd ? "text" : "password"}
                                id="password"
                                ref={pwdRef}
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePwdVisibility}
                            >
                                {showPwd ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button>Sign In</button>
                    </form>
                    <p className="register-prompt">
                        Need an account?
                        <span className="register-link">
                            <Link to="/register">Register</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default SignIn;
