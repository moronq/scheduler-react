import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../types/UserType'
import { EventsType } from '../../types/EventsType'
import { usersAPI } from '../../api/usersAPI'

type initialStateType = {
  guests: Array<UserType>
  events: Array<EventsType>
}

const initialState: initialStateType = {
  guests: [],
  events: [],
}

export const fetchGuests = createAsyncThunk(
  'events/fetchGuests',
  async (_, thunkAPI) => {
    try {
      const response = await usersAPI.getUsers()
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка при создании события')
    }
  }
)

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setGuests: (state, action: PayloadAction<Array<UserType>>) => {
      state.guests = action.payload
    },
    setEvents: (state, action: PayloadAction<Array<EventsType>>) => {
      state.events = action.payload
    },
  },
  extraReducers: {
    [fetchGuests.fulfilled.type]: (
      state,
      action: PayloadAction<Array<UserType>>
    ) => {
      state.guests = action.payload
    },
  },
})

export default eventSlice.reducer
