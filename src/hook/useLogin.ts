  import { useMutation } from '@tanstack/react-query';

async function loginUser(values: { email: string; password: string }) : Promise<any>{
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}


export function useLogin(onSuccess: () => void) {
	return useMutation({
	  mutationFn: loginUser, 
	  onSuccess,            
	});
  }
