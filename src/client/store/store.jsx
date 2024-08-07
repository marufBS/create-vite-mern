import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../AppSlice";


const store = configureStore({
    reducer: {
        app: AppReducer,
    }
})

export default store;