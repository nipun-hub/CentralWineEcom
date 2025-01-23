import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  colours: [
    {
      color1: '#FFFFFF',
      color2: '#FFFD86',
      colorDoct: '#A67102',
    },
    {
      color1: '#ffffff',
      color2: '#FEFFC1',
      colorDoct: '#A67102',
    },
    {
      color1: '#f3f4f6',
      color2: '#e5e7eb',
      colorDoct: '#d1d5db',
    },
    {
      color1: '#FCFCFC',
      color2: '#FFFBA2',
      colorDoct: '#B67A04',
    },
    {
      color1: '#FDFDFD',
      color2: '#FFFFE0',
      colorDoct: '#B67A04',
    },
    {
      color1: '#F4F4F5',
      color2: '#EBEDF0',
      colorDoct: '#D3D8DF',
    },
  ],
}

export  const cardColoursSlice = createSlice({
  name: 'cardColours',
  initialState,
  reducers: {
    addColour: (state, action) => {
      state.colours.push(action.payload)
    },
    removeColour: (state, action) => {
      state.colours = state.colours.filter(
        (_, index) => index !== action.payload,
      )
    },
    updateColour: (state, action) => {
      const { index, newColour } = action.payload
      state.colours[index] = newColour
    },
  },
})

export const { addColour, removeColour, updateColour } =
  cardColoursSlice.actions
