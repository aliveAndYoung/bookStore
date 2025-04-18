import axios from 'axios';
import { API_URL } from '../utils/constants';

// Book interface
export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  ISBN: string;
  publishedDate: string;
  genre: string;
  createdAt: string;
}

export interface BookFormData {
  title: string;
  author: string;
  price: number;
  ISBN: string;
  publishedDate: string;
  genre: string;
}

// Get all books
export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Get a single book
export const getBook = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

// Create a new book (admin only)
export const createBook = async (bookData: BookFormData, token: string): Promise<Book> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.post(`${API_URL}/books`, bookData, config);
    return response.data.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// Update a book (admin only)
export const updateBook = async (id: string, bookData: BookFormData, token: string): Promise<Book> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.put(`${API_URL}/books/${id}`, bookData, config);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

// Delete a book (admin only)
export const deleteBook = async (id: string, token: string): Promise<void> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    await axios.delete(`${API_URL}/books/${id}`, config);
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};