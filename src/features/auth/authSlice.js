import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";
import { toast } from "react-toastify";
import {
  addLocalStorageUser,
  getLocalStorageToken,
  getLocalStorageUser,
  deleteLocalStorageUser,
} from "../../utils/localStorage";

const user = getLocalStorageUser();
const token = getLocalStorageToken();

const initialState = {
  user: user ? user : "",
  users: [],
  error: false,
  loading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk("auth/logout", (_, thunkAPI) => {
  try {
    return authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const allUsers = createAsyncThunk("auth/allUsers", (_, thunkAPI) => {
  try {
    return authService.allUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const resetPass = createAsyncThunk(
  "auth/resetPass",
  async (passData, thunkAPI) => {
    try {
      if (passData.password === passData.confirmPassword) {
        console.log(user.email);
        return authService.resetPass({
          email: user.email,
          resetToken: token,
          newPassword: passData.password,
        });
      } else {
        toast("Confirm password!");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("user successfully registered");
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.responseMessage;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        addLocalStorageUser(action.payload.data.user);
        localStorage.setItem("token", action.payload.data.token);
        toast.success("user success login");
      })
      .addCase(login.rejected, (state, action) => {
        console.log("reject");
        state.loading = false;
        state.error = true;
        state.message = action.payload.responseMessage;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        deleteLocalStorageUser();
        toast.success("User logout");
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        // state.message = action.payload;
      })
      .addCase(resetPass.rejected, (state, action) => {
        // state.message = action.response;
        // console.log("reject===>", action.payload);
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
