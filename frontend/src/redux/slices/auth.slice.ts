import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/axios';

const storedToken = localStorage.getItem('token');

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: storedToken || null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk('auth/signin', async (credentials: { email: string; password: string }) => {
  const res = await api.post('/auth/signin', credentials);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.access_token
        localStorage.setItem('token', action.payload.access_token);;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;