import "./CheckmarkCell.scss";
import { ImCheckmark, ImCross } from "react-icons/im";
// import { IconContext } from "react-icons";
import classnames from "classnames";

export type ICheckmarkCellProps = {
  affirmative: boolean;
};

function CheckmarkCell({ affirmative }: ICheckmarkCellProps) {
  // return (
  //   <IconContext.Provider value={{ color: accepted ? "#13A850" : "#C6332E", size: '2rem'}}>
  //     <div className="CheckmarkCell">
  //       {accepted ? <ImCheckmark /> : <ImCross />}
  //     </div>
  //   </IconContext.Provider>
  // )
  return (
    <div className={classnames("CheckmarkCell", { "CheckmarkCell__affirmative": affirmative, "CheckmarkCell__negative": !affirmative })}>
      {affirmative ? <ImCheckmark /> : <ImCross />}
    </div>
  )
}

export default CheckmarkCell;
