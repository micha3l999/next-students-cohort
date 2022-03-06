import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number, step: number = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

type PaginationProps = {
  totalRecords: number;
  pageLimit: number;
  pageNeighbours: number;
  onPageChangedNext(
    totalPages: number,
    pageLimit: number,
    currentPage: number
  ): any;
  onPageChangedPrevious(
    totalPages: number,
    pageLimit: number,
    currentPage: number
  ): any;
};

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  let { totalRecords = null, pageLimit = 12, pageNeighbours = 1 } = props;

  pageLimit = typeof pageLimit === "number" ? pageLimit : 12;
  totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

  // pageNeighbours can be: 0, 1 or 2
  pageNeighbours =
    typeof pageNeighbours === "number"
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

  let totalPages = Math.ceil(totalRecords / pageLimit);

  // Function to go to next page
  const nextPage = (event: any) => {
    const nextPage = currentPage + 1;
    props.onPageChangedNext(totalPages, pageLimit, nextPage);
    setCurrentPage(nextPage);
  };

  // Function to go to previous page
  const previousPage = (event: any) => {
    props.onPageChangedPrevious(totalPages, pageLimit, currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  // If there's no pages or records it returns null
  if (!totalRecords || totalPages == 1) {
    return null;
  }

  return (
    <>
      <div className={styles.paginationClass}>
        <div className="field is-grouped">
          <p className="control">
            <a href="#">
              <button
                className="button is-link"
                title="Previous"
                disabled={currentPage == 1}
                onClick={previousPage}
              >
                Previous
              </button>
            </a>
          </p>
          <p className="control">
            <a href="#">
              <button
                className="button is-link"
                title="Next page"
                disabled={currentPage == totalPages}
                onClick={nextPage}
              >
                Next page
              </button>
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Pagination;
