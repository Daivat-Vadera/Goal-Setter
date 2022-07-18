import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteGoal,
  editClicked,
  editId,
  editText,
} from "../features/goals/goalsSlice";

function GoalItem(props) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(editClicked());
    dispatch(editId(props.goal._id));
    dispatch(editText(props.goal.text));
  };
  return (
    <React.Fragment>
      <div className="goal">
        <div>{new Date(props.goal.createdAt).toLocaleString()}</div>
        <h2>{props.goal.text}</h2>
        <button
          onClick={() => {
            dispatch(deleteGoal(props.goal._id));
          }}
          className="close"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <button onClick={handleClick} className="edit">
          <i className="fa-solid fa-edit"></i>
        </button>
      </div>
    </React.Fragment>
  );
}

export default GoalItem;
