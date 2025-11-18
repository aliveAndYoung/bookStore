import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../api/bookApi';
import { DEFAULT_BOOK_COVER } from '../utils/constants';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  // Format the date
  const formattedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="card hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={DEFAULT_BOOK_COVER} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 p-2">
          <span className="badge badge-genre">
            {book.genre}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 truncate">{book.title}</h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[var(--primary)] font-bold">${book.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">ISBN: {book.ISBN}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">Published: {formattedDate}</p>
        <Link 
          to={`/books/${book._id}`} 
          className="btn btn-primary w-full text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;