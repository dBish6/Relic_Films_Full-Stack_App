import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Gets movie details from the database.
const FetchMovieDetailsById = (id) => {
  const [movieDetails, setDetails] = useState([]);
  const [loading, toggleLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        toggleLoading(true);
        const res = await axios({
          method: "GET",
          url: `http://localhost:4000/movies/api/detailsMovies/${id}`,
        });
        // console.log(res.data);
        toggleLoading(false);
        if (!loading) {
          setDetails(res.data);
        }
      } catch (error) {
        console.error(error);
        navigate("/error500");
      }
    };
    fetchDetails();
  }, []);
  // console.log(movieDetails);

  return [movieDetails, loading];
};

export default FetchMovieDetailsById;
