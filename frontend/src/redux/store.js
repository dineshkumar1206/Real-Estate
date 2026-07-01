import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./AdminAuthSlice/AdminAuthSlice"; // Imports your admin auth slices
import projectsReducer from "./dashbord-card-1/projectSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer, // Ties admin states securely to 'state.admin'
    projects: projectsReducer,
  },
});