'use client';
import { Transaction } from '@/types/Transaction';
import { formatAmount } from '@/lib/utils';
import { toast } from 'react-toastify';
import deleteTransaction from '@/app/actions/deleteTransaction';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const deleteHandler = async (transactionId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;
    const { message, error } = await deleteTransaction(transactionId);
    if (error) {
      toast.error(error);
      return;
    }
    toast.warning(message);
  };
  const sign = transaction.amount < 0 ? '-' : '+';
  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}${formatAmount(Math.abs(transaction.amount))}
      </span>
      <button onClick={() => deleteHandler(transaction.id)} className='delete-btn'>
        X
      </button>
    </li>
  );
};

export default TransactionItem;
