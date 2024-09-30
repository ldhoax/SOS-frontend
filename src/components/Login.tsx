import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  toggleAuth: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleAuth }) => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your login logic here
    toggleAuth(); // Set authenticated to true
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'supporter') {
      navigate('/supporter-dashboard');
    } else {
      navigate('/requester-dashboard');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* Add your login form fields here */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;