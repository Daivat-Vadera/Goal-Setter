import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalsService from "./goalsService";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isEditClicked: false,
  editGoalId: "",
  editGoalText: "",
};

//Create Goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.createGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.fulfillWithValue(message);
    }
  }
);

//Get User Goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.getGoals(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.fulfillWithValue(message);
    }
  }
);

//Delete User Goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.deleteGoal(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.fulfillWithValue(message);
    }
  }
);

//Edit User Goal
export const editGoal = createAsyncThunk(
  "goals/edit",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.editGoal(
        goalData.text,
        goalData.editGoalId,
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.fulfillWithValue(message);
    }
  }
);

export const goalsSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
    editClicked: (state) => {
      state.isEditClicked = true;
    },
    resetEditClicked: (state) => {
      state.isEditClicked = false;
    },
    editId: (state, action) => {
      state.editGoalId = action.payload;
    },
    editText: (state, action) => {
      state.editGoalText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSusses = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSusses = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSusses = true;
        state.goals = state.goals.filter((goal) => goal._id !== action.payload);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSusses = true;
      })
      .addCase(editGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, editClicked, resetEditClicked, editId, editText } =
  goalsSlice.actions;
export default goalsSlice.reducer;
