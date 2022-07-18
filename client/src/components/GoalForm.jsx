import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalsSlice";

function GoalForm(props) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
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
           Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
