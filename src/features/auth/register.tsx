import { RegisterForm } from './register-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <>
      <RegisterForm
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
            replace: true,
          })
        }}
      />
    </>
  )
}