import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../features/auth/register-form';
import { Dashboard } from '../components/layouts/dashboard-layout';
import { ProfileRoute } from './app/profile.tsx';
import NotFound from '../components/NotFound.tsx';
import { LoginRoute } from '../features/auth/login.tsx';

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