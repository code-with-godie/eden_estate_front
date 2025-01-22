import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { postData } from '../../api/apiCalls';
import {
  Bathroom,
  Bed,
  BookOnline,
  People,
  Tv,
  Wifi,
} from '@mui/icons-material';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DateRange from '../../components/date/DateRange';
import { useFetch } from '../../api/useFetch';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeCard } from '../../components/stripe/StripeCard';
import Modal from '../../components/model/Model'; // Import the Modal component

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Container = styled.section`
  padding: 0.5rem;
  &.dark {
    background-color: var(--color_faded_dark);
  }
  &.light {
    box-shadow: 0px 0px 5px 3px #f2f1f1;
  }
  align-self: stretch;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  height: ${props => (props.home ? '450px' : 'auto')};
`;

const Section = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const Horizontal = styled.hr`
  border-bottom: 1px solid gray;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const Utilities = styled.div`
  columns: 2;
  column-gap: 0.5rem;
  flex: 1;
`;

const Utility = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.p`
  font-size: 0.8rem;
  &.bold {
    font-weight: bold;
    font-size: 1rem;
    color: var(--faded_blue);
  }
`;

const Button = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--faded_blue);
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: capitalize;
  :disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Room = ({
  image,
  home,
  showPicker,
  kingSize,
  queenSize,
  wifi,
  guests,
  breakFast,
  price,
  conditional,
  mountain,
  forest,
  ocean,
  balcony,
  tv,
  bathrooms,
  estateID,
  estate,
  _id,
}) => {
  const { darkMode } = useAppContext();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [progressMessage, setProgressMessage] = useState(null);
  const [daysBooked, setDaysBooked] = useState(0);
  const { data } = useFetch(`/reserve/${_id}`);
  const [creatingReserve, setcreatingReserve] = useState(false);
  const [includeBreakFast, setIncludeBreakfast] = useState(true);
  const [disabledDates, setDisabledDates] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();
  const { token, user } = useAppContext();

  const onDateChange = dates => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const handleReserve = async () => {
    try {
      if (!startDate && !endDate) {
        toast.error('Please select the booking dates 📅📆😟😟', {
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
        return;
      }
      let tempDates = [];
      setcreatingReserve(true);
      setProgressMessage('Reserving room');
      tempDates = [startDate, endDate];

      const reserved = await postData(
        '/reserve',
        { roomID: _id, userID: user?._id, dates: tempDates },
        token
      );
      if (reserved) {
        const {
          booked: { dates },
        } = reserved;
        if (dates) {
          setDisabledDates(prev => [...prev, ...dates]);
        }
        setProgressMessage('Creating payment intent...');
        const res = await postData(
          '/pay/stripe',
          {
            userID: user?._id,
            roomID: _id,
            amount: includeBreakFast
              ? `${
                  price * daysBooked +
                  (typeof estateID === 'object'
                    ? estateID?.breakfast?.price
                    : estate?.breakfast?.price)
                }`
              : price * daysBooked,
          },
          token
        );
        if (res?.clientSecret) {
          setClientSecret(res.clientSecret);
          setProgressMessage(null);
          setShowPaymentModal(true); // Show the payment modal
        } else {
          toast.error(
            'Failed to create a payment intent. Try again later 😟😟😟😟',
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: `${darkMode ? 'dark' : 'light'}`,
              transition: Bounce,
            }
          );
        }
      } else {
        toast.error('Failed to reserve the room. Try again later 😟😟😟😟', {
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
        return;
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';
      toast.error(message, {
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
      console.log(error);
    } finally {
      setcreatingReserve(false);
    }
  };

  useEffect(() => {
    if (progressMessage) {
      toast.success(`${progressMessage}✅✅`, {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressMessage]);

  useEffect(() => {
    if (data) {
      const { reserves } = data;
      if (reserves) {
        reserves?.forEach(item => {
          const { dates } = item;
          if (dates) {
            setDisabledDates(prev => [...prev, ...dates]);
          }
        });
      }
    }
  }, [data]);

  return (
    <Container
      onClick={home ? () => navigate(`/book/${estate?._id}/${_id}`) : () => {}}
      className={darkMode ? 'dark' : 'light'}
      home={home}
    >
      <Section>
        <Wrapper>
          <Image src={image} />
        </Wrapper>
        <Utilities>
          {balcony && (
            <Utility>
              <Bed />
              <Label> Balcony</Label>
            </Utility>
          )}
          <Utility>
            <Bathroom />
            <Label> {bathrooms} bathroom(s)</Label>
          </Utility>
          <Utility>
            <People />
            <Label>{guests} guest (s)</Label>
          </Utility>
          {wifi && (
            <Utility>
              <Wifi />
              <Label>free wifi</Label>
            </Utility>
          )}
          {conditional && (
            <Utility>
              <Wifi />
              <Label>air conditional</Label>
            </Utility>
          )}
          <Utility>
            <Wifi />
            <Label> {kingSize} king size</Label>
          </Utility>
          <Utility>
            <Wifi />
            <Label> {queenSize} queen size</Label>
          </Utility>
          {tv && (
            <Utility>
              <Tv />
              <Label>TV</Label>
            </Utility>
          )}
          {ocean && (
            <Utility>
              <Tv />
              <Label>ocean view</Label>
            </Utility>
          )}
          {mountain && (
            <Utility>
              <Tv />
              <Label>mountain view</Label>
            </Utility>
          )}
          {forest && (
            <Utility>
              <Tv />
              <Label>forest view</Label>
            </Utility>
          )}
        </Utilities>
      </Section>
      <Horizontal />
      <Section className={`${home && 'last'}`}>
        <Wrapper>
          <Utility>
            <Label className='bold'>price Kshs</Label>
            <Label> {price} /24hrs</Label>
          </Utility>
          {breakFast > 0 && (
            <Utility>
              <Label className='bold'>breakfast price</Label>
              <Label>kshs {breakFast} </Label>
            </Utility>
          )}
        </Wrapper>
      </Section>
      {estate?.breakfast?.offered && !home && <Horizontal />}
      <Section className={`${home && 'last'}`}>
        {showPicker && (
          <DateRange
            disabledDates={disabledDates}
            daysBooked={daysBooked}
            setDaysBooked={setDaysBooked}
            onDateChange={onDateChange}
          />
        )}
        {(estate || typeof estateID === 'object') && (
          <Utility
            onClick={
              home
                ? e => {
                    e.stopPropagation();
                    navigate(
                      `/p/${
                        estate?._id || typeof estateID === 'object'
                          ? estateID?._id
                          : estateID
                      }`
                    );
                  }
                : () => {}
            }
          >
            {estate && <Label className='bold'>Estate: {estate?.title} </Label>}
          </Utility>
        )}
        {(estate?.breakfast?.offered || typeof estateID === 'object') && (
          <Wrapper>
            <Label>
              breakfast @ Kshs.{' '}
              {estate?.breakfast?.price || estateID?.breakfast?.price}{' '}
            </Label>
            {!home && (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={e => setIncludeBreakfast(e.target.checked)}
                      checked={includeBreakFast}
                    />
                  }
                  label='include breakfast'
                />
              </FormGroup>
            )}
          </Wrapper>
        )}
        {daysBooked > 0 && (
          <Utility>
            <Label className='bold'>total price :</Label>
            <Label>
              {includeBreakFast
                ? `${
                    price * daysBooked +
                    (typeof estateID === 'object'
                      ? estateID?.breakfast?.price
                      : estate?.breakfast?.price)
                  }`
                : price * daysBooked}{' '}
              for {daysBooked} day(s){' '}
            </Label>
          </Utility>
        )}
        {!home && (
          <Wrapper>
            <Button
              disabled={creatingReserve || !startDate || !endDate}
              onClick={handleReserve}
            >
              {' '}
              <BookOnline />{' '}
              {creatingReserve ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.3rem',
                  }}
                >
                  {' '}
                  <LoadingAnimation /> Processing...
                </div>
              ) : (
                'reserve room'
              )}
            </Button>
          </Wrapper>
        )}
        {clientSecret && (
          <Modal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            darkMode={darkMode}
          >
            <Elements stripe={stripePromise}>
              <StripeCard
                clientSecret={clientSecret}
                onSuccess={() => {
                  toast.success('Payment succeeded! ✅✅', {
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
                  setTimeout(() => {
                    navigate('/success');
                  }, [1000]);
                }}
                darkMode={darkMode}
              />
            </Elements>
          </Modal>
        )}
      </Section>
      <ToastContainer />
    </Container>
  );
};

export default Room;
