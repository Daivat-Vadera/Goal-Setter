import axios from "axios";

const API_URL = "/api/goals/";

//Create User Goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

//Get User Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//Create User Goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

//Edit User Goal
const editGoal = async (goalData, goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + goalId,
    { text: goalData },
    config
  );
  console.log(response.data);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  editGoal,
};
export default goalService;
