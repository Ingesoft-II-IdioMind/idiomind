"use client";

import { useAppSelector } from "app/redux/hooks";
import NavbarLogged from "./NavbarLogged";
import Navbar from "./Navbar";
import { useRetrieveUserQuery } from "app/redux/features/authApiSlice";

export default function Navbars () {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

    if (isAuthenticated && user?.first_name != undefined){
        return(<NavbarLogged/>);
    }
    return(<Navbar/>);
}