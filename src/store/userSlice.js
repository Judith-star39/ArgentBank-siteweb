import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { logout } from './authSlice'


export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) return data.body
      return thunkAPI.rejectWithValue(data.message)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateUsername = createAsyncThunk(
  'user/updateUsername',
  async (userName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName }),
      })
      const data = await response.json()
      if (response.ok) return data.body.userName
      return thunkAPI.rejectWithValue(data.message)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.userName = action.payload.userName
      })

      .addCase(updateUsername.fulfilled, (state, action) => {
        state.userName = action.payload
      })
      // Dans extraReducers :
    .addCase(logout, (state) => {
      state.firstName = ''
      state.lastName = ''
      state.userName = ''
    })
  },
  

})

export default userSlice.reducer