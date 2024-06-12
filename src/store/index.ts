import { configureStore } from '@reduxjs/toolkit';
import { examReducer } from './slices/exam-slice';

const store = configureStore({
  reducer: {
    exam: examReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
export { store };
