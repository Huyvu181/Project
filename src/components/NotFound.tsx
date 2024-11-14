import { Link, useSearchParams } from "react-router-dom";

const NotFound = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      <h1>404 Not Found</h1>
      <Link
        to={`/dashboard${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
        className=" hover:text-gray-700 transition"
        style={{ textDecoration: 'none' }}>

        Return to Homepage
      </Link>

    </div>
  );
};

export default NotFound;
