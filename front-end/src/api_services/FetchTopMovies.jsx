import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FetchTopMovies = () => {
  const [topFilm, setTopFilm] = useState([]);
  const [loadingContent, toggleContentLoading] = useState(false);
  const navigate = useNavigate();

  // Gets top films from database.
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        toggleContentLoading(true);
        const res = await axios({
          method: "GET",
          url: "http://localhost:4000/movies/api/top_movies",
        });
        // console.log(res.data);
        toggleContentLoading(false);

        if (!loadingContent) {
          setTopFilm(res.data);
        }
      } catch (error) {
        console.error(error);
        navigate("/error500");
      }
    };
    // console.log(topFilm);
    fetchMovies();
  }, []);

  return [topFilm, loadingContent];
};

export default FetchTopMovies;
