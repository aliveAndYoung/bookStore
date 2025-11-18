import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getBook, updateBook, BookFormData } from '../../api/bookApi';
import { BOOK_GENRES } from '../../utils/constants';
import toast from 'react-hot-toast';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    price: 0,
    ISBN: '',
    publishedDate: '',
    genre: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { token } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const bookData = await getBook(id);
          // Format date for the input
          const formattedDate = new Date(bookData.publishedDate)
            .toISOString()
            .split('T')[0];
          
          setFormData({
            title: bookData.title,
            author: bookData.author,
            price: bookData.price,
            ISBN: bookData.ISBN,
            publishedDate: formattedDate,
            genre: bookData.genre,
          });
        }
      } catch (error) {
        console.error('Failed to fetch book:', error);
        toast.error('Failed to load book data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [id]);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.ISBN.trim()) {
      newErrors.ISBN = 'ISBN is required';
    } else if (!/^[0-9-]{10,13}$/.test(formData.ISBN)) {
      newErrors.ISBN = 'ISBN must be 10-13 characters (digits or hyphens)';
    }
    
    if (!formData.publishedDate) {
      newErrors.publishedDate = 'Published date is required';
    }
    
    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert price to number
    if (name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      if (id && token) {
        await updateBook(id, formData, token);
        toast.success('Book updated successfully!');
        navigate('/admin');
      }
    } catch (error: any) {
      console.error('Failed to update book:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update book';
      toast.error(errorMessage);
      
      // Check for ISBN duplicate error
      if (errorMessage.includes('ISBN already exists')) {
        setErrors({
          ...errors,
          ISBN: 'This ISBN already exists in the database',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="mb-6">
        <Link to="/admin" className="flex items-center text-[var(--primary)] hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <BookOpen className="h-8 w-8 text-[var(--primary)] mr-3" />
          <h1 className="text-2xl font-bold">Edit Book</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="title" className="label">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`input ${errors.title ? 'border-red-500' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="author" className="label">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                className={`input ${errors.author ? 'border-red-500' : ''}`}
                value={formData.author}
                onChange={handleChange}
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-500">{errors.author}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="price" className="label">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                className={`input ${errors.price ? 'border-red-500' : ''}`}
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="ISBN" className="label">
                ISBN
              </label>
              <input
                id="ISBN"
                name="ISBN"
                type="text"
                className={`input ${errors.ISBN ? 'border-red-500' : ''}`}
                value={formData.ISBN}
                onChange={handleChange}
              />
              {errors.ISBN && (
                <p className="mt-1 text-sm text-red-500">{errors.ISBN}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="publishedDate" className="label">
                Published Date
              </label>
              <input
                id="publishedDate"
                name="publishedDate"
                type="date"
                className={`input ${errors.publishedDate ? 'border-red-500' : ''}`}
                value={formData.publishedDate}
                onChange={handleChange}
              />
              {errors.publishedDate && (
                <p className="mt-1 text-sm text-red-500">{errors.publishedDate}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="genre" className="label">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                className={`input ${errors.genre ? 'border-red-500' : ''}`}
                value={formData.genre}
                onChange={handleChange}
              >
                <option value="">Select a genre</option>
                {BOOK_GENRES.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              {errors.genre && (
                <p className="mt-1 text-sm text-red-500">{errors.genre}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-8 space-x-4">
            <Link to="/admin" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;