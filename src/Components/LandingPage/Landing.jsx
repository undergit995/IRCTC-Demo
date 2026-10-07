import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
    const navigate = useNavigate();

    function fun1(e) {
        e.preventDefault();
        console.log("Login");
        navigate('/login', { replace: true });
    }

    function fun2(e) {
        e.preventDefault();
        console.log("Sign Up");
        navigate('/signIn', { replace: true });
    }

    return (
        <div className="landing-container">
            <header className="landing-navbar">
                <div className="landing-logo">
                    <h2>IRCTC</h2>
                </div>
                <div className="landing-nav-actions">
                    <button className="landing-btn" onClick={fun1}>
                        <a href="/login" onClick={(e) => e.preventDefault()}>Login</a>
                    </button>
                    <button className="landing-btn" onClick={fun2}>
                        <a href="/signIn" onClick={(e) => e.preventDefault()}>Sign Up</a>
                    </button>
                </div>
            </header>

            <main className="landing-content">
                <p className="landing-welcome">
                    Welcome
                </p>
            </main>
        </div>
    );
}