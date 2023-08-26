import {useEffect, useState} from 'react';
import {useRequest} from '../api/useRequest';
import {Quote, QuotesApi} from '../interfaces/ApiInterface';
export const useQuotes = () => {
  const [quotes, setquotes] = useState<Quote[]>([]);
  const {getRequest} = useRequest();

  // This function is responsible for fetching the quotes from the API and updating the quotes state
  const getQuotes = async () => {
    await getRequest<QuotesApi>('https://dummyjson.com/quotes')
      .then(resp => setquotes(resp.quotes))
      .catch(() => {});
  };

  useEffect(() => {
    getQuotes();
  }, []);
  return {quotes};
};
