import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚡ نحول params object لـ string ثابت
  const queryParams = useMemo(() => {
    return new URLSearchParams(params).toString();
  }, [params]);

  const fullUrl = useMemo(() => {
    return queryParams ? `${url}?${queryParams}` : url;
  }, [url, queryParams]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(fullUrl);
        if (isMounted) setData(response.data);
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response?.data || err.message,
        );
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [fullUrl]);

  return { data, loading, error };
};

export default useFetch;
