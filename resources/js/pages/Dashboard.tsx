import { Head, router, usePage } from '@inertiajs/react';
import type { SharedProps } from '@inertiajs/react';

interface Props extends SharedProps {
  // add more props later (e.g. recent orders, stats)
}

export default function Dashboard() {
  const { auth } = usePage<Props>().props;
  const user = auth.user;

  const triggerSsoToFoodpanda = () => {
    router.post('/sso/foodpanda', {}, {
      preserveState: false,
    });
  };

  const handleLogout = () => {
    router.post('/logout');
  };

  return (
    <>
      <Head title="Dashboard" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {import.meta.env.VITE_APP_NAME || 'Dashboard'}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300">
                Welcome, <strong>{user?.name || 'Guest'}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout from Ecommerce
              </button>
            </div>
          </div>
        </header>

        {/* main content */}
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-2xl font-semibold mb-4">
                Hello, {user?.name}!
              </h2>

              {/* quick stats / cards */}
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Welcome to Ecommerce Dashboard, {user?.name}!
                </h1>

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  You are logged in as <strong>{user?.email}</strong>. This is the central app.
                </p>

                <p className="mb-6 text-green-600 dark:text-green-400 font-medium">
                  To auto-login to Foodpanda (no re-entering credentials), click below:
                </p>

                <button
                  onClick={triggerSsoToFoodpanda}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-4"
                >
                  Login to Foodpanda via SSO
                </button>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
