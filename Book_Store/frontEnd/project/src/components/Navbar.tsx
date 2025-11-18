import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, User, Menu, X, LogOut, ShoppingCart, Library } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-[var(--primary)]" />
            <span className="ml-2 text-xl font-serif font-bold text-[var(--primary-dark)]">
              BookStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'nav-link-active' : 'nav-link'
              }
              end
            >
              Home
            </NavLink>
            
            {isAdmin && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  isActive ? 'nav-link-active' : 'nav-link'
                }
              >
                Admin
              </NavLink>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    isActive ? 'nav-link-active flex items-center' : 'nav-link flex items-center'
                  }
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>{user?.name}</span>
                </NavLink>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-[var(--primary)] transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-[var(--primary)] focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'nav-link-active py-2 px-2' : 'nav-link py-2 px-2'
              }
              onClick={() => setIsMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            
            {isAdmin && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  isActive ? 'nav-link-active py-2 px-2' : 'nav-link py-2 px-2'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </NavLink>
            )}

            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    isActive 
                      ? 'nav-link-active flex items-center py-2 px-2' 
                      : 'nav-link flex items-center py-2 px-2'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Profile</span>
                </NavLink>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-700 hover:text-[var(--primary)] transition-colors duration-200 py-2 px-2"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    isActive 
                      ? 'nav-link-active flex items-center py-2 px-2' 
                      : 'nav-link flex items-center py-2 px-2'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Login</span>
                </NavLink>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => 
                    isActive 
                      ? 'nav-link-active flex items-center py-2 px-2' 
                      : 'nav-link flex items-center py-2 px-2'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Library className="h-5 w-5 mr-2" />
                  <span>Register</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;