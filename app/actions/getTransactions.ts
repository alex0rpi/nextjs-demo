'use server';
import { db } from '@/lib/db';
import { Transaction } from '@/types/Transaction';
import { auth } from '@clerk/nextjs/server';

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = auth();
  if (!userId) return { error: 'User not found' };

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId, // cleck user id.
      },
      //   order by date in descending
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { transactions };
  } catch (error) {
    console.error('Error getting transactions:', error);
    return { error: 'Error getting user transactions' };
  }
}

export default getTransactions;
