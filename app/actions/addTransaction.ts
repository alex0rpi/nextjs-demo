// Server component to fetch (post) a transaction to the server
'use server'; // by writing this, the file will be executed on the server
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
// this will be used to revalidate the cache (meaning the data will be updated), so the user can see the new transaction on the UI.

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  // Get the data from the form, do some validation and send back either the transaction data if ok, or an error message
  const textValue = formData.get('text') as string;
  const amountValue = formData.get('amount');

  if (!textValue || textValue.trim() === '' || !amountValue) {
    return { error: 'Text or amount is missing😕' };
  }

  const text: string = textValue.toString(); // Ensure it is a string
  const amount: number = parseFloat(amountValue.toString()); // Ensure it is a float number

  // Get logged in user (extract the user ID)
  const { userId } = auth();
  console.log('User ID:', userId);
  if (!userId) return { error: 'User not found' };

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath('/'); // revalidate the cache for the home page

    return { data: transactionData };
  } catch (error) {
    console.error('Error adding transaction:', error);
    return { error: 'Error adding transaction' };
  }
}

export default addTransaction;
