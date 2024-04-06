import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


export type flagsSlice = {
    initialLocationState :boolean,
    loading:boolean,
    initialLoad:boolean,
    transition:boolean,
    isRefreshing:boolean
    useGPS:boolean,
    gpsError:boolean
}
const initialState : flagsSlice = {
    initialLocationState:false,
    loading:true,
    initialLoad:true,
    transition:true,
    isRefreshing:false,
    useGPS:false,
    gpsError:false
}
const StatsSlice = createSlice({
    name:"Stats",
    initialState,
    reducers:{
        setInitialLocationState : (state : flagsSlice , action :PayloadAction<boolean>) => {
            state.initialLocationState = action.payload
            localStorage.setItem("initialLocationState",JSON.stringify(state.initialLocationState))
        },
        setLoading : (state : flagsSlice , action :PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        toggleTransition : (state : flagsSlice , action : PayloadAction<boolean>) =>{
            state.transition = action.payload
        },
        disableInitialLoad : (state : flagsSlice) =>{
            state.initialLoad = false
        },
        setIsRefreshing: (state : flagsSlice , action:PayloadAction<boolean>) => {
            state.isRefreshing = action.payload
        },
        setUseGps : (state : flagsSlice , action : PayloadAction<boolean>) => {
            state.useGPS = action.payload
            localStorage.setItem("useGPS",JSON.stringify(action.payload))
        },
        setGpsError : (state : flagsSlice , action:PayloadAction<boolean>) => {
            state.gpsError = action.payload
        }
    }
})

export const hydrateFlags = ()=>{
    return (dispatch:Dispatch) =>{
        const initialLocationState : boolean = JSON.parse(localStorage.getItem("initialLocationState") ?? "false")
        const useGPS : boolean = JSON.parse(localStorage.getItem("useGPS") ?? "false")
        dispatch(setInitialLocationState(initialLocationState))
        dispatch(setUseGps(useGPS))
    }
}

export const {
    setInitialLocationState,
    setLoading,
    disableInitialLoad,
    toggleTransition,
    setIsRefreshing,
    setUseGps,
    setGpsError
} = StatsSlice.actions

export default StatsSlice