import React, { useState } from 'react';
import { signup } from "./service/ApiService";
import styles from './Login.module.css'; // CSS 모듈

function Signup() {
    const [name, setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword]=useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!name || !email || !password || !confirmpassword) {
            alert("모든 내용을 한 글자 이상 입력 해 주세요");
            return;
        }

        if (password !== confirmpassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        signup({ email, username: name, password }).then(
            (response) => {
                window.location.href = "/login";
            }
        ).catch(error => {
            console.error("Signup failed:", error);
            alert("Signup failed, please try again.");
        });
    };


    return (
        <div className={styles.loginbody}>
            <div className={styles.container}>
                <h1>Sign Up to your account 👏</h1>
                {/* <div className={styles.divider}>
                    <div className={styles.line}></div>
                    <p>Or</p>
                    <div className={styles.line}></div>
                </div> */}
                <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name :</label>
                    <div className={styles.customInput}>
                        <input
                            type="name"
                            name="name"
                            placeholder="Your Name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <i className='bx bx-at'></i>
                    </div>

                    <label htmlFor="email">Email :</label>
                    <div className={styles.customInput}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            autoComplete="on"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className='bx bx-at'></i>
                    </div>

                    <label htmlFor="password">Password :</label>
                    <div className={styles.customInput}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className='bx bx-lock-alt'></i>
                    </div>

                    <label htmlFor="confirmpassword">Confirm Password :</label>
                    <div className={styles.customInput}>
                        <input
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                        <i className='bx bx-lock-alt'></i>
                    </div>
                    <button type="submit" className={styles.login}>SingUp</button>
                    
                    <div className={styles.links}>
                        {/* <a href="#">Reset Password</a> */}
                        <a href="/login">이미 계정이 있습니까? 로그인 하세요.</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
