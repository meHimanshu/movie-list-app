import React from 'react';

import Navbar from "./modules/Navbar"
import Table from "./modules/Table";
// import { Page } from "@material-ui/core";


export default function Home(props){
    return(
        <div>
            <Navbar/>
            <Table/>
        </div>
    )
}