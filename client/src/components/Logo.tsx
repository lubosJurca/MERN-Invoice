import logo from '../assets/logo.svg';

const Logo = () => {
  return (
    <div className='h-full  bg-01 w-[4.5rem] md:w-20 grid place-content-center rounded-r-3xl relative overflow-hidden '>
      <img src={logo} alt='logo' className='h-8 z-20' />
      <div className='absolute h-[4.5rem] md:h-20 w-[4.5rem] md:w-20 top-1/2  bg-02 rounded-l-3xl z-10'></div>
    </div>
  );
};
export default Logo;
