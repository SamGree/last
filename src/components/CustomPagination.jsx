import { Pagination, Dropdown, DropdownButton } from "react-bootstrap";

import "../styles/custom-pagination.css";

const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
}) => {
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalItems <= itemsPerPage;

  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (items) => {
    onItemsPerPageChange(items);
    onPageChange(1);
  };

  return (
    <div className="pagination-container">
      <DropdownButton
        id="dropdown-items-per-page"
        title={`Items per page: ${itemsPerPage}`}
        variant="secondary"
        onSelect={(eventKey) => handleItemsPerPageChange(Number(eventKey))}
        className="dropdown-items-per-page"
      >
        <Dropdown.Item eventKey="5">5</Dropdown.Item>
        <Dropdown.Item eventKey="10">10</Dropdown.Item>
        <Dropdown.Item eventKey="20">20</Dropdown.Item>
      </DropdownButton>

      <Pagination className="pagination-buttons">
        <Pagination.First
          disabled={isFirstPage}
          onClick={() => handleClick(1)}
        />
        <Pagination.Prev
          disabled={isFirstPage}
          onClick={() => handleClick(currentPage - 1)}
        />
        <Pagination.Item disabled>
          {totalItems === 0 ? `0 of 0` : `${endItem} of ${totalItems}`}
        </Pagination.Item>
        <Pagination.Next
          disabled={isLastPage}
          onClick={() => handleClick(currentPage + 1)}
        />
        <Pagination.Last
          disabled={isLastPage}
          onClick={() => handleClick(totalPages)}
        />
      </Pagination>
    </div>
  );
};

export default CustomPagination;
