'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

async function deleteTransaction(transactionId: string): Promise<{
  message?: string;
  error?: string;
}> {
  const { userId } = auth();
  if (!userId) return { error: 'User not found' };

  try {
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });
    revalidatePath('/');
    return { message: 'Transaction was deleted' };
  } catch (error) {
    console.error('Error getting balance:', error);
    return { error: 'Error getting user balance' };
  }
}

export default deleteTransaction;
