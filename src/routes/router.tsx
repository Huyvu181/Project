import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/login-form';
import { RegisterForm } from '../features/auth/register-form';
import { Dashboard } from '../components/layouts/dashboard-layout';
import { ProfileRoute } from './app/profile.tsx';
import NotFound from '../components/NotFound.tsx';

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

	{
		path: '/profile',
		element: <ProfileRoute />,
	}
]);

export {
	router
}