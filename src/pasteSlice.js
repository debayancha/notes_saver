import { createSlice } from '@reduxjs/toolkit'
import { ToastContainer, toast } from 'react-toastify';


const initialState = {
  paste:localStorage.getItem('paste')?JSON.parse(localStorage.getItem('paste')):[],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state,action) => {
      const paste =action.payload;
      state.paste.push(paste);
      localStorage.setItem("paste",JSON.stringify(state.paste));
      toast("paste created successfully!!")
    },
    updatToPaste: (state,action) => {
      const paste =action.payload;
      const index=state.paste.findIndex((p)=>p._id===paste._id);

      if(index>=0){
        state.paste[index]=paste;
        localStorage.setItem("paste",JSON.stringify(state.paste));
        toast.success("paste updated successfully!!")
      }
      state.paste=[];
    },
    resetAllPaste: (state, action) => {
      state.paste=[];
      localStorage.removeItem("paste");
    },
    removeFromPaste: (state, action) => {
      const id=action.payload;
      const index=state.paste.findIndex((p)=>p._id===id);
      if(index>=0){
        state.paste.splice(index,1);
        localStorage.setItem("paste",JSON.stringify(state.paste));
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updatToPaste, resetAllPaste ,removeFromPaste} = pasteSlice.actions

export default pasteSlice.reducer