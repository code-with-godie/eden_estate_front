import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

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

export const StripeCard = ({ clientSecret, onSuccess, darkMode }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name', // Example customer name
          },
        },
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      onSuccess();
    }
  };

  return (
    <Form
      id='payment-form'
      onSubmit={handleSubmit}
    >
      <CardElement
        id='card-element'
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: darkMode ? '#fff' : '#424770',
              '::placeholder': {
                color: darkMode ? '#ffffff' : '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button
        type='submit'
        disabled={processing || !stripe}
      >
        {processing ? 'Processing...' : 'Pay'}
      </Button>
      {error &&
        toast.error(`${error} 😟😟😟😟`, {
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
      {succeeded &&
        toast.error(`Payment successful ✅✅`, {
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
