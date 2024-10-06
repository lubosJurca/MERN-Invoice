import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-02 text-white overflow-hidden'>
      {/* Background Effect */}
      <div
        className='absolute inset-0 bg-cover bg-center opacity-20'
        style={{
          backgroundImage: `url('https://source.unsplash.com/featured/?abstract')`,
        }}
      ></div>

      {/* Glowing Rings */}
      <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-300 rounded-full opacity-50 blur-xl animate-pulse'></div>
      <div className='absolute -bottom-10 left-1/3 transform -translate-x-1/2 w-96 h-96 bg-purple-300 rounded-full opacity-50 blur-xl animate-ping'></div>

      {/* Error Code */}
      <h1 className='text-9xl font-extrabold drop-shadow-lg'>404</h1>

      {/* Error Message */}
      <h2 className='text-4xl font-semibold mt-4 drop-shadow-lg'>
        'Oops! Page Not Found'
      </h2>

      {/* Error Details */}
      <p className='text-lg mt-2 max-w-lg text-center drop-shadow-md'>
        'The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.'
      </p>

      {/* Back to Home Button */}
      <Link
        to='/'
        className='mt-8 px-8 py-3 bg-white text-gray-900 text-sm font-medium rounded-md shadow-md hover:bg-gray-200 transition duration-300 transform hover:scale-105'
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
