import React from 'react';
import { Link } from 'react-router-dom';
import { BookX } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-[var(--primary)] mb-6">
        <BookX className="h-24 w-24" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-[var(--primary-dark)]">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md text-center mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;