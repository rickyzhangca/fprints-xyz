import { useBearStore } from '@/store';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/ui';
import { parseAsInteger, useQueryState } from 'nuqs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

type PaginateProps = {
  count: number;
};

export const Paginate = ({ count }: PaginateProps) => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      history: 'push',
    })
  );
  const blueprintCardsPerPage = useBearStore(
    state => state.blueprintCardsPerPage
  );
  const columns = useBearStore(state => state.columns);
  const maxLookingWindow = Math.min(3, columns);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    scrollToTop();
  };

  const totalPages = Math.ceil(count / blueprintCardsPerPage);
  if (totalPages <= 1) return;

  const items = [];
  if (page > 1) {
    items.push(
      <PaginationItem key="previous">
        <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
      </PaginationItem>
    );
  }
  if (page - maxLookingWindow > 1 && maxLookingWindow > 2) {
    items.push(
      <PaginationItem key="previous-ellipsis">
        <PaginationEllipsis
          onClick={() => handlePageChange(page - maxLookingWindow - 1)}
        />
      </PaginationItem>
    );
  }
  for (let i = page - maxLookingWindow; i < page; i++) {
    if (i > 0 && i <= totalPages) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
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
        <PaginationLink onClick={() => handlePageChange(i)}>{i}</PaginationLink>
      </PaginationItem>
    );
  }
  if (totalPages > page + maxLookingWindow && maxLookingWindow > 2) {
    items.push(
      <PaginationItem key="next-ellipsis">
        <PaginationEllipsis
          onClick={() => handlePageChange(page + maxLookingWindow + 1)}
        />
      </PaginationItem>
    );
  }
  if (page < totalPages) {
    items.push(
      <PaginationItem key="next">
        <PaginationNext onClick={() => handlePageChange(page + 1)} />
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>{items}</PaginationContent>
    </Pagination>
  );
};
