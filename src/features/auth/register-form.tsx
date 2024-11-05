import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { useRegister, registerInputSchema } from '../../lib/auth';

type RegisterFormProps = {
	onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
	const { register, handleSubmit, formState, watch } = useForm({
		resolver: zodResolver(registerInputSchema),
		shouldUnregister: true,
	});

	const passwordValue = watch('password');
	const registering = useRegister({ onSuccess });
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

				<Form
					onSubmit={handleSubmit((values) => {
						registering.mutate(values);
					})}
				>
					{() => (
						<div className="space-y-4">
							<Input
								type="email"
								label="Email Address"
								error={formState.errors['email']?.message as string | undefined}
								registration={register('email', { required: 'Email is required' })}
								className="w-full"
							/>
							<Input
								type="password"
								label="Password"
								error={formState.errors['password']?.message as string | undefined}
								registration={register('password', { required: 'Password is required' })}
								className="w-full"
							/>
							<Input
								type="password"
								label="Confirm Password"
								error={formState.errors['confirmPassword']?.message as string | undefined}
								registration={register('confirmPassword', {
									required: 'Confirm password is required',
									validate: (value) => value === passwordValue || 'Passwords do not match',
								})}
								className="w-full"
							/>

							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
							>
								Register
							</button>
						</div>
					)}
				</Form>

				<div className="mt-4 text-center">
					<Link
						to={`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className="text-blue-600 hover:text-blue-500"
						style={{ textDecoration: 'none' }}
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};
