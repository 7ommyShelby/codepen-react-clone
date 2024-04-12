import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    loading: false,
    project : ""
}

export const codeSlice = createSlice({
    name: 'CodePen',
    initialState,
    reducers: {
        setuser: (state, action) => {
            state.user = action.payload
        },
        setloading: (state, action) => {
            state.loading = action.payload
        },
        setproject : (state, action)=>{
            state.project = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setloading, setuser,setproject } = codeSlice.actions
export default codeSlice.reducer