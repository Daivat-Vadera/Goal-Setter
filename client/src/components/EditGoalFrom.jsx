import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editGoal,
  resetEditClicked,
} from "../features/goals/goalsSlice";

function EditGoalForm() {
  const dispatch = useDispatch();
  const { editGoalId, editGoalText } = useSelector((state) => state.goals);
  const [text, setText] = useState(editGoalText);
  const handleSubmit = (e) => {
    dispatch(editGoal({ text, editGoalId }));
    dispatch(resetEditClicked());
    window.location.reload(false);
  };
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Edit Goal</p>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Edit Goal
          </button>
          <button
            className="btn btn-block"
            onClick={() => dispatch(resetEditClicked())}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditGoalForm;
