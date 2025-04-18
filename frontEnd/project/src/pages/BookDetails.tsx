import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBook } from '../api/bookApi';
import { Book } from '../api/bookApi';
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import { DEFAULT_BOOK_COVER } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { deleteBook } from '../api/bookApi';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAdmin, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const bookData = await getBook(id);
          setBook(bookData);
        }
      } catch (error) {
        console.error('Failed to fetch book:', error);
        toast.error('Failed to load book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      setIsDeleting(true);
      if (id && token) {
        await deleteBook(id, token);
        toast.success('Book deleted successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to delete book:', error);
      toast.error('Failed to delete book. Please try again later.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Book Not Found</h2>
        <p className="mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="flex items-center text-[var(--primary)] hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Books
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <img 
              src={DEFAULT_BOOK_COVER} 
              alt={book.title} 
              className="w-full h-80 object-cover rounded-md"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
              </div>
              
              {isAdmin && (
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/books/edit/${book._id}`}
                    className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors duration-200"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-[var(--primary)]">
                ${book.price.toFixed(2)}
              </span>
              <span className="ml-4 badge badge-genre">{book.genre}</span>
            </div>
            
            <div className="mb-6">
              <div className="mb-2">
                <span className="font-semibold">ISBN:</span> {book.ISBN}
              </div>
              <div>
                <span className="font-semibold">Published:</span> {formattedDate}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">
                This is a detailed description of the book. Information about the plot, characters, 
                and themes would go here. Since we don't have a description field in our database yet, 
                this is placeholder text.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;