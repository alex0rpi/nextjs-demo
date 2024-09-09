'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();
  if (!userId) return { error: 'User not found' };

  try {
    const transactionAmounts = await db.transaction.findMany({
      where: {
        userId: userId,
      },
      //   only return the amount field
      select: {
        amount: true,
      },
    });
    const income = transactionAmounts
      .filter((t) => t.amount > 0)
      .reduce((acc, current) => acc + current.amount, 0);
    const expense = transactionAmounts
      .filter((t) => t.amount < 0)
      .reduce((acc, current) => acc + current.amount, 0);
    return { income, expense: Math.abs(expense) };
  } catch (error) {
    console.error('Error getting income-expense:', error);
    return { error: 'Error getting user income-expense' };
  }
}

export default getIncomeExpense;
