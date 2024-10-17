import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { useRegister, registerInputSchema } from '../../lib/auth';

type RegisterFormProps = {
	onSuccess: () => void;

}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
	const { register, handleSubmit, formState, watch } = useForm({
		resolver: zodResolver(registerInputSchema), // Sử dụng zod để validate form
		shouldUnregister: true,
	});

	const passwordValue = watch('password'); // Lấy giá trị của trường password
	const registering = useRegister({ onSuccess });
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');

	return (
		<div>
			<Form
				onSubmit={handleSubmit((values) => {
					registering.mutate(values);
				})}
			>
				{() => (
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
						<Input
							type="password"
							label="Confirm Password"
							error={formState.errors['confirmPassword']?.message as string | undefined}
							registration={register('confirmPassword', {
								required: 'Confirm password is required',
								validate: (value) => value === passwordValue || 'Passwords do not match',
							})}
						/>
					</>
				)}
			</Form>
			<div className="mt-2 flex items-center justify-end">
				<div className=" text-sm">
					<Link
						to={`auth/register${redirectTo ? `redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
						className="font-medium text-blue-400"
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
