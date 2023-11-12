import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'cart',
    initialState:  { 
        email:'sweshik@gmail.com',
        password:'12345',
        isLogged: false,
        invalidLogin: false
    },
    reducers:{
        login(state, action){
            if(state.email == action.payload.email && state.password == action.payload.password){
                state.isLogged = true
                window.location.href = '/dashboard';
            }else{
                state.invalidLogin = true
            }
        },
        logout(state, action){
            state.isLogged = false
        }
    }
})
export const loginActions = loginSlice.actions;
export default loginSlice;