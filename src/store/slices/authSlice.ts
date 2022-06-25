import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserType } from '../../types/UserType'

export type authState = {
  isAuth: boolean
  user: UserType
  isLoading: boolean
  error: string | null
}

const initialState: authState = {
  isAuth: false,
  user: {} as UserType,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (user: UserType, thunkAPI) => {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const response = await axios
        .get<Array<UserType>>('users.json')
        .then((res) => res.data)
      const mockUser = response.find(
        (u) => u.username == user.username && u.password == user.password
      )
      if (mockUser) {
        return mockUser
      } else {
        return thunkAPI.rejectWithValue('Неверный логин или пароль')
      }
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка при входе')
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
      state.isLoading = false
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    logout: (state) => {
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      state.user = {} as UserType
      state.isAuth = false
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [login.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
      state.isLoading = false
      localStorage.setItem('auth', 'true')
      localStorage.setItem('user', action.payload.username)
      state.isAuth = true
      state.user = action.payload
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setAuth, setUser, setError, setIsLoading, logout } =
  authSlice.actions
export default authSlice.reducer
