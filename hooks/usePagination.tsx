import { useState } from 'react';

const usePagination = (_limit: number) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(_limit);

  return { page, setPage, limit, setLimit };
};

export default usePagination;
