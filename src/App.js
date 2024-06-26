import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './Register';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import Home from './Home';


function App() {
    return (
        <Router>
            <main className="App">
                <Routes>
                    <Route path="/User-Authentication" element={<SignIn />} />
                    <Route path="/register" element={<Register />}/>
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/home" element={<Home />} /> {/* Add this line */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
