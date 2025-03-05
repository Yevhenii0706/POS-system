import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from '../auth/authService'
import { toast } from 'react-toastify'
import {addLocalStorageUser, getLocalStorageToken, getLocalStorageUser, deleteLocalStorageUser} from '../../utils/localStorage'
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const user = getLocalStorageUser()
const token = getLocalStorageToken();

const initialState = {
    user: user ? user : '',
    users: [],
    error: false,
    loading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    console.log("user--->", user)
    try {
        return await axios('https://inventory-r06h.onrender.com/api/login', { // No need to specify the full URL, just the path
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: 'POST',
            data:{
                email:user.email, password: user.password
            },
            body: JSON.stringify({ email:user.email, password: user.password }),
            credentials: 'include', // Ensure credentials (cookies, etc.) are sent
        });
    } catch (error) {
        console.log("error====>", error.response);
        
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const logout = createAsyncThunk('auth/logout', (_, thunkAPI) => {
    try {
        return authService.logout()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const allUsers = createAsyncThunk('auth/allUsers', (_, thunkAPI) => {
    try {
      return authService.allUsers()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const resetPass = createAsyncThunk('auth/reset', async (passData, thunkAPI) => {
    try {
        if(passData.password === passData.confirmPassword) {
            return await axios('https://inventory-r06h.onrender.com/api/auth/reset-password/confirm', { // No need to specify the full URL, just the path
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                method: 'POST',
                data:{
                    email:user.email, resetToken: token, newPassword: passData.password
                },
                credentials: 'include', // Ensure credentials (cookies, etc.) are sent
            });
        } else {
            toast("Confirm password!")
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            //state.user = action.payload
            //addLocalStorageUser(action.payload)
            toast.success('user successfully registered')
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.data
            addLocalStorageUser(action.payload.data.data.user)
            localStorage.setItem("token", action.payload.data.data.token);
            toast.success('user success login')
        })
        .addCase(login.rejected, (state, action) => {
            console.log("reject");
            state.loading = false
            state.error = true
            // state.message = action.payload.responseMessage
            state.user = null
            // console.log("responseMessage----->", action.payload.responseMessage);
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            deleteLocalStorageUser()
            toast.success('User logout')
        })
        .addCase(allUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
