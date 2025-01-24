import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { postData } from '../../api/apiCalls';
import { Bathroom, BookOnline, People, Tv, Wifi } from '@mui/icons-material';
import { FaBed } from 'react-icons/fa';
import { MdBalcony } from 'react-icons/md';
import { SiDigitalocean } from 'react-icons/si';
import { MdForest } from 'react-icons/md';
import { GiMountainRoad } from 'react-icons/gi';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DateRange from '../../components/date/DateRange';
import { useFetch } from '../../api/useFetch';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import StripeCheckout from '../../components/stripe/StripeCheckout';
import { addDays } from 'date-fns';

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
  height: ${props => (props.home ? '500px' : 'auto')};
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
const UtilitiesWrapper = styled.div`
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
const Title = styled.h2`
  font-size: 1.2rem;
  text-transform: capitalize;
  color: var(--faded_blue);
  font-weight: bold;
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
  url,
  home,
  showPicker,
  kingSize,
  queenSize,
  wifi,
  guests,
  breakFast,
  price,
  title,
  conditional,
  mountain,
  forest,
  ocean,
  balcony,
  tv,
  bathrooms,
  estateID,
  estate,
  single,
  _id,
}) => {
  const { darkMode } = useAppContext();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysBooked, setDaysBooked] = useState(0);
  const { data } = useFetch(`/reserve/${_id}`);
  const [creatingReserve, setcreatingReserve] = useState(false);
  const showBreakFast =
    typeof estateID === 'object'
      ? estateID?.breakfast?.offered
      : estate?.breakfast?.offered;

  const [includeBreakFast, setIncludeBreakfast] = useState(
    showBreakFast ? true : false
  );
  const [disabledDates, setDisabledDates] = useState([]);
  const [amount, setAmount] = useState(0);
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
          setShowPaymentModal(true);
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
    } finally {
      setcreatingReserve(false);
    }
  };
  useEffect(() => {
    if (daysBooked > 0) {
      const netAmount = price * daysBooked;
      if (includeBreakFast) {
        const breakFast =
          typeof estateID === 'object'
            ? estateID?.breakfast?.price
            : estate?.breakfast?.price;

        setAmount(netAmount + breakFast);
        return;
      }

      setAmount(netAmount);
    }
  }, [daysBooked, estate?.breakfast?.price, estateID, includeBreakFast, price]);
  useEffect(() => {
    if (data) {
      const { reserves } = data;
      if (reserves) {
        const dateSet = new Set(disabledDates); // Initialize with existing disabledDates

        const addDatesInRange = (startDate, endDate) => {
          let currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            dateSet.add(currentDate.toISOString());
            currentDate = addDays(currentDate, 1);
          }
        };

        reserves.forEach(item => {
          const { dates } = item;
          if (dates.length >= 2) {
            const checkInDate = new Date(dates[0]);
            const checkOutDate = new Date(dates[1]);
            addDatesInRange(checkInDate, checkOutDate);
          }
        });

        setDisabledDates([...dateSet]); // Convert Set back to array and update state
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {}, [disabledDates]);

  return (
    <Container
      onClick={
        home || single
          ? () => navigate(`/book/${estate?._id || estateID}/${_id}`)
          : () => {}
      }
      className={darkMode ? 'dark' : 'light'}
      home={home}
    >
      <Section>
        <Wrapper>
          <Image src={url?.secure_url || image} />
        </Wrapper>
        {title && <Title> {title} </Title>}
        <UtilitiesWrapper>
          <Utilities>
            {balcony && (
              <Utility>
                <MdBalcony />
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
              <FaBed />
              <Label> {kingSize} king size</Label>
            </Utility>
            <Utility>
              <FaBed />
              <Label> {queenSize} queen size</Label>
            </Utility>
            {tv && (
              <Utility>
                <Tv fontSize='small' />
                <Label>TV</Label>
              </Utility>
            )}
            {ocean && (
              <Utility>
                <SiDigitalocean />
                <Label>ocean view</Label>
              </Utility>
            )}
            {mountain && (
              <Utility>
                <GiMountainRoad />
                <Label>mountain view</Label>
              </Utility>
            )}
            {forest && (
              <Utility>
                <MdForest />
                <Label>forest view</Label>
              </Utility>
            )}
          </Utilities>
        </UtilitiesWrapper>
      </Section>
      <Horizontal />
      <Section className={`${home && 'last'}`}>
        <Wrapper>
          <Utility>
            <Label className='bold'>price $</Label>
            <Label> {price} /24hrs</Label>
          </Utility>
          {breakFast > 0 && (
            <Utility>
              <Label className='bold'>breakfast price</Label>
              <Label>$ {breakFast} </Label>
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

        {/* am checking the type of estateID because am resuing this component. some part it expect it to be a string others like book page it espect it ot be an object of the etstate itself. simply using populate method in the dtatabase in some routes where others am not using it */}
        {showBreakFast && (
          <Wrapper>
            <Label>
              breakfast @ $.{' '}
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
              {amount} for {daysBooked} day(s){' '}
            </Label>
          </Utility>
        )}
        {!home && (
          <Wrapper>
            <Button
              disabled={
                single ? false : creatingReserve || !startDate || !endDate
              }
              onClick={single ? () => {} : handleReserve}
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
        {showPaymentModal && (
          <StripeCheckout
            setShowPaymentModal={setShowPaymentModal}
            showPaymentModal={showPaymentModal}
            amount={amount}
            roomID={_id}
          />
        )}
      </Section>
      <ToastContainer />
    </Container>
  );
};

export default Room;
