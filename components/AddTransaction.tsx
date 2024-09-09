'use client';
import { useRef } from 'react';
import addTransaction from '@/app/actions/addTransaction';
import { toast } from 'react-toastify';

// this file will be executed on the client
// we want some validation before sending form to the server

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    try {
      // console.log(formData.get('text'), formData.get('amount'));
      const { data, error } = await addTransaction(formData);

      if (error) {
        toast.error(error);
        return;
      }
      toast.success('Transaction was added🙂');
      formRef.current?.reset(); // reset the form
      console.log(data);
    } catch (error) {
      console.error('Unexpected error: ', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      <h3>Add transaction</h3>
      {/* Server actions */}
      <form action={clientAction} ref={formRef}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input type='text' id='text' name='text' placeholder='Enter text...' />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='Enter amount...'
            step='0.01' // allow the input to have decimal values
          />
        </div>
        <button className='btn'>Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
