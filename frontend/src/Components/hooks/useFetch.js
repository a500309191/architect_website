import { useState, useEffect } from "react";
/*import axios from "axios";*/

export default function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!uri) return;

    fetch(uri)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    loading,
    data,
    error
  };
}

