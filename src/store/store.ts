import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'

const rootReducer = combineReducers(reducers)

export const store = configureStore({
  reducer: rootReducer,
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
