import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        user : []
}

export const codeSlice = createSlice({
    name: 'CodePen',
    initialState,
    reducers: {
        setuser : (state,action)=>{
            state.user = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {  } = codeSlice.actions
export default codeSlice.reducer