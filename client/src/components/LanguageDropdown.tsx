import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('English');

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='bg-transparent sm:m-2  focus:outline-none'>
          <Globe className='text-[#858BB2]' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-12 border-none '>
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={handleChangeLanguage}
        >
          <DropdownMenuRadioItem value='en'>English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='cs'>Čeština</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LanguageDropdown;
