import { useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  return { page, setPage, limit, setLimit };
};

export default usePagination;
