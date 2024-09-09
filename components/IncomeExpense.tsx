import getIncomeExpense from '@/app/actions/getIncomeExpense';
import { formatAmount } from '@/lib/utils';

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className='inc-exp-container'>
      <div>
        <h4>Income</h4>
        <p className='money plus'>${formatAmount(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className='money minus'>${formatAmount(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
