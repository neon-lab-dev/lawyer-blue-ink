import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex h-full flex-col justify-center items-center p-2 w-full ">
      <div className="text-9xl ">404</div>
      <div className="mt-7 text-2xl text-center">
        The page you are looking for was not found
      </div>
      <Link className="text-blue-500 mt-3 text-center underline" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export default Error404;
