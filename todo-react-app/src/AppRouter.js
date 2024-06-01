import React from "react";
import "./index.css";
import App from './App';
import Login from "./Login";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import KakaoRedirectPage from "./KakaoRedirectPage";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright ©"}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("ACCESS_TOKEN");
    return isAuthenticated ? children : <Navigate to="/login" />;
};

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />} />
                        <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
                    </Routes>
                </div>
                <div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
