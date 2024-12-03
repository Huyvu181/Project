import { createBrowserRouter, useNavigate, Navigate } from 'react-router-dom';
import { RegisterForm } from '../features/auth/register-form';
import { Dashboard } from '../components/layouts/dashboard-layout';
import { ProfileRoute } from '../features/profile/profile.tsx';
import NotFound from '../components/NotFound.tsx';
import { LoginRoute } from '../features/auth/login.tsx';
import { ProductDetail } from '../features/book/components/ProductsDetail.tsx';

const RegisterRoute = () => {
	const navigate = useNavigate();
	const handleRegisterSuccess = () => navigate('/auth/login');

	return <RegisterForm onSuccess={handleRegisterSuccess} />;
};


const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/auth/login" replace />,
	},
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
		path: '/products/:id',
		element: <ProductDetail />,
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