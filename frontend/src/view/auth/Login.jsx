import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(
      () => {
        navigate('/home');
        window.location.reload();
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
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className=''>
          <div className="px-6 pb-6 border shadow-lg bg-white h-[100%]">
            <header className='border-b py-5 text-sky-600'>
              <span className='text-xl font-extrabold'>LOGIN TO</span>
              <div className='leading-5'>Crescent Teacher Portal</div>
            </header>
            <form onSubmit={handleLogin} className='py-3'>
              <div className="form-group py-3">
                <label htmlFor="username" className='relative top-1'>Username</label>
                <input
                  type="text"
                  className="form-control border border-sky-200 ml-6 float-right rounded-md text-md p-1 w-[100%] my-2"
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
                  className="form-control border border-sky-200 ml-6 float-right rounded-md text-md p-1 w-[100%] my-2"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <div className="mt-6 text-center text-red-400 p-1">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

              <div className="">
                <button className="my-6 py-3 px-4 w-[100%] bg-sky-700 text-white rounded-md float-right">Log In</button>

              </div>
              {/* <div className=''>
                <span className='py-4 '>Don't Have An Account?</span><Link to='/register' className="text-sky-600"> Register Now</Link>
              </div> */}
            </form>
          </div>

        </div>
        <div className='flex justify-center'>
          <div className='absolute bottom-3 text-center font-thin '>Copyrights by Corpian Technologies. All Rights Reserved</div>
        </div>
      </div>

    </>
  );
};

export default Login;
