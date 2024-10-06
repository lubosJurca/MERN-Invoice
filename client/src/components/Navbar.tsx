// components
import Logo from './Logo';
import { Separator } from './ui/separator';

// assets

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../api-clients';
import ToggleThemeBtn from './ToggleThemeBtn';
import LanguageDropdown from './LanguageDropdown';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // query to get user data
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: apiClient.getUser,
  });

  const mutation = useMutation({
    mutationFn: apiClient.logoutUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['validateToken'],
      });
      toast.success(t('toast.logoutToast'));
      navigate('/');
    },
    onError: async (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const logoutUser = async () => {
    mutation.mutate();
  };

  return (
    <div className=' w-full  h-[4.5rem]  bg-navbarBg flex justify-between items-center pr-6 '>
      <Logo />
      <div className='flex items-center h-full justify-center gap-6'>
        <LanguageDropdown />
        <Separator orientation='vertical' className='bg-[#494E6E]' />
        <ToggleThemeBtn />
        {/* separator */}
        <Separator orientation='vertical' className='bg-[#494E6E]' />
        {/* avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <h5 className='text-white bg-purpleBtnBG rounded-sm px-2 py-1'>
              {data?.name}
            </h5>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logoutUser}>
              {t('buttons.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default Navbar;
