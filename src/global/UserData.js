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
        console.log("User ID set to:", state.userId); // Debugging log
     }
  },
});

export const { setUserId } = userData.actions;
export default userData.reducer;
