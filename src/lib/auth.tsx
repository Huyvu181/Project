import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { AuthResponse, User } from '../type/api';
import axios from 'axios';
import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

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
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  console.log('Data sent to server:', data);
  return api.post('http://localhost:3000/auth/login', data);
};


const baseSchema = z.object({
  email: z.string().min(1, 'Required'),
  firstname: z.string().min(1, 'Required'),
  lastname: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
  confirmPassword: z.string().min(1, 'Required'),
});

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



const registerWithEmailAndPassword = (data: RegisterInput): Promise<AuthResponse> => {

  const { email, firstname, lastname, password } = data;

  console.log({ firstname, lastname, email, password });

  return api.post('http://localhost:3000/auth/register', { email, firstname, lastname, password });
};

//

const loginFn = async (data: LoginInput) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', data);
    if (response.status === 200) {

      localStorage.setItem('token', response.data.token);
      return response.data.user;
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Invalid credentials');
  }
};

const authConfig = {
  userFn: getUser,
  loginFn,
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
