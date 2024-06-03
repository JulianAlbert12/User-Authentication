// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './Register';
import SignIn from './SignIn';

function App() {
    return (
        <Router>
            <main className="App">
                <Routes>
                    <Route path="/User-Authentication" element={<SignIn />} />
                    <Route path="/register" element={<Register />}/>
                </Routes>
            </main>
        </Router>
    );
}

export default App;
