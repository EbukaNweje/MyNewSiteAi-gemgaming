import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

const userData = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
        state.userId = action.payload;
        }
  },
});

export const { setUserId } = userData.actions;
export default userData.reducer;
