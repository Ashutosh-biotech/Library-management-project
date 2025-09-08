import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { register } from '../store/authSlice';

interface RegisterProps {
  onToggle: () => void;
}

const Register: React.FC<RegisterProps> = ({ onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await dispatch(register({ username, password })).unwrap();
      alert('Registration successful! Please login.');
      onToggle();
    } catch (error: any) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl mb-4">📝 Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Username"
              className="input border w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              className="input border w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={`btn btn-secondary w-full ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}
        <div className="divider">OR</div>
        <p className="text-center">
          Already have an account?{' '}
          <button type="button" onClick={onToggle} className="link link-primary">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;