import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'expander',
    initialState: {
        expand: false
    },
    reducers: {
        toggle: state => {
            state.expand = !state.expand
        }
    }
});

export const {toggle} = slice.actions

export const selectExpanded = state => state.expanded.expand

export default slice.reducer