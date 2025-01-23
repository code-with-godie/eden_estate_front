import { CircularProgress } from '@mui/material';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--faded_blue);
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  text-transform: capitalize;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export const StripeElement = ({ clientSecret, amount }) => {
  const { darkMode } = useAppContext();
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setProcessing(true);
      if (!stripe || !elements) {
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(`${submitError?.message}😟😟`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${darkMode ? 'dark' : 'light'}`,
          transition: Bounce,
        });

        setProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url:
            process.env.REACT_APP_SUCCESS_URL ||
            'http://localhost:3000/success',
        },
      });

      if (error) {
        console.log(error);
        toast.error(`${error?.message}😟😟`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${darkMode ? 'dark' : 'light'}`,
          transition: Bounce,
        });
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        setProcessing(false);
      }
    } catch (error) {
      toast.error(`${error?.message}😟😟`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${darkMode ? 'dark' : 'light'}`,
        transition: Bounce,
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return <CircularProgress />;
  }
  return (
    <Form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      <Button
        type='submit'
        disabled={processing || !stripe}
      >
        {processing ? 'Processing...' : `Pay $${amount} `}
      </Button>
      {succeeded &&
        toast.success(`Payment successful ✅✅`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${darkMode ? 'dark' : 'light'}`,
          transition: Bounce,
        })}
      <ToastContainer />
    </Form>
  );
};
