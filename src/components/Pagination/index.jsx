import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  
  if (totalPages <= 1) {
    return null;
  }
  
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let pageNumbers = [];
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      
      pageNumbers.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(totalPages - 1, maxPagesToShow - 1);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - (maxPagesToShow - 2));
        end = totalPages - 1;
      }
      if (start > 2) {
        pageNumbers.push('...');
      }
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <Pagination className="d-flex justify-content-center mt-4">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink 
          previous 
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>
      
      {getPageNumbers().map((item, index) => (
        item === '...' ? (
          <PaginationItem disabled key={`ellipsis-${index}`}>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={item} active={currentPage === item}>
            <PaginationLink onClick={() => onPageChange(item)}>
              {item}
            </PaginationLink>
          </PaginationItem>
        )
      ))}
      
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink 
          next 
          onClick={() => onPageChange(currentPage + 1)}
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
