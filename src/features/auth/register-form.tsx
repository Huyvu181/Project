import { Link, useSearchParams } from 'react-router-dom';
import { Form } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { useRegister, registerInputSchema } from '../../lib/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RegisterFormProps = {
	onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
	const [passwordValue, setPasswordValue] = useState('');
	const registering = useRegister({ onSuccess });
	// const registering = useRegister({ onSuccess: () => alert('redirect') });
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');

	// const handleRegister = async (data: any) => {
	// 	try {
	// 		// Gửi yêu cầu POST đến API backend
	// 		const response = await axios.post('http://localhost:3000/auth/register', data);
	// 		alert('Đăng ký thành công');
	// 		onSuccess();
	// 	} catch (error: any) {
	// 		alert('Đăng ký thất bại: ' + error.response?.data?.error);
	// 	}
	// };


	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" id="RegisterForm">
				<h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

				<Form
					onSubmit={(values) => {
						registering.mutate(values)
					}}
					schema={registerInputSchema}
				>
					{({ register, watch, formState }) => {

						useEffect(() => {
							setPasswordValue(watch('password'));
						}, [watch('password')]);

						return (
							<>
								<Input
									type="text"
									placeholder="First Name"
									error={formState.errors.firstname?.message}
									registration={register('firstname', { required: 'First Name is required' })}
									className="w-full"
								/>
								<Input
									type="text"
									placeholder="Last Name"
									error={formState.errors.lastname?.message}
									registration={register('lastname', { required: 'Last Name is required' })}
									className="w-full"
								/>
								<Input
									type="email"
									placeholder="Email Address"
									error={formState.errors.email?.message}
									registration={register('email', { required: 'Email is required' })}
									className="w-full"
								/>
								<Input
									type="password"
									placeholder="Password"
									error={formState.errors.password?.message}
									registration={register('password', { required: 'Password is required' })}
									className="w-full"
								/>
								<Input
									type="password"
									placeholder="Confirm Password"
									error={formState.errors.confirmPassword?.message}
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
							</>
						);
					}}
				</Form>

				<div className="border-t border-gray-300 my-4"></div>

				<div className="mt-4 text-center bg-blue-500 rounded-lg py-1 hover:text-slate-50 transition cursor-pointer">
					<Link
						to={`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className="hover:text-slate-50 transition"
						style={{ textDecoration: 'none' }}
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};
