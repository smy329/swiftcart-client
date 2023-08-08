import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { checkUserAsync } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { USER_EMAIL, USER_PASSWORD } from '../../constants/Constants';

const Login = () => {
  const { isError, isLoading, error, loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let from = location?.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    console.log(data);
    dispatch(checkUserAsync({ email: data.email, password: data.password }));
    if (loggedInUser) {
      navigate(from, { replace: true });
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {loggedInUser?.email}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'Email address is not valid',
                  },
                })}
                autoComplete="email"
                defaultValue={USER_EMAIL}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>

            <div className="mt-2">
              <input
                id="password"
                {...register('password', {
                  required: 'Please give a strong password',
                  pattern: {
                    value:
                      /^(?=[\x21-\x7E]*[0-9])(?=[\x21-\x7E]*[A-Z])(?=[\x21-\x7E]*[a-z])(?=[\x21-\x7E]*[\x21-\x2F|\x3A-\x40|\x5B-\x60|\x7B-\x7E])[\x21-\x7E]{6,}$/,
                    message: (
                      <>
                        <ul className="list-disc list-inside">
                          <li>Minimum one [a-z]</li>
                          <li>Minimum one [A-Z]</li>
                          <li>Minimum one [0-9]</li>
                          <li>Minimum one alphanumeric character</li>
                          <li>6 or more length</li>
                        </ul>
                      </>
                    ),
                  },
                })}
                type="password"
                autoComplete="current-password"
                defaultValue={USER_PASSWORD}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <p className="text-red-500 text-center text-sm font-semibold"> {error}</p>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in to Swift Cart
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
