// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './Register';
import SignIn from './SignIn';

function App() {
    return (
        <Router>
            <main className="App">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    {/* Add other routes here */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
