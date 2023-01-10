import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Gets movie details from the database.
const FetchMovieDetailsBySearch = () => {
  const [movieDetailsSearch, setDetailsSearch] = useState([]);
  const navigate = useNavigate();

  const fetchDetailsSearch = async (searchTxt) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:4000/movies/api/detailsMovies?name=${searchTxt}`,
      });
      // console.log(res.data);
      if (res && res.status === 200) {
        setDetailsSearch(res.data);
      }
    } catch (error) {
      console.error(error);
      navigate("/error500");
    }
  };
  // console.log(movieDetailsSearch);

  return [fetchDetailsSearch, movieDetailsSearch];
};

export default FetchMovieDetailsBySearch;
