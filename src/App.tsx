import { useState } from 'react';
import './App.css'
import LoginForm from './features/login'
import RegisterForm from './features/register';
function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToRegister = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };
  return (
    <div className="App">
      <h1>{isLogin}</h1>
      {isLogin ? (
        <LoginForm onSwitchToRegister={handleSwitchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
      )}
    </div>
  )
}

export default App
