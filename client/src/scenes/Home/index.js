import React,{useState} from 'react';

import Navbar from "./modules/Navbar"
import Table from "./modules/Table";
import LoginModel from "./modules/LoginModel";
// import { Page } from "@material-ui/core";


export default function Home(props){
    const [openModal, setOpenModal] = useState(false)
    return(
        <div>
            <Navbar setOpenModal={setOpenModal}/>
            <Table/>
            {openModal && <LoginModel setOpenModal={setOpenModal} />}
        </div>
    )
}