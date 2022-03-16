import Cards from "../Cards/Cards";
import styled from "styled-components";
import { nanoid } from "nanoid";
import ReactPaginate from "react-paginate";

function Home(props) {
  const { movies, changePage, PaginationPages, loading } = props;

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  return (
    <>
      {!loading && (
        <>
          <CardsContainer>{Movies}</CardsContainer>;
          <Pagination
            initialPage={0}
            pageCount={PaginationPages}
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
      )}
    </>
  );
}

export default Home;

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
