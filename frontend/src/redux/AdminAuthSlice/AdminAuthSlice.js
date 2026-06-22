import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api"; // Adjust this path based on where you put api.js

const admin = JSON.parse(localStorage.getItem("RealEstate_admin"));

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login Admin
export const loginAdmin = createAsyncThunk(
  "Real_Estate/login",
  async (adminData, thunkAPI) => {
    try {
      // Points exactly to our backend routes: app.use("/api/auth", adminRoutes)
      const response = await api.post("/auth/login", adminData);

      if (response.data) {
        const userDataToStore = {
          name: response.data.name,
          role: response.data.role,
        };
        localStorage.setItem("RealEstate_admin", JSON.stringify(userDataToStore));
      }

      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout Admin
export const logoutAdmin = createAsyncThunk("Real_Estate/logout", async () => {
  localStorage.removeItem("RealEstate_admin");
  await api.post("/auth/logout");
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.isSuccess = true;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;