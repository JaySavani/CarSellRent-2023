import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAleart } from "./alert";
export const register = async (mydata) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/auth`,
            data: {
                name: mydata.rusername,
                email: mydata.remail,
                address: mydata.raddress,
                mobileno: mydata.rmobileno,
                password: mydata.rpassword,
                confirmpassword: mydata.rconfirmpassword,
            }
        });
        if (res.status === 200) {
            
            setAleart("Register Successful", "success");
            // console.log(res.data);
        }

    } catch (error) {
        setAleart(error.message, "error");
    }
};
export const login = async (mydata) => {
    if(mydata.lemail === "admin@gmail.com" && mydata.lpassword === "admin123")
    {
        const res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/auth/Login`,
            data: {
                email: mydata.lemail,
                password: mydata.lpassword,
            }
        });
        console.log(res);
        if (!res.data.error) {
            sessionStorage.setItem('id',res.data.user._id)
            sessionStorage.setItem('token',res.data.token);
            sessionStorage.setItem('user',res.data.user);
            setAleart("Login Successful", "success");
            window.location.href = "http://localhost:3000/adminuser/";

        }
        else {
            setAleart(res.data.error, "error");
        }
    }
    else{
    try {
        const res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/auth/Login`,
            data: {
                email: mydata.lemail,
                password: mydata.lpassword,
            }
        });
        console.log(res);
        if (!res.data.error) {
            sessionStorage.setItem('id',res.data.user._id)
            sessionStorage.setItem('token',res.data.token);
            sessionStorage.setItem('user',res.data.user);
            setAleart("Login Successful", "success");
            window.location.href = "http://localhost:3000/home/";

        }
        else {
            setAleart(res.data.error, "error");
        }

    } catch (error) {
        console.log(error.message, "error");
        // console.log(error.message);
    }
}
}
