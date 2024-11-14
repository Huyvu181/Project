import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm } from "./login-form";

export const LoginRoute = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo') || '/dashboard'; 

	return (
		<LoginForm
			onSuccess={() => navigate(redirectTo, { replace: true })} 
		/>
	);
};
