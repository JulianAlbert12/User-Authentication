import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; // Import sendPasswordResetEmail
import { auth } from "./firebase";
import DOMPurify from 'dompurify';

const SignIn = () => {
    const userRef = useRef();
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

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, DOMPurify.sanitize(email)); // Send password reset email
            setErrMsg('Password reset email sent. Check your inbox.'); // Inform user
        } catch (error) {
            console.error(error);
            setErrMsg(error.message); // Handle error
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/\S+@\S+\.\S+/.test(email)) { 
            setErrMsg('Invalid email format');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, DOMPurify.sanitize(email), DOMPurify.sanitize(pwd));
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
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <button type="button" className="password-toggle" onClick={() => setShowPwd(!showPwd)}>
                                {showPwd ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button>Sign In</button>
                    </form>
                    <button className="forgot-password" onClick={handleForgotPassword}>Forgot your password?</button>

                <hr></hr>

                    <div className="register-prompt">
                        <p>Need an account?</p>
                        <Link to="/register" className="register-link">Register</Link>
                    </div>
                </section>
            )}
        </>
    );
}

export default SignIn;
