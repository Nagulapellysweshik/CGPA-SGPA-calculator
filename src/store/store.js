import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import sgpaSlice from './sgpaSlice';
import cgpaSlice from "./cgpaSlice";
import historySlice from "./historySlice";
// import cgpaManualSlice from "./cgpaManualSlice";
const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        sgpa: sgpaSlice.reducer,
        cgpa: cgpaSlice.reducer,
        history: historySlice.reducer,
        // cgpaManual: cgpaManualSlice.reducer,
    }
});


export default store;