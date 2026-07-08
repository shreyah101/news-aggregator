import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredCategories, setPreferredCategories] = useState([]);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const categories = ['General', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];

  const handleCategoryChange = (category) => {
    if (preferredCategories.includes(category)) {
      setPreferredCategories(preferredCategories.filter(c => c !== category));
    } else {
      setPreferredCategories([...preferredCategories, category]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, preferredCategories.length ? preferredCategories : ['General']);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map(e => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Failed to register');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password (min 6 chars)</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Preferred Categories (Optional)</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  preferredCategories.includes(category) 
                    ? 'bg-primary-600 text-white border-primary-600' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;
