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
		<div className="flex items-center justify-center min-h-screen overflow-hidden " >
			<div className=" bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md " id='Loginform'>
				<h2 className="text-center text-2xl font-bold mb-6">Log in to your account</h2>
				<Form onSubmit={(values) => login.mutate(values)}>
					{({ register, formState }) => (
						<>
							<div className="mb-4 ">
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
									registration={{}}
									icon={<svg xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										width="25"
										height="15">
										<path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>}
									className="mb-2 my-4"
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white py-2  rounded hover:bg-gray-800 transition"
							>
								Log in
							</button>
						</>
					)}
				</Form>

				<div className='border-t border-gray-300 my-4'></div>

				<div className="mt-4 text-center rounded-lg py-1 hover:text-slate-50 transition cursor-pointer" style={{ background: "00a400" }}>
					<Link
						to={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className=" hover:text-slate-50 transition"
						style={{ textDecoration: 'none' }}
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};
