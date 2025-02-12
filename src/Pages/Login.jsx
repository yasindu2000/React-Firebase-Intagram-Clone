import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import FirebaseContext from "../Context/Firebase";
import * as ROUTES from '../Constants/Routes';

function Login() {

  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        setError("The login credentials are invalid.");
      } else if (error.code === "auth/invalid-email") {
        setError("The email address is badly formatted.");
      } else {
        setError(error.message);
      }

      setEmailAddress("");
      setPassword("");
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className='container flex items-center h-screen max-w-screen-md mx-auto'>
      <div className='flex w-3/5'>
        <img
          src='/src/assets/images/iphone-with-profile.jpg'
          alt='iPhone with Instagram app'
        />
      </div>
      <div className='flex flex-col w-2/5'>
        <h1 className='flex justify-center w-full'>
          <img
            src='/src/assets/images/logo.png'
            alt='Instagram'
            className='w-6/12 mt-2 mb-4'
          />
        </h1>
        {error && <p className='text-xs text-red-primary'>{error}</p>}
        <form onSubmit={handleLogin} method='POST'>
          <input
            aria-label='Enter your email address'
            type='text'
            placeholder='Email address'
            className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            aria-label='Enter your password'
            type='password'
            placeholder='Password'
            className='w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary'
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button
            disabled={isInvalid}
            type='submit'
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
              isInvalid && "opacity-50"
            }`}
          >
            Log In
          </button>
          <div className='flex flex-col items-center justify-center w-full p-4 mt-4 bg-white border rounded border-gray-primary'>
            <p>
              Don't have an account?{" "}
              <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;