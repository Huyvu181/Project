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
	const { register, formState, watch } = useForm({
		resolver: zodResolver(registerInputSchema),
		shouldUnregister: true,
	});

	const passwordValue = watch('password');
	const registering = useRegister({ onSuccess });
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100" >
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md " id='Registerform'>
				<h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

				<Form
					onSubmit={((values) => { registering.mutate(values) })}
				>
					{({ register, formState, watch }) => (
						<div className="space-y-4">
							<Input
								type="first name"
								placeholder='First Name'
								error={formState.errors['first name']?.message as string | undefined}
								registration={register('first name', { required: 'First Name is required' })}
								className="w-full"
							/>
							<Input
								type="last name"
								placeholder='Last Name'
								error={formState.errors['last name']?.message as string | undefined}
								registration={register('last name', { required: 'Last Name is required' })}
								className="w-full"
							/>
							<Input
								type="email"
								placeholder='Email Address'
								error={formState.errors['email']?.message as string | undefined}
								registration={register('email', { required: 'Email is required' })}
								className="w-full"
							/>
							<Input
								type="password"
								placeholder='Password'
								error={formState.errors['password']?.message as string | undefined}
								registration={register('password', { required: 'Password is required' })}
								className="w-full"
							/>
							<Input
								type="password"
								placeholder='Confirm Password'
								error={formState.errors['confirmPassword']?.message as string | undefined}
								registration={register('confirmPassword', {
									required: 'Confirm password is required',
									validate: (value) => value === passwordValue || 'Passwords do not match',
								})}
								className="w-full"
							/>

							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
								style={{ background: "#00a400", color: "#fff" }}
							>
								Register
							</button>
						</div>
					)}
				</Form>

				<div className='border-t border-gray-300 my-4'></div>

				<div className="mt-4 text-center bg-blue-500 rounded-lg py-1 hover:text-slate-50 transition cursor-pointer">
					<Link
						to={`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className=" hover:text-slate-50 transition"
						style={{ textDecoration: 'none' }}
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};
