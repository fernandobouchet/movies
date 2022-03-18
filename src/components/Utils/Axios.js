import axios from "axios";

const loadMovies = async (type, page) => {
  try {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${type}`, {
      params: {
        page: page,
        include_adult: false,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYwMGIzNzViNDM5NWEyMDZhMzA2NGFiNjZlNzg2OCIsInN1YiI6IjYyMjY4ZmEzZDQwZDRjMDA0NjJjODgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NpcuVJIyugPtAWL4P4KnxqAhcqNaTY8LWEbAWOdXSPE",
      },
    });
    if (data.status === 200) {
      return data.data;
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

const searchMovie = async (movie, page) => {
  try {
    const data = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        page: page,
        query: movie,
        include_adult: false,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYwMGIzNzViNDM5NWEyMDZhMzA2NGFiNjZlNzg2OCIsInN1YiI6IjYyMjY4ZmEzZDQwZDRjMDA0NjJjODgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NpcuVJIyugPtAWL4P4KnxqAhcqNaTY8LWEbAWOdXSPE",
      },
    });
    if (data.status === 200) {
      return data.data;
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

const getVideo = async (videoId) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/movie/${videoId}/videos`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjYwMGIzNzViNDM5NWEyMDZhMzA2NGFiNjZlNzg2OCIsInN1YiI6IjYyMjY4ZmEzZDQwZDRjMDA0NjJjODgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NpcuVJIyugPtAWL4P4KnxqAhcqNaTY8LWEbAWOdXSPE",
        },
      }
    );
    if (data.status === 200) {
      return data.data.results;
    } else if (data.status === 401) {
      console.log("Wrong key");
    } else if (data.status === 404) {
      console.log("The video doesn't exists");
    } else {
      console.log("Unknow error");
    }
  } catch (error) {
    console.log(error);
  }
};

export { loadMovies, getVideo, searchMovie };
