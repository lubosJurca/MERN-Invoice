import { Dot } from 'lucide-react';
import { StatusTypes } from '../utils/types';
import { useTranslation } from 'react-i18next';

const StatusComponent = ({ status }: StatusTypes) => {
  const { t } = useTranslation();
  let state;
  let bgColor;
  let textColor;

  const checkStatus = (status: string) => {
    switch (status) {
      case 'paid':
        state = t('status.paid');
        bgColor = 'bg-[#33D69F]/5';
        textColor = 'text-[#33D69F]';
        break;

      case 'pending':
        state = t('status.pending');
        bgColor = 'bg-[#FF8F00]/5';
        textColor = 'text-[#FF8F00]';

        break;

      case 'draft':
        state = t('status.draft');
        bgColor = 'bg-draftBg';
        textColor = 'text-draftText';
        break;
    }
  };

  checkStatus(status);

  return (
    <div
      className={`flex items-center justify-center rounded-md pr-2   font-bold ${bgColor} ${textColor}`}
    >
      <Dot className={`size-9 m-0 p-0 ${textColor}`}></Dot>
      <p>{state}</p>
    </div>
  );
};
export default StatusComponent;
