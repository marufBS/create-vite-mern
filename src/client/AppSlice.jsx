import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: 0,
  reducers: {
    addValue: ((state) => {
      state = state++
    })
  }
})

export const { addValue } = appSlice.actions
export default appSlice.reducer;