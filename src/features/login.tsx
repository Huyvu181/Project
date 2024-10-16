import { login } from './auth/authService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm } from "./auth/login-form";

export const LoginRoute = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');

	return (

		<LoginForm
			onSuccess={() =>
				navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
					replace: true,
				})
			}
		/>

	);
};
