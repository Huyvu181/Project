import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { AuthResponse, User } from '../type/api';
import axios from 'axios';
import { api } from './api-client';

// API call definitions for authentication
const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

// // Login API request function
// const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
//   return api.post('http://localhost:3000/auth/login', data);
// };

// Registration input validation schema
const baseSchema = z.object({
  email: z.string().min(1, 'Required'),
  firstname: z.string().min(1, 'Required'),
  lastname: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
  confirmPassword: z.string().min(1, 'Required'),
});

// Register input schema validation
export const registerInputSchema = baseSchema.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

// Registration API request 
const registerWithEmailAndPassword = (data: RegisterInput): Promise<AuthResponse> => {
  const { email, firstname, lastname, password } = data;
  return api.post('http://localhost:3000/auth/register', { email, firstname, lastname, password });
};


// Login 
const loginFn = async (data: LoginInput) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', data);
    console.log(response.data);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); 
      return response.data.user;
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Invalid credentials');
  }
};




// Auth config for react-query-auth
const authConfig = {
  userFn: getUser,
  loginFn,
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth(authConfig);

// redirect user chưa xác thực
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useUser();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <>{children}</>;
};
