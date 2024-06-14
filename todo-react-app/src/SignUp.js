// import React from 'react';
// import{Button, TextField, Link, Grid, Container, Typography} from "@material-ui/core";
// import {signup}from "./service/ApiService";

// class Signup extends React.Component{
//     constructor(props){
//         super(props);
//         this.handleSubmit=this.handleSubmit.bind(this);
//     }

//     handleSubmit(event){
//         event.preventDefault();

//         const data=new FormData(event.target);
//         if(data.get("username").length===0||data.get("email")===0||data.get("password")===0){
//             alert("모든 내용을 한 글자 이상 입력 해 주세요")
//         }
//         // else if(data.get("username").length>0){
//         //     const username=data.get("username");
//         // }
//         else{
//             const username=data.get("username");
//             const email=data.get("email");
//             const password=data.get("password");

//             signup({email:email,username:username, password:password}).then(
//                 (response)=>{
//                     window.location.href="/login";
//                 }
//             );
//         }
        
//         // signup({email:email,username:username, password:password}).then(
//         //     (response)=>{
//         //         window.location.href="/login";
//         //     }
//         // );
//     }

//     render(){
//         return(
//             <Container component="main" maxWidth="xs" style={{marginTop:"8%"}}>
//                 <form noValidate onSubmit={this.handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <Typography component="h1" variant='h5'>
//                                 계정 생성
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                             autoComplete='username'
//                             name='username'
//                             variant='outlined'
//                             required
//                             fullWidth
//                             id="username"
//                             label="사용자 이름"
//                             autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                             autoComplete='email'
//                             name="email"
//                             variant='outlined'
//                             required
//                             fullWidth
//                             id="email"
//                             label="이메일 주소"
//                             autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                             autoComplete='current-password'
//                             name="password"
//                             variant='outlined'
//                             required
//                             fullWidth
//                             id='password'
//                             label="패스워드"
//                             autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button 
//                             type='submit'
//                             fullWidth
//                             variant='contained'
//                             color='primary'
//                             >계정 생성</Button>
//                         </Grid>
//                     </Grid>
//                     <Grid container justifyContent='flex-end'>
//                         <Grid item>
//                             <Link href='/login' variant='body2'>
//                                 이미 계정이 있습니까? 로그인 하세요.
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Container>
//         )
//     }
// }

// export default Signup

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
