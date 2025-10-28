import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary Root layout component for the application
 * @domain core
 * @type layout-component
 * @category layout
 *
 * @description
 * Provides the base layout structure for all pages.
 * Contains header with navigation, main content area, and footer.
 */
export const RootLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de Provas de Geografia - 6º Ano
            </h1>
            <nav className="flex gap-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Início
              </Link>
              <Link
                to="/questions"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive('/questions')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Questões
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 Sistema de Provas de Geografia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
