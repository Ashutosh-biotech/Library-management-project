import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { logout } from './store/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';

function App() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            <Login onToggle={() => setIsLogin(false)} />
          ) : (
            <Register onToggle={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold">📚 Library Management System</h1>
        </div>
        <div className="flex-none gap-2">
          <span className="hidden sm:inline">Welcome, {user?.username}!</span>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
            Logout
          </button>
        </div>
      </div>
      <main className="container mx-auto p-4">
        <BookList />
      </main>
    </div>
  );
}

export default App;
