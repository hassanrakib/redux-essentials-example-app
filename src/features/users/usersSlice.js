import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

// const initialState = []

const usersAdapter = createEntityAdapter();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get('/fakeApi/users');
  return response.data;
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //   return action.payload;
    // })
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  }
});

export default usersSlice.reducer;

// export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);