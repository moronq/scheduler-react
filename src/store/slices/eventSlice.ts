import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../types/UserType'
import { EventsType } from '../../types/EventsType'
import { usersAPI } from '../../api/usersAPI'

type initialStateType = {
  guests: Array<UserType>
  events: Array<EventsType>
  error: string | null
}

const initialState: initialStateType = {
  guests: [],
  events: [],
  error: null,
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

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (event: EventsType, thunkAPI) => {
    try {
      const events = localStorage.getItem('events') || '[]'
      const json = JSON.parse(events) as Array<EventsType>
      json.push(event)
      return json
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
    [fetchGuests.pending.type]: (state) => {
      state.error = null
    },
    [fetchGuests.fulfilled.type]: (
      state,
      action: PayloadAction<Array<UserType>>
    ) => {
      state.guests = action.payload
    },
    [fetchGuests.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [createEvent.pending.type]: (state) => {
      state.error = null
    },
    [createEvent.fulfilled.type]: (
      state,
      action: PayloadAction<Array<EventsType>>
    ) => {
      state.events = action.payload
      debugger
      localStorage.setItem('events', JSON.stringify(state.events))
    },
    [createEvent.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export default eventSlice.reducer
