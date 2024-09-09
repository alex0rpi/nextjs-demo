'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  const { userId } = auth();
  if (!userId) return { error: 'User not found' };

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId, // cleck user id.
      },
    });
    const balance = +transactions
      .reduce((acc, current) => {
        return acc + current.amount; // devuelve la suma acumulada (no un objeto)
      }, 0)
      .toFixed(2); // redondea a dos decimales
    return { balance };
  } catch (error) {
    console.error('Error getting balance:', error);
    return { error: 'Error getting user balance' };
  }
}

export default getUserBalance;
