import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Typography } from '@material-ui/core';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import './Login.scss';

const Login = () => {
    const history = useHistory();
    const { login } = useContext(AuthContext);

    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        login(response);
        history.push('/search');
    };

    const handleLoginFailure = (response) => {
        console.log('Login Failed:', response);
    };

    const handleDemoClick = () => {
        login(null);
        history.push('/search');
    };

    return (
        <GoogleOAuthProvider clientId="39936587004-ojr4riojm3lr105jtc32e9v6adk9cit7.apps.googleusercontent.com">
            <div className="root">
                <Container maxWidth="sm" className="formContainer">
                    <Typography variant="h4" gutterBottom className="title">
                        <span>GETFLIX</span> Login
                    </Typography>
                    <div className="googleButton">
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                            shape="circle"
                            size="large"
                        />
                    </div>
                    <Button variant="contained" className="demoButton" onClick={handleDemoClick}>
                        Use the Demo Version
                    </Button>
                </Container>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
