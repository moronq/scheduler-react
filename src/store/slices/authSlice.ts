import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import axios from 'axios'
import { UserType } from '../../types/UserTypes'

export type authState = {
  isAuth: boolean
  user: UserType
  isLoading: boolean
  error: string
}

const initialState: authState = {
  isAuth: false,
  user: {} as UserType,
  isLoading: false,
  error: '',
}

export const login = createAsyncThunk(
  'auth/login',
  async (user: UserType, thunkAPI) => {
    try {
      let mockUser
      return await axios
        .get<Array<UserType>>('./users.json').then(res=>{
          return mockUser = res.data.find(
            (u) => u.username === user.username && u.password === user.password
          )
        })
    } catch (e) {
      thunkAPI.rejectWithValue('Не удалось войти =(')
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
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.isLoading = true
      state.error = ''
    },
    [login.fulfilled.type]: (state, action: PayloadAction<<UserType>) => {
      console.log(action.payload)
      // if (action.payload) {
      //   localStorage.setItem('auth', 'true')
      //   localStorage.setItem('user', action.payload.username)
      //   state.isAuth = true
      //   state.user = action.payload
      // } else {
      //   state.error = 'Некорректный логин или пароль'
      // }
    },
    [login.rejected.type]: (state) => {
      state.error = 'Произошла ошибка при логине'
    },
  },
})

export const { setAuth, setUser, setError, setIsLoading } = authSlice.actions
export default authSlice.reducer
