import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import { login } from '../../Store/AuthSlice';
import Button from '../Button';
import Input from '../Input';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const sign = async (data) => {
    setError('');
    try {
      const userData = await authService.CreateAccount(data);
      if (userData) {
        const currentUserData = await authService.CurrentUser();
        if (currentUserData) {
          dispatch(login({userData : currentUserData}));
          navigate('/allpost');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Create an Account</span>
          <span className="font-light text-gray-400 mb-8">
            Please fill in the details to sign up.
          </span>
          <form onSubmit={handleSubmit(sign)}>
          <div className="py-4">
              <Input
                label="Name"
                type="text"
                placeholder="Enter your name"
                {...register('name', {
                  required: true,
                })}
              />
            </div>
            <div className="py-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      'Email address must be a valid address',
                  },
                })}
              />
            </div>
            <div className="py-4">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: true,
                })}
              />
            </div>
            <Button type="submit" className="w-full mb-4">
              Sign Up
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <div className="text-center text-gray-400">
            Already have an account?
            <Link to="/login" className="font-bold text-black">
              Sign in
            </Link>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1527219525722-c7d9442cc7a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* text on image */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
            "The journey of a thousand miles begins with a single step."
              <br />- Lao Tzu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;