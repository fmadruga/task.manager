import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export interface Task {
  id: number;
  uuid: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'DONE' | 'LATE' | 'TESTING' | 'PENDING' | 'STARTED' | string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
}

const storedToken = localStorage.getItem('token');

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await api.get('/tasks', {headers: {Authorization: storedToken}});
  return res.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Omit<Task, 'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
  const res = await api.post('/tasks', task, {headers: {Authorization: storedToken}});
  return res.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ uuid, data }: { uuid: string; data: Partial<Task> }) => {
  const res = await api.patch(`/tasks/${uuid}`, data, {headers: {Authorization: storedToken}});
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (uuid: string) => {
  await api.delete(`/tasks/${uuid}`, {headers: {Authorization: storedToken}});
  return uuid;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar tarefas';
      })
      // Create
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      // Update
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) {
          state.tasks[idx] = action.payload;
        }
      })
      // Delete
      // .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
      //   state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      // });
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
