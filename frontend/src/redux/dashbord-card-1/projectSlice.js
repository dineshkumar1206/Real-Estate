import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Fetch all projects from database
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return rejectWithValue(message);
    }
  }
);

// Save (Create or Update) project listing with files
export const saveProjectWithMedia = createAsyncThunk(
  'projects/saveProjectWithMedia',
  async ({ formData, isEditing, existingId }, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append('title', formData.title || '');
      data.append('builder', formData.builder || '');
      data.append('location', formData.location || '');
      data.append('route', formData.route || '');
      data.append('price', formData.price || 'Price on request');
      data.append('status', formData.status || 'Under Construction');
      data.append('possessionDate', formData.possessionDate || '');
      data.append('reraId', formData.reraId || '');
      data.append('totalApartments', formData.totalApartments || '');
      data.append('launchDate', formData.launchDate || '');
      data.append('description', formData.description || '');
      data.append('projectType', formData.projectType || 'fast-moving');
      data.append('config', formData.config || '');
      data.append('area', formData.area || '');

      const featuresArr = Array.isArray(formData.features)
        ? formData.features
        : (typeof formData.features === 'string'
            ? formData.features.split(',').map((f) => f.trim())
            : []);
      data.append('features', JSON.stringify(featuresArr));

      const amenitiesArr = Array.isArray(formData.amenities)
        ? formData.amenities
        : (typeof formData.amenities === 'string'
            ? formData.amenities.split(',').map((a) => a.trim())
            : []);
      data.append('amenities', JSON.stringify(amenitiesArr));

      // Primary image: only send a new file when one is picked; otherwise leave it
      // empty so the backend keeps the existing image (avoids re-sending large base64 text)
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      }

      // Carousel images handling: send only the ids of existing images to keep.
      // The backend re-attaches the stored src, so we avoid sending large base64 text back.
      const existingCarousel = formData.existingCarousel || formData.carouselImages || [];
      data.append('existingCarouselImages', JSON.stringify(existingCarousel.map((img) => ({ id: img.id }))));

      if (formData.carouselImagesFiles && formData.carouselImagesFiles.length > 0) {
        formData.carouselImagesFiles.forEach((item) => {
          if (item.file instanceof File) {
            data.append('carouselImagesFiles', item.file);
          }
        });
      }

      let response;
      if (isEditing && existingId) {
        response = await api.put(`/projects/${existingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await api.post('/projects', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      return { project: response.data, isEditing, existingId };
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return rejectWithValue(message);
    }
  }
);

// Delete project from database
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${id}`);
      return id;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return rejectWithValue(message);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    listings: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Save Project
      .addCase(saveProjectWithMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveProjectWithMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        const { project, isEditing, existingId } = action.payload;
        if (isEditing) {
          state.listings = state.listings.map((p) =>
            p.id === existingId ? { ...p, ...project } : p
          );
        } else {
          state.listings.unshift(project);
        }
      })
      .addCase(saveProjectWithMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = state.listings.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;