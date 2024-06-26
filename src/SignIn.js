import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing user inputs

const SignIn = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false); 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus(); // Automatically focus the email input on component mount
    }, []);

    useEffect(() => {
        setErrMsg(''); // Clear error message when email or password changes
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation for email format
        if (!/\S+@\S+\.\S+/.test(email)) { // Validate email format
            setErrMsg('Invalid email format');
            return;
        }

        try {
            // Attempt to sign in with email and password
            const userCredential = await signInWithEmailAndPassword(auth, DOMPurify.sanitize(email), DOMPurify.sanitize(pwd));
            console.log(userCredential);

            // Check if the user's email is verified before allowing login
            if (!userCredential.user.emailVerified) {
                setErrMsg("Please verify your email before logging in.");
                return;
            }

            setSuccess(true); // Set login success
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
                        <Link to="/home">Go to Home</Link>
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

                        <button className="sign-in-button">Sign In</button>
                    </form>
                    <div className="register-prompt">
                    <Link to="/forgotpassword" className="forgot-password">Forgot Password?</Link>
                    </div>
                    <hr></hr>
                    <div className="register-prompt">
                        <p>Don't have an account?</p>
                        <Link to="/register" className="register-link">Create New</Link>
                    </div>
                </section>
            )}
        </>
    );
}

export default SignIn;
