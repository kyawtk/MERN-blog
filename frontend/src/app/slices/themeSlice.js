import { createSlice } from "@reduxjs/toolkit";



const themeSlice  = createSlice({
    name: 'theme',
    initialState:{ 
        theme: localStorage.getItem('theme') || 'light',
        availableThemes: ["light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",]
    },
    reducers:{
        changeTheme:(state, action) =>{
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        }
    }
})
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;