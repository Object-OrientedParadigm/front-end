import React, { useState } from 'react';
import { signin } from "./service/ApiService";
import styles from './Login.module.css'; // CSS 모듈
import kakaoImage from './img/kakao_login_large_wide.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        signin({ email, password });
    };

    const handleKakaoLogin = () => {
        window.location.href = 'http://localhost:8080/oauth/kakao';
    };

    return (
        <div className={styles.loginbody}>
            <div className={styles.container}>
                <h1>Login to your account 👏</h1>

                <img
                    src={kakaoImage}
                    alt="카카오톡 로그인"
                    onClick={handleKakaoLogin}
                    style={{ width: '100%', cursor: 'pointer' }} // 이미지를 전체 너비로 표시하고, 포인터를 손가락 모양으로 변경
                />      
                <div className={styles.divider}>
                    <div className={styles.line}></div>
                    <p>Or</p>
                    <div className={styles.line}></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <div className={styles.customInput}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className='bx bx-at'></i>
                    </div>
                    <label htmlFor="password">Password:</label>
                    <div className={styles.customInput}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className='bx bx-lock-alt'></i>
                    </div>
                    <button type="submit" className={styles.login}>Login</button>
                    <div className={styles.links}>
                        {/* <a href="#">Reset Password</a> */}
                        <a href="/signup">Don't have an account?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
