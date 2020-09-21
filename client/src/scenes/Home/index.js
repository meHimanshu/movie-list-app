import React,{useState,useEffect} from 'react';

import Navbar from "./modules/Navbar"
import Table from "./modules/Table";
import LoginModel from "./modules/LoginModel";
// import { Page } from "@material-ui/core";


export default function Home(props){
    const [openModal, setOpenModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated")
        console.log("isAuthenticated",isAuthenticated);
        if(isAuthenticated){
            setLoggedIn(true);
        }
    },[]);

    return(
        <div>
            <Navbar setOpenModal={setOpenModal} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            <Table loggedIn={loggedIn}/>
            {openModal && <LoginModel setLoggedIn={setLoggedIn} setOpenModal={setOpenModal} />}
        </div>
    )
}