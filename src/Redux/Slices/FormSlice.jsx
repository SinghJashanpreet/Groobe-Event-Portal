//Reducer takes 3 things
// Initial name, InitialState, reducer(functiions all)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "hellow",
};

const FormSlice = createSlice({
  name: "FormData",
  initialState,
  reducers: {
    print: (state) => {
      return {...state, value: state.value + "love u"}
    },
  },
});

export const { print } = FormSlice.actions;
export default FormSlice.reducer;
