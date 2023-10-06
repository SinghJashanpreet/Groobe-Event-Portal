import { createSlice } from "@reduxjs/toolkit";

const initialFormData = {
  Society: "",
  Service: "",
  Design: "",
  Hands: "",
  Length: "",
  
};

const FormSlice = createSlice({
  name: "FormData",
  initialState: initialFormData,
  reducers: {
    print: (state) => {
      const stateObject = { ...state };
      console.log("State as Object:", stateObject);
    },
    setData: (state, action) => {
      // Merge the payload with the existing state
      return { ...state, ...action.payload };
    },
  },
});

export const { print, setData } = FormSlice.actions;
export default FormSlice.reducer;
