import React from 'react';
import TextField from "@/app/UI/TextField";
import {FaAngleDown, FaLocationDot} from "react-icons/fa6";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/app/Stores";
import {GeocodeCords, removeLocation, setLocationPointer} from "@/app/Stores/LocationsSlice";
import DropList from "@/app/Components/Weather/DropList";
import {toggleLocationList} from "@/app/Stores/utilsSlice";

interface props {
    openGpsDialog: () => void
}

const WeatherHeader: React.FC<props> = ({openGpsDialog}) => {
    const {locationListIsOpen} = useSelector((state: RootState) => state.utils)
    const {locationPointer , locationsData} = useSelector((state: RootState) => state.locations)
    const dispatch = useAppDispatch()

    const changeLocation = (locationPointer : number) => {
        console.log("invoked1")
        dispatch(setLocationPointer(locationPointer))
        dispatch(toggleLocationList())
    }
    const deleteLocation = (locationPointer : number) => {
        console.log("invoked2")
        dispatch(removeLocation(locationPointer))
    }

    const toggleList = () => locationsData.length > 1 && dispatch(toggleLocationList())
    const checkLocationPermission = async () => {
        try {
            const result = await navigator.permissions.query({name: 'geolocation'});
            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Location permission granted');
                        // User has granted permission
                        const {latitude, longitude} = position.coords;
                        dispatch(GeocodeCords(latitude, longitude))
                        // dispatch(getCurrentWeather(latitude,longitude))
                        // dispatch(getDailyWeather(latitude,longitude))
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Handle location retrieval error
                    }
                );
            } else if (result.state === 'denied') {
                console.log('Location permission denied');
            } else if (result.state === 'prompt') {
                openGpsDialog()
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
        }
    };

    return (
        <header className={"flex max-md:flex-col max-md:gap-5 justify-between items-center "}>
            <div onClick={toggleList} className={"flex cursor-pointer items-center max-md:justify-center justify-start gap-2.5 relative max-md:w-full w-1/4"}>
                <h1 className={"max-md:text-center w-fit text-4xl font-light"}>{locationsData.length !== 0 ? locationsData[locationPointer].address : "..."}</h1>
                {locationsData.length > 1 &&
                    <>
                    <FaAngleDown className={`text-2xl ${locationListIsOpen ? "rotate-180" : "rotate-0"} duration-300`}/>
                    <DropList listData={locationsData} isOpen={locationListIsOpen} onSelect={changeLocation}
                                                       onButtonClick={deleteLocation}/>
                    </>
            }
            </div>
            <div className={"max-md:w-full w-1/3 flex items-center gap-5 justify-center md:justify-end "}>
                <TextField/>
                <button onClick={checkLocationPermission}
                        className={"w-[30px] h-[30px] hover:bg-white hover:text-black grid place-content-center rounded-xl text-lg"}>
                    <FaLocationDot/></button>
            </div>

        </header>
    );
};

export default WeatherHeader;