import { useState, useEffect } from 'react';

export const useFetchAsyncAwait = (url) => {
  const [response, setResposne] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResposne(null); // optional, app preference
    setError(null);

    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResposne(data);
      } catch (error) {
        setError(error);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return [response, loading, error];
};
