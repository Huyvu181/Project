import { Link, useSearchParams } from 'react-router-dom';
// import { useLogin } from '../../hook/useLogin';
import { Form } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { useLogin } from '../../lib/auth';
type LoginFormProps = {
	onSuccess: () => void,
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	const login = useLogin({onSuccess});
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');


	return (
		<div>
			<Form onSubmit={(values) => login.mutate(values)}>
				{({ register, formState }) => (
					<>
						<Input
							type="email"
							label="Email Address"
							error={formState.errors['email']?.message as string | undefined}
							registration={register('email', { required: 'Email is required' })}
						/>
						<Input
							type="password"
							label="Password"
							error={formState.errors['password']?.message as string | undefined}
							registration={register('password', { required: 'Password is required' })}
						/>

						<div>
							<button type="submit">Login</button>
						</div>
					</>
				)}
			</Form>
			<div className="mt-2 flex items-center justify-end">
				<div className="text-sm">
					<Link
						to={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}