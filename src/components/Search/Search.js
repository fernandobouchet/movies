import { useEffect, useState } from "react";
import { searchMovie } from "../Utils/Axios";
import Cards from "../Cards/Cards";
import { nanoid } from "nanoid";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

function Search(props) {
  const { search } = props;

  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);

  const [paginationPages, setPaginationPages] = useState(1);

  useEffect(() => {
    (async () => {
      const movies = await searchMovie(search, page);
      setPaginationPages(movies.total_pages);
      setMovies(movies.results);
    })();
  }, [search, page]);

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  function changePage(e) {
    setPage(e.selected + 1);
  }

  return (
    <>
      <CardsContainer>{Movies}</CardsContainer>;
      <Pagination
        initialPage={0}
        pageCount={paginationPages}
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={2}
        previousLabel="< previous"
        onPageChange={changePage}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      ></Pagination>
    </>
  );
}

export default Search;

const CardsContainer = styled.div`
  padding-top: 10rem;
  display: grid;
  grid-template-columns: repeat(4, 20rem);
  justify-content: center;
  margin: 0;
  background-color: #000000;

  @media (max-width: 480px) {
    padding-top: 5rem;
    grid-template-columns: repeat(2, 16rem);
  }
`;

const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 0.5rem;
  color: white;
  cursor: pointer;
  list-style-type: none;

  .active > .page-link {
    background-color: black;
    border-style: solid;
    border-width: 0.1rem;
  }

  .page-link {
    font-family: inherit;
    font-size: 1.3rem;
    padding: 1rem;
    background-color: #242424;
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    .page-link {
      font-family: inherit;
      font-size: 0.85rem;
      padding: 0.5rem;
      background-color: #242424;
    }
  }
`;
