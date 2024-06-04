// import React from "react";
// import { signin } from "./service/ApiService";
// import { Button, TextField, Grid, Link, Container, Typography,IconButton } from "@material-ui/core";
// import kakaoImage from './img/kakao_login_large_wide.png';
// import styles from './Login.module.css'; // CSS 모듈


// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleKakaoLogin = this.handleKakaoLogin.bind(this);
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         const data = new FormData(event.target);
//         const email = data.get("email");
//         const password = data.get("password");

//         // ApiService의 signin 메소드를 사용해 로그인
//         signin({ email: email, password: password });
//     }

//     handleKakaoLogin() {
//         // 카카오톡 로그인 페이지로 리다이렉션
//         window.location.href = 'http://localhost:8080/oauth/kakao';
//     }

//     render() {
//         return (
//             <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
//                 <Typography component="h1" variant="h5">
//                     로그인
//                 </Typography>
//                 <form noValidate onSubmit={this.handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="이메일 주소"
//                                 name="email"
//                                 autoComplete="email"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 type="password"
//                                 id="password"
//                                 label="패스워드"
//                                 name="password"
//                                 autoComplete="password"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                             >
//                                 로그인
//                             </Button>
//                         </Grid>
//                         {/* <Grid item xs={12}>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 color="secondary"
//                                 onClick={this.handleKakaoLogin}
//                             >
//                                 카카오톡 로그인
//                             </Button>
//                         </Grid> */}
//                         <Grid item xs={12}>
//                             <IconButton
//                             style={{ width: '100%', padding: 0 }}
//                             onClick={this.handleKakaoLogin}
//                             >
//                             <img src={kakaoImage} alt="카카오톡 로그인" style={{ width: '100%' }} />
//                             </IconButton>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <Link href="/signup" variant="body2">
//                                 계정이 없습니까? 여기서 가입하세요
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Container>
//         );
//     }
// }

// export default Login;


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
                {/* <div className={styles.socialLogin}>
                    <button className={styles.google}>
                        <i className='bx bxl-google'></i>
                        Use Google
                    </button>
                    <button className={styles.google}>
                        <i className='bx bxl-apple'></i>
                        Use Apple
                    </button>
                </div> */}

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
