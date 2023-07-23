import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import userApiReducer from './slices/userApiSlice';
const store = configureStore({
    reducer:{ auth:authReducer ,userApi: userApiReducer},
    devTools:true,
})


export default store;