import { useBearStore } from '@/store';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from '@/ui';

import { PaginationItem } from '@/ui';

import { PaginationLink } from '@/ui';
import { parseAsInteger, useQueryState } from 'nuqs';

export const getPagination = (count: number) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const blueprintCardsPerPage = useBearStore(
    state => state.blueprintCardsPerPage
  );
  const columns = useBearStore(state => state.columns);
  const maxLookingWindow = Math.min(3, columns);

  const totalPages = Math.ceil(count / blueprintCardsPerPage);
  if (totalPages <= 1) return;

  const items = [];
  if (page > 1) {
    items.push(
      <PaginationItem key="previous">
        <PaginationPrevious onClick={() => setPage(page - 1)} />
      </PaginationItem>
    );
  }
  if (page - maxLookingWindow > 1 && maxLookingWindow > 2) {
    items.push(
      <PaginationItem key="previous-ellipsis">
        <PaginationEllipsis
          onClick={() => setPage(page - maxLookingWindow - 1)}
        />
      </PaginationItem>
    );
  }
  for (let i = page - maxLookingWindow; i < page; i++) {
    if (i > 0 && i <= totalPages) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
  }
  items.push(
    <PaginationItem key={page}>
      <PaginationLink isActive>{page}</PaginationLink>
    </PaginationItem>
  );
  for (
    let i = page + 1;
    i <= Math.min(totalPages, page + maxLookingWindow);
    i++
  ) {
    items.push(
      <PaginationItem key={i}>
        <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
      </PaginationItem>
    );
  }
  if (totalPages > page + maxLookingWindow && maxLookingWindow > 2) {
    items.push(
      <PaginationItem key="next-ellipsis">
        <PaginationEllipsis
          onClick={() => setPage(page + maxLookingWindow + 1)}
        />
      </PaginationItem>
    );
  }
  if (page < totalPages) {
    items.push(
      <PaginationItem key="next">
        <PaginationNext onClick={() => setPage(page + 1)} />
      </PaginationItem>
    );
  }
  return (
    <Pagination>
      <PaginationContent>{items}</PaginationContent>
    </Pagination>
  );
};
