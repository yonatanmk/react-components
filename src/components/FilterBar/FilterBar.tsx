import "./FilterBar.scss";

export type IFilterBarProps = {
  children: React.ReactNode;
};

function FilterBar({ children }: IFilterBarProps) {
  return (
    <div className="FilterBar">
      <p className="FilterBar__title">Filters</p>
      {children}
    </div>
  )
}

export default FilterBar;
