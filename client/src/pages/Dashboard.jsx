import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalsSlice";
import GoalItem from "../components/GoalItem";
import EditGoalForm from "../components/EditGoalFrom";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    goals,
    isLoading,
    isError,
    message,
    isEditClicked,
  } = useSelector((state) => state.goals);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      {isEditClicked ? <EditGoalForm /> : <GoalForm />}
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => {
              return <GoalItem key={goal._id} goal={goal} />;
            })}
          </div>
        ) : (
          <h3>You have not set any goal</h3>
        )}
      </section>
    </React.Fragment>
  );
}

export default Dashboard;
