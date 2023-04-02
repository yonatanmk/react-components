import { configureStore } from '@reduxjs/toolkit'
import counterReducer, { ICounterState } from './counterSlice';

export interface IStoreState {
  counter: ICounterState,
}

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})