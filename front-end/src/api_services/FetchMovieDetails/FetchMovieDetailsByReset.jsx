import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Gets movie details from the database when the user selects reset option.
const FetchMovieDetailsByReset = () => {
  const [movieDetailsReset, setDetailsReset] = useState([]);
  const navigate = useNavigate();

  const fetchDetailsReset = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4000/movies/api/detailsMovies",
      });
      // console.log(res.data);
      if (res && res.status === 200) {
        setDetailsReset(res.data);
      }
    } catch (error) {
      console.error(error);
      navigate("/error500");
    }
  };
  // console.log(movieDetailsReset);

  return [fetchDetailsReset, movieDetailsReset];
};

export default FetchMovieDetailsByReset;
