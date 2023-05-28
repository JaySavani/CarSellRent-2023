import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import UserTable from '../components/Tables/User';
import SellCarTable from '../components/Tables/SellCar';
import RentCarTable from '../components/Tables/RentCar';

function Profile() {

    return(
<body>
    <Header></Header><br/><br/><br/><br/>
    <UserTable></UserTable><br></br><br></br>
    <SellCarTable></SellCarTable><br></br><br></br>
    <RentCarTable></RentCarTable><br></br><br></br>
</body>
    )
}


export default Profile;