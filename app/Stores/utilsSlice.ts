import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "@/app/Stores/Store";
import {disableLocationExists} from "@/app/Stores/LocationsSlice";

export type options = "Temp" | "Wind" | "Rain" | "UV"
export type toastTypes = "success" | "error" | "normal"

export type utils = {
    expand: boolean,
    locationListIsOpen: boolean
    selectedOption: options
    leftButtonEnabled: boolean,
    rightButtonEnabled: boolean,
    name: string,
    firstTime: boolean,
    showToast:boolean,
    toastType:toastTypes,
    toastMessage:any
};

const initialState: utils = {
    expand: false,
    locationListIsOpen:false,
    selectedOption: "Temp",
    leftButtonEnabled: true,
    rightButtonEnabled: true,
    name: "",
    firstTime: false,
    showToast:false,
    toastType:"normal",
    toastMessage:""
};
const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        toggleExpansion: (state: utils) => {
            state.expand = !state.expand;
            console.log(state.expand)
        },
        changeSelectedOption: (state: utils, actions: PayloadAction<options>) => {
            state.selectedOption = actions.payload
        },
        updateLeftButton: (state: utils, actions: PayloadAction<boolean>) => {
            state.leftButtonEnabled = actions.payload
        },
        updateRightButton: (state: utils, actions: PayloadAction<boolean>) => {
            state.rightButtonEnabled = actions.payload
        },
        setName: (state: utils, actions: PayloadAction<string>) => {
            localStorage.setItem("name", actions.payload)
            state.name = actions.payload
        },
        setFirstTime: (state: utils, action: PayloadAction<boolean>) => {
            state.firstTime = action.payload
            localStorage.setItem("firstTime", JSON.stringify(action.payload))
        },
        setLocationListIsOpened : (state:utils, action : PayloadAction<boolean>) => {
           state.locationListIsOpen = action.payload
        },
        setToast : (state : utils , actions:PayloadAction<boolean>) => {
            state.showToast = actions.payload
        },
        setToastInfo : (state : utils , action : PayloadAction<{message:string,type:toastTypes}>) =>{
            state.toastMessage = action.payload.message
            state.toastType = action.payload.type
        }
    },
});

export const hydrateUserFromLocal = () => {
    return async (dispatch: Dispatch) => {
        let Username: string = localStorage.getItem("name") ?? ""
        let firstTime: boolean = JSON.parse(localStorage.getItem("firstTime") ?? "true")
        dispatch(setName(Username))
        dispatch(setFirstTime(firstTime))
    }
}

export const toggleToast = (message:string , type : toastTypes) => {
    return(dispatch :AppDispatch) => {
        dispatch(setToastInfo({message,type}))
        dispatch(setToast(true))
        setTimeout(()=>{
            dispatch(disableLocationExists())
            dispatch(setToast(false))
        },5000)
    }
}
export const {
    toggleExpansion,
    changeSelectedOption,
    updateLeftButton,
    updateRightButton,
    setName,
    setFirstTime,
    setLocationListIsOpened,
    setToast,
    setToastInfo
} = utilsSlice.actions;

export default utilsSlice;
