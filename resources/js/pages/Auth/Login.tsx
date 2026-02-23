import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

interface Props {
  errors: Record<string, string>;
  status?: string;
}

export default function Login({ errors, status }: Props) {
  const { data, setData, post, processing, reset } = useForm({
    email: '',
    password: '',
    remember: true,
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post('/login', {
      onSuccess: () => reset('password'),
      preserveScroll: true,
    });
  };

  return (
    <>
      <Head title="Log in - Ecommerce" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* logo / brand */}
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Ecommerce
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
            {status && (
              <div className="mt-4 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                {status}
              </div>
            )}
          </div>

          {/* card */}
          <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <form className="space-y-6" onSubmit={submit}>
              {/* email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 transition duration-150"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              {/* password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 transition duration-150"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
              </div>

              {/* remember me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* submit */}
              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition duration-150 shadow-md"
                >
                  {processing ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}