import React from 'react';
import '../styles/LoginRegister.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, styled, Button } from '@mui/material'
import { register, login } from '../store/actions/auth';
import { setAleart } from '../store/actions/alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'rgba(255, 255, 255, 0.475) ',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black ',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black ',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.475) ',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.475) ',
        },
    },
});
class LoginComponent extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            lemail: '',
            lpassword: '',
            rusername: '',
            remail: '',
            raddress: '',
            rmobileno: '',
            rpassword: '',
            rconfirmpassword: '',
            mode: 'login',
        };
    }
    submitData = () => {
        if (this.state.mode === 'login') {
            if (this.state.lemail && this.state.lpassword) {
                if (!this.state.lemail.includes('@')) {
                    setAleart("Please enter valid email", "error")
                }
                else {
                    this.PostData();
                }
            }
            else {
                setAleart("Please fill all required field", "error")
            }
        }
        else {
            if (!(this.state.rusername && this.state.remail && this.state.raddress && this.state.rmobileno && this.state.rpassword && this.state.rconfirmpassword)) {
                setAleart("Please fill all required field", "error")
            }
            else if (!this.state.remail.includes('@')) {
                setAleart("Please enter valid email", "error")
            }
            else if (this.state.rmobileno.length !== 10) {
                setAleart("Please! enter valid Mobile No", "error")
            }

            else if (this.state.rpassword.length < 6 || this.state.rconfirmpassword.length < 6) {
                setAleart("Minimum length of password is 6", "error")
            }
            else if (this.state.rpassword !== this.state.rconfirmpassword) {
                setAleart("Password and ConfirmPassword not match!", "error")
            }


            else {
                this.PostData();
            }
        }
    }

    PostData = async () => {
        // e.preventDefault();
        try {
            if (this.state.mode === 'login') {
                const newUser = this.state;
                login(newUser);
            }
            else {
                const newUser = this.state;
                register(newUser);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    handleFieldChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        if (name === 'rmobileno') {
            if (Number(value) || value.length === 0) {
                const newState = { ...this.state };
                newState[name] = value;
                this.setState(newState);
            }
        }
        else {
            const newState = { ...this.state };
            newState[name] = value;
            this.setState(newState);
            // console.log(newState);
        }
    };

    toggleMode() {
        var newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({ mode: newMode });
    }
    render() {
        return (

            React.createElement("div", { className: "app" },
                React.createElement("div", { className: `form-block-wrapper form-block-wrapper--is-${this.state.mode}` }),
                React.createElement("section", { className: `form-block form-block--is-${this.state.mode}` },
                    React.createElement("header", { className: "form-block__header" },
                        React.createElement("h1", null, this.state.mode === 'login' ? 'Welcome back!' : 'Sign up'),
                        React.createElement("div", { className: "form-block__toggle-block" },
                            React.createElement("span", null, this.state.mode === 'login' ? 'Don\'t' : 'Already', " have an account? Click here \u2192"),
                            React.createElement("input", { id: "form-toggler", type: "checkbox", onClick: this.toggleMode.bind(this) }),
                            React.createElement("label", { htmlFor: "form-toggler" }))),
                    React.createElement("form", { method: "post" },
                        React.createElement("div", { className: "form-block__input-wrapper" },
                            React.createElement("div", { className: "form-group form-group--login" },

                                <CssTextField className="form-group__input " placeholder="email" name="lemail" value={this.state.lemail} id="lemail" label="Email" variant="outlined" onChange={this.handleFieldChange} disabled={this.state.mode === 'signup'}
                                    required />,
                                <CssTextField type='password' className="form-group__input" name="lpassword" placeholder="password" value={this.state.lpassword} id="lpassword" label="Password" variant="outlined" onChange={this.handleFieldChange} style={{ marginTop: 10 }} disabled={this.state.mode === 'signup'} required

                                />
                                
                            ),
                            
                            React.createElement("div", { className: "form-group form-group--signup" },
                                <CssTextField className="form-group__input " name="rusername" placeholder="username" value={this.state.rusername} id="rusername" label="Username" variant="outlined" onChange={this.handleFieldChange} disabled={this.state.mode === 'login'} required />,
                                <CssTextField className="form-group__input" name="remail" value={this.state.remail} placeholder="email" id="remail" label="Email" variant="outlined" onChange={this.handleFieldChange} style={{ marginTop: 10 }} disabled={this.state.mode === 'login'} required />,
                                <CssTextField className="form-group__input" name="raddress" value={this.state.raddress} placeholder="address" id="raddress" label="Address" variant="outlined" onChange={this.handleFieldChange} style={{ marginTop: 10 }} disabled={this.state.mode === 'login'} required />,
                                <CssTextField className="form-group__input" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="rmobileno" value={this.state.rmobileno} placeholder="mobileno" id="rmobileno" label="Mobile No" variant="outlined" onChange={this.handleFieldChange} style={{ marginTop: 10 }} disabled={this.state.mode === 'login'} required />,
                                <CssTextField className="form-group__input" type='password' name="rpassword" value={this.state.rpassword} placeholder="password" id="rpassword" label="Password" variant="outlined" onChange={this.handleFieldChange} style={{ marginTop: 10 }} disabled={this.state.mode === 'login'} required
                                />,
                                <CssTextField className="form-group__input" type='password' name="rconfirmpassword" value={this.state.rconfirmpassword} placeholder="confirm password" id="rconfirmpassword" label="Confirm Password" variant="outlined" onChange={this.handleFieldChange} style={{ marginTop: 10 }} disabled={this.state.mode === 'login'} required
                                />,
                            ),
                        ),
                        <>
                            <ToastContainer limit={1} />
                            <Link to = "/forget_pass">Forget Password?</Link>
                            <Button className="button button--primary full-width" style={{ marginTop: 10 }} variant="contained" onClick={this.submitData}>{this.state.mode === 'login' ? 'Log In' : 'Sign Up'}</Button>
                        </>
                    ))));



    }
}


export default LoginComponent;