import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="!bg-primary-900 !text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            </div>
            <h1 className="text-2xl font-bold">Smart Skills</h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-primary-300 transition-colors">Help</Link>
          </nav>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};