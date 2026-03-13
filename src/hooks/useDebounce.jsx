import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_MULTI_SEARCH;

function useDebounce({ query, delay = 500 }) {
  const [results, setResults] = useState({
    movies: [],
    person: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await axios.get(api, {
          params: { api_key: apiKey, query },
        });
        const results = response.data.results;
        const person = results.filter((f) => f.media_type === "person");
        const movies = results.filter((f) => f.media_type === "movie");

        setResults({ person, movies } || {});
        setError(null);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  return { results, loading, error };
}

export default useDebounce;
