import axios from "axios";

const loadMovies = async () => {
  try {
    const data = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        page: "1",
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYwMGIzNzViNDM5NWEyMDZhMzA2NGFiNjZlNzg2OCIsInN1YiI6IjYyMjY4ZmEzZDQwZDRjMDA0NjJjODgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NpcuVJIyugPtAWL4P4KnxqAhcqNaTY8LWEbAWOdXSPE",
      },
    });
    if (data.status === 200) {
      return data.data.results;
    } else if (data.status === 401) {
      console.log("Wrong key");
    } else if (data.status === 404) {
      console.log("The movie doesn't exists");
    } else {
      console.log("Unknow error");
    }
  } catch (error) {
    console.log(error);
  }
};

export default loadMovies;
