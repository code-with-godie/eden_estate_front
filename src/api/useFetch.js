import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContextProvider';
import axios from 'axios';
export const useFetch = url => {
  const { token } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/eden_estate`,
  });
  useEffect(() => {
    getData();
  }, [url]);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setData(res.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error };
};
