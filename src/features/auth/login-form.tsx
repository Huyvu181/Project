import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { LoginInput, useLogin } from '../../lib/auth';
import { useSearchParams } from 'react-router-dom';

type LoginFormProps = {
	onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	// const login = useLogin({ onSuccess, onError: (e) => { console.log('on error', e) } });
	const login = useLogin({
		onSuccess: (userData) => {
			console.log('Logged in successfully:', userData);
			localStorage.setItem('token', userData.token);
			localStorage.setItem('user', JSON.stringify(userData.user));

			onSuccess();
		},
		onError: (error) => {
			console.error('Login error:', error);
		},
	});

	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');
	const navigate = useNavigate();


	return (
		<div className="flex items-center justify-center min-h-screen overflow-hidden">
			<div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md" id="Loginform">
				<h2 className="text-center text-2xl font-bold mb-6">Log in to your account</h2>
				<Form onSubmit={(values) => login.mutate(values, navigate)}>
					{({ register, formState }) => (
						<>
							<div className="mb-4">
								<Input
									type="email"
									placeholder="Email Address"
									error={formState.errors['email']?.message as string | undefined}
									registration={register('email', { required: 'Email is required' })}
									className="mb-2"
								/>
							</div>
							<div className="mb-6">
								<Input
									type="password"
									placeholder="Password"
									error={formState.errors['password']?.message as string | undefined}
									registration={register('password', { required: 'Password is required' })}
									className="mb-2 my-4"
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white py-2 rounded hover:bg-gray-800 transition"
							>
								Log in
							</button>
						</>
					)}
				</Form>

				<div className="border-t border-gray-300 my-4"></div>

				<div className="mt-4 text-center rounded-lg py-1 hover:text-slate-50 transition cursor-pointer" style={{ background: "#00a400" }}>
					<Link
						to={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className="hover:text-slate-50 transition"
						style={{ textDecoration: 'none' }}
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};
