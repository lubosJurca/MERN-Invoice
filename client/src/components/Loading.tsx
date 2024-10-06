import SyncLoader from 'react-spinners/SyncLoader';

const Loading = () => {
  return (
    <div className='w-full h-[calc(100vh-12.5rem)] flex flex-col justify-center items-center'>
      <SyncLoader color='#7c5dfa' />
    </div>
  );
};
export default Loading;
