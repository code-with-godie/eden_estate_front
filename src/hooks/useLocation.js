import { Country, State, City } from 'country-state-city';
import { useCallback } from 'react';
export const useLocation = () => {
  const getCountryByCode = useCallback(countryCode => {
    return Country.getAllCountries().find(
      country => country.isoCode === countryCode
    );
  }, []);
  const getStateByCode = useCallback((countryCode, stateCode) => {
    const state = State.getAllStates().find(
      state => state.isoCode === stateCode && state.countryCode === countryCode
    );
    if (!state) return null;
    return state;
  }, []);
  const getCityByName = useCallback((countryCode, stateCode, name) => {
    const city = City.getAllCities().find(
      city =>
        city.countryCode === countryCode &&
        city.stateCode === stateCode &&
        city.name === name
    );
    if (!city) return null;
    return city;
  }, []);
  const getCountryStates = useCallback(countryCode => {
    const state = State.getAllStates().filter(
      state => state.countryCode === countryCode
    );
    return state;
  }, []);
  const getStatesCities = useCallback((countryCode, stateCode) => {
    return City.getAllCities().filter(
      item => item.countryCode === countryCode && item.stateCode === stateCode
    );
  }, []);
  const getCountriesStatesCities = () => {
    // const countries = Country.getAllCountries().map(country => ({
    //   value: country.isoCode,
    //   label: `${country.name} (Country)`,
    //   type: 'country',
    // }));
    // const states = State.getAllStates().map(state => ({
    //   value: state.isoCode,
    //   label: `${state.name} (State)`,
    //   type: 'state',
    // }));
    const cities = City.getAllCities().map(city => ({
      value: city.name,
      label: `${city.name} (City)`,
      type: 'city',
    }));
    return cities;
  };
  return {
    countries: Country.getAllCountries(),
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getCityByName,
    getStatesCities,
    getCountriesStatesCities,
  };
};
