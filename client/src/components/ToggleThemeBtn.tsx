import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import LightThemeIcon from './LightThemeIcon';
import DarkThemeIcon from './DarkThemeIcon';

const ToggleThemeBtn = () => {
  const { theme } = useAppContext();
  return (
    <Button className='bg-transparent sm:m-2 '>
      {' '}
      {theme === 'dark' ? <LightThemeIcon /> : <DarkThemeIcon />}
    </Button>
  );
};
export default ToggleThemeBtn;
