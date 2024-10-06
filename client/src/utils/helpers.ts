import { useTranslation } from 'react-i18next';

export const formattedAmount = new Intl.NumberFormat('eu-EU', {
  style: 'currency',
  currency: 'EUR',
});

export const HeaderComponent = () => {
  const { t } = useTranslation();
  return t('dataTable.created');
};

export const DueDateComponent = () => {
  const { t } = useTranslation();
  return t('dataTable.dueDate');
};

export const NameComponent = () => {
  const { t } = useTranslation();
  return t('dataTable.name');
};

export const AmountComponent = () => {
  const { t } = useTranslation();
  return t('dataTable.amount');
};
