import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../model/Model';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElement } from './StripeElement';
import { loadStripe } from '@stripe/stripe-js';
import { useAppContext } from '../../context/AppContextProvider';
import { postData } from '../../api/apiCalls';
import LoadingAnimation from '../loading/LoadingAnimation';
import { Bounce, toast, ToastContainer } from 'react-toastify';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const StripeCheckout = ({
  amount,
  showPaymentModal,
  setShowPaymentModal,
  roomID,
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [creatingIntent, setCreatingIntent] = useState(true);
  const { token, darkMode, user } = useAppContext();
  const convertCurrency = currency => {
    return Math.round(currency * 100);
  };
  const createpaymentIntext = useCallback(async () => {
    try {
      const newAmount = convertCurrency(amount);
      const res = await postData(
        '/pay/stripe',
        { amount: newAmount, userID: user?._id, roomID },
        token
      );
      if (res) {
        setClientSecret(res.clientSecret);
      }
    } catch (error) {
      setShowPaymentModal(false);
      console.log('payment creation error', error);

      toast.error(`${error?.message} 😟😟😟😟`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${darkMode ? 'dark' : 'light'}`,
        transition: Bounce,
      });
    } finally {
      setCreatingIntent(false);
    }
  }, [amount, darkMode, roomID, setShowPaymentModal, token, user?._id]);
  useEffect(() => {
    createpaymentIntext();
  }, [createpaymentIntext]);

  if (creatingIntent) {
    return (
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      >
        <LoadingAnimation />
      </Modal>
    );
  }
  if (!clientSecret) return;
  return (
    <Modal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
    >
      <Elements
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <StripeElement
          amount={amount}
          clientSecret={clientSecret}
        />
      </Elements>
      <ToastContainer />
    </Modal>
  );
};

export default StripeCheckout;
