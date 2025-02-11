import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContextProvider';
import { format, differenceInCalendarDays } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  padding: 1rem;
  background-color: ${props => (props.isDark ? '#13110f36' : '#fff')};
  box-shadow: ${props =>
    props.isDark
      ? '0px 4px 20px rgba(0, 0, 0, 0.3)'
      : '0px 2px 10px rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const DatePickerWrapper = styled.div`
  background-color: ${props => (props.isDark ? '#252423' : '#fff')};
  box-shadow: ${props =>
    props.isDark
      ? '0px 4px 20px rgba(79, 79, 79, 0.3)'
      : '0px 2px 10px rgba(0, 0, 0, 0.1)'};
  width: 'auto';
  height: auto;
  max-height: 300px;
  max-width: 300px;
  border-radius: 1rem;
  position: absolute;
  z-index: 50;
  overflow: auto;
  bottom: 105%;
  @media screen and (min-width: 768px) {
    max-height: 350px;
    max-width: 300px;
  }
`;

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  cursor: pointer;
`;

const CalendarIconContainer = styled.div`
  font-size: 30px;
  color: ${props => (props.isDark ? '#fff' : '#333')};

  &:hover {
    color: #3d91c9;
  }
`;

const DateDisplay = styled.div`
  font-size: 0.9rem;
  color: ${props => (props.isDark ? '#fff' : '#333')};
  margin-left: 10px;
`;

const DayCounter = styled.p`
  font-size: 0.9rem;
  color: ${props => (props.isDark ? '#fff' : '#333')};
  margin-top: 5px;
`;

const CustomDateRangePicker = ({
  disabledDates,
  onDateChange,
  daysBooked,
  setDaysBooked,
}) => {
  const { darkMode: isDark } = useAppContext();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const handleCheckInDateChange = date => {
    setCheckInDate(date);
    onDateChange([date, checkOutDate]);
    setIsCheckInOpen(false);
  };

  const handleCheckOutDateChange = date => {
    setCheckOutDate(date);
    onDateChange([checkInDate, date]);
    setIsCheckOutOpen(false);
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const days = differenceInCalendarDays(checkOutDate, checkInDate);
      setDaysBooked(days + 1);
    }
  }, [checkInDate, checkOutDate, setDaysBooked]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setCheckOutDate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInDate]);

  // Convert string dates to Date objects
  const excludeDates = disabledDates.map(dateStr => new Date(dateStr));

  return (
    <Container>
      <Wrapper isDark={isDark}>
        <DateRangeContainer>
          <DateRangeContainer onClick={() => setIsCheckInOpen(prev => !prev)}>
            <CalendarIconContainer isDark={isDark}>
              <CalendarTodayIcon />
            </CalendarIconContainer>
            <DateDisplay isDark={isDark}>
              {checkInDate ? format(checkInDate, 'dd/MM/yyyy') : 'Check-In'}
            </DateDisplay>
          </DateRangeContainer>
          {isCheckInOpen && (
            <DatePickerWrapper isDark={isDark}>
              <DatePicker
                selected={checkInDate}
                onChange={handleCheckInDateChange}
                minDate={new Date()}
                excludeDates={excludeDates}
                inline
                className={isDark ? 'dark-theme picker' : 'picker'}
              />
            </DatePickerWrapper>
          )}
        </DateRangeContainer>
        <DateRangeContainer>
          <DateRangeContainer onClick={() => setIsCheckOutOpen(prev => !prev)}>
            <CalendarIconContainer isDark={isDark}>
              <CalendarTodayIcon />
            </CalendarIconContainer>
            <DateDisplay isDark={isDark}>
              {checkOutDate ? format(checkOutDate, 'dd/MM/yyyy') : 'Check-Out'}
            </DateDisplay>
          </DateRangeContainer>
          {isCheckOutOpen && (
            <DatePickerWrapper isDark={isDark}>
              <DatePicker
                selected={checkOutDate}
                onChange={handleCheckOutDateChange}
                minDate={checkInDate || new Date()}
                excludeDates={excludeDates}
                inline
                className={isDark ? 'dark-theme' : ''}
              />
            </DatePickerWrapper>
          )}
        </DateRangeContainer>
      </Wrapper>
      {checkInDate && checkOutDate && (
        <DayCounter isDark={isDark}>
          <strong>Days Booked:</strong> {daysBooked}
        </DayCounter>
      )}
    </Container>
  );
};

export default CustomDateRangePicker;
