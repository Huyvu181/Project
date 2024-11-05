import { Link, useSearchParams } from 'react-router-dom';
import { Form } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { useLogin } from '../../lib/auth';

type LoginFormProps = {
	onSuccess: () => void,
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	const login = useLogin({ onSuccess });
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-center text-2xl font-bold mb-6">Log in to your account</h2>
				<Form onSubmit={(values) => login.mutate(values)}>
					{({ register, formState }) => (
						<>
							<div className="mb-4">
								<Input
									type="email"
									label="Email Address"
									error={formState.errors['email']?.message as string | undefined}
									registration={register('email', { required: 'Email is required' })}
									className="mb-2"
								/>
							</div>
							<div className="mb-6">
								<Input
									type="password"
									label="Password"
									error={formState.errors['password']?.message as string | undefined}
									registration={register('password', { required: 'Password is required' })}
									className="mb-2"
								/>
							</div>
							<button
								type="submit"
								className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
							>
								Log in
							</button>
						</>
					)}
				</Form>
				<div className="mt-4 text-center">
					<Link
						to={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className="text-blue-600 hover:text-blue-500"
						style={{ textDecoration: 'none' }}
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};
