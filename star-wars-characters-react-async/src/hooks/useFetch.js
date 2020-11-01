import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [response, setResposne] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResposne(null); // optional, app preference
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setResposne(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.error(error);
      });
  }, [url]);

  return [response, loading, error];
};
