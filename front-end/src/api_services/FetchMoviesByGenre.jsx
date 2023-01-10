import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FetchMoviesByGenre = () => {
  const [moviesByGenre, setMovies] = useState([]);
  const navigate = useNavigate();

  // Gets movie by certain genre.
  const genreMovies = async (val) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:4000/movies/api/movies_by_genre?genre=${val}`,
      });

      if (res && res.status === 200) {
        // console.log(res.data);
        setMovies(res.data);
      }
    } catch (error) {
      console.error(error);
      navigate("/error500");
    }
  };

  return [genreMovies, moviesByGenre];
};

export default FetchMoviesByGenre;
