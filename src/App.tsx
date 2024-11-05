import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import { LoginForm } from './features/auth/login-form';
import { RegisterForm } from './features/auth/register-form';
import { Dashboard } from './components/layouts/dashboard-layout';
// import ErrorBoundary from './components/ErrorBoundary.tsx';
import NotFound from './components/NotFound.tsx';


const TestForm = () => {
  return (
    <div className="form-container">
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


const LoginRoute = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = () => navigate('/dashboard');

  return <LoginForm onSuccess={handleLoginSuccess} />;
};


const RegisterRoute = () => {
  const navigate = useNavigate();
  const handleRegisterSuccess = () => navigate('/auth/login');

  return <RegisterForm onSuccess={handleRegisterSuccess} />;
};


const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <LoginRoute />,
  },
  {
    path: '/auth/register',
    element: <RegisterRoute />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

    </>
  )

}

export default App;
