import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    idToken: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, data) => {
            state.idToken = data.payload;
        },
        clearUser: (state) => {
            state.idToken = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer