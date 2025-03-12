import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import companyService from "./companyService";

const initialState = {
  companys: [],
};

export const companyCreate = createAsyncThunk(
  "product/productCreate",
  async (company, thunkAPI) => {
    try {
      return await companyService.companyCreate(company);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const companySlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    setEditCompany: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(companyCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(companyCreate.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("company added");
      });
  },
});

export const { handleChange, setEditCompany, clearValues } =
  companySlice.actions;
export default companySlice.reducer;
