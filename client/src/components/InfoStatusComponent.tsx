import { StatusTypes } from '../utils/types';

import StatusComponent from './StatusComponent';
import { Card, CardContent } from './ui/card';

const InfoStatusComponent = ({ status }: StatusTypes) => {
  return (
    <Card className='border-none h-[91px] shadow-none w-full'>
      <CardContent className='pt-6 '>
        <div className='flex gap-4 items-center '>
          <p className='font-medium text-formLabel text-sm'>Status</p>
          <StatusComponent status={status} />
        </div>
        {/* here will be the action component */}
      </CardContent>
    </Card>
  );
};
export default InfoStatusComponent;
