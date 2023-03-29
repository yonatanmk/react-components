import "./LinkCell.scss";

export type ILinkCellProps = {
  text: string;
  url: string;
};

function LinkCell({ text, url }: ILinkCellProps) {
  return (
    <div className="LinkCell">
      <a href={url}>{text}</a>  
    </div>
  )
}

export default LinkCell;
