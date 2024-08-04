import React, { useState } from 'react';
import AuthService from '../../services/auth.service.jsx';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    AuthService.register(username, password).then(
      (response) => {
        setMessage(response.data.message);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <div className="px-6 pb-6 border shadow-lg bg-white">
      <header className='border-b text-center py-5 text-xl font-bold text-sky-600'>REGISTER IN PORTAL</header>
        <form onSubmit={handleRegister} className='py-3'>
          <div className="form-group py-3">
            <label htmlFor="username" className='relative top-1'>Username</label>
            <input
              type="text"
              className="form-control border border-sky-200 ml-6 float-right rounded-md text-md p-1"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group py-3">
            <label htmlFor="password" className='relative top-1'>Password</label>
            <input
              type="password"
              className="form-control border border-sky-200 ml-6 float-right rounded-md text-md p-1"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
          <div className="mt-5 text-center border border-red-700 text-red-400 p-1">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}

          <div className="form-group">
            <button className="btn btn-primary btn-block float-right mt-6 py-1 px-4 border ml-3">Sign Up</button>
            <Link to='/' className="btn btn-primary btn-block float-right mt-6 py-1 px-4 border border-green-700 bg-green-700 text-white">Sign In</Link>
          </div>
        </form>

      </div>
    </div>

  );
};

export default Register;
