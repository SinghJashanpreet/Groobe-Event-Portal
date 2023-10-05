import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./Slices/FormSlice";

export const Store = configureStore({
    reducer:{
        FormData: FormSlice
    }
})