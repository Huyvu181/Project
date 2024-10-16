import { useState } from 'react';
import './App.css'
import { LoginForm } from './features/auth/login-form';
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
        <LoginForm onSuccess={handleSwitchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
      )}
    </div>
  )
}

export default App
