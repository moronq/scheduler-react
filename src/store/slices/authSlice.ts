import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type authState = {
  isAuth: boolean
}

const initialState: authState = {
  isAuth: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer
