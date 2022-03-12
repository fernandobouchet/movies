import Cards from "../Cards/Cards";
import styled from "styled-components";
import { nanoid } from "nanoid";
import ReactPaginate from "react-paginate";

function Home(props) {
  const { movies, changePage } = props;

  const Movies = movies.map((movie) => {
    return <Cards key={nanoid()} movie={movie} />;
  });

  console.log(movies);

  return (
    <>
      <CardsContainer>{Movies}</CardsContainer>;
      <Pagination
        initialPage={0}
        pageCount={500}
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={2}
        previousLabel="< previous"
        onPageChange={changePage}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
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

export default Home;

const CardsContainer = styled.div`
  padding-top: 10rem;
  display: grid;
  grid-template-columns: repeat(4, 20rem);
  justify-content: center;
  margin: 0;
  background-color: #000000;
`;

const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  color: white;
  cursor: pointer;
  list-style-type: none;

  .page-link {
    font-family: inherit;
    font-size: 1.3rem;
    background-color: #242424;
    padding: 1rem;

    &:hover {
      opacity: 0.8;
    }
  }
`;
