import lightThemeIcon from '../assets/icon-sun.svg';
import darkThemeIcon from '../assets/icon-moon.svg';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';

const ToggleThemeBtn = () => {
  const { theme, toggleTheme } = useAppContext();
  return (
    <Button className='bg-transparent'>
      {' '}
      {theme === 'dark' ? (
        <img
          src={lightThemeIcon}
          alt='light theme icon'
          className='w-5 h-5 cursor-pointer'
          onClick={() => toggleTheme()}
        />
      ) : (
        <img
          src={darkThemeIcon}
          alt='dark theme icon'
          className='w-5 h-5 cursor-pointer'
          onClick={() => toggleTheme()}
        />
      )}
    </Button>
  );
};
export default ToggleThemeBtn;
