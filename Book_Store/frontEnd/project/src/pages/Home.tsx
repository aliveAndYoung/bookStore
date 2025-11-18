import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/bookApi';
import { Book } from '../api/bookApi';
import BookCard from '../components/BookCard';
import { BookOpen, Search } from 'lucide-react';
import { BOOK_GENRES } from '../utils/constants';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
        setFilteredBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch books:', error);
        toast.error('Failed to load books. Please try again later.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books based on search term and selected genre
    let result = books;
    
    if (searchTerm) {
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.ISBN.includes(searchTerm)
      );
    }
    
    if (selectedGenre) {
      result = result.filter(book => book.genre === selectedGenre);
    }
    
    setFilteredBooks(result);
  }, [searchTerm, selectedGenre, books]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[var(--primary)] text-white rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-gray-200 mb-6">
              Browse our extensive collection of books across various genres.
              Find the perfect read for your next adventure.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-2 px-4 pl-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <BookOpen className="h-32 w-32 text-white opacity-90" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-gray-800">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Available
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="">All Genres</option>
            {BOOK_GENRES.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {(searchTerm || selectedGenre) && (
            <button
              onClick={clearFilters}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button onClick={clearFilters} className="btn btn-primary mt-4">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;