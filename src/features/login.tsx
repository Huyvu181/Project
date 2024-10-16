import { useState } from "react";
import { login } from './auth/authService';

const LoginForm = ({ onSwitchToRegister }: { onSwitchToRegister: () => void }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await login(email, password);
			console.log('Login success:', response);
		} catch (err) {
			setError('Login failed');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<p>Login</p>

			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}

				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}

				/>
			</div>
			<button type="submit">Login</button>

			<a href="#" className="register-link" onClick={onSwitchToRegister}>
				Register
			</a>
		</form>
	);
};

export default LoginForm;
