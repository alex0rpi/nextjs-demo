import getUserBalance from '@/app/actions/getUserBalance';
import { formatAmount } from '@/lib/utils';

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <>
      <h4>Your balance</h4>
      <h1>${formatAmount(balance ?? 0)}</h1>
    </>
  );
};

export default Balance;
