import "./HeaderCell.scss";
import { useContext } from 'react';
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { SORT_ORDERS } from '../../util';
import { TableSortContext } from '../../contexts';
import classnames from "classnames"

export type IHeaderCellProps = {
  name: string;
  field: string;
};

function HeaderCell({ name, field }: IHeaderCellProps) {
  const { sortPredicate, setSortPredicate, sortOrder, setSortOrder } = useContext(TableSortContext);

  const isSorted = field === sortPredicate;
  const ArrowIcon = sortOrder === SORT_ORDERS.ASC ? BsArrowDown : BsArrowUp;


  const toggleSortOrder = () => {
    setSortOrder(sortOrder === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC)
  }

  const onHeaderClick = () => {
    if (isSorted) {
      toggleSortOrder()
    } else {
      setSortPredicate(field)
      setSortOrder(SORT_ORDERS.ASC)
    }
  }

  return (
    <div className={classnames("HeaderCell", { HeaderCell__unsorted: !isSorted })}>
      <button onClick={onHeaderClick}>
        <p>{name}</p>
        <ArrowIcon />
      </button>
    </div>
  )
}

export default HeaderCell;
