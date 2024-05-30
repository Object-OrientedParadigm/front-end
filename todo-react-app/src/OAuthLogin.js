import React from 'react';

const LoginPage = () => {
    return (
        <div className="gradient-custom" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            <h2>LOGIN</h2>
                            <p className="text-white-50 mt-2 mb-5">서비스 사용을 위해 로그인을 해주세요!</p>
                            <div className="mb-2">
                                <a href="/oauth2/authorization/google">
                                    <img src='./img/google.png' alt="Google 로그인" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
