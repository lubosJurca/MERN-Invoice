import { useAllInvoicesContext } from '../pages/AllInvoicesPage';
import PhoneInvoiceCard from './PhoneInvoiceCard';
import { motion } from 'framer-motion';

const SmallDeviceTable = () => {
  const { data } = useAllInvoicesContext();
  return (
    <section className='flex flex-col gap-4'>
      {data.map((invoice, i) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2, duration: 0.2 }}
          key={invoice._id}
        >
          <PhoneInvoiceCard key={invoice._id} data={invoice} />
        </motion.div>
      ))}
    </section>
  );
};
export default SmallDeviceTable;
