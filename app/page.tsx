import { currentUser } from '@clerk/nextjs/server';
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';

const HomePage = async () => {
  const user = await currentUser();
  if (!user) return <Guest />;
  return (
    <main>
      <h2>WELCOME, {user.firstName}👋</h2>
      <Balance />
      <AddTransaction />
    </main>
  );
};

export default HomePage;
