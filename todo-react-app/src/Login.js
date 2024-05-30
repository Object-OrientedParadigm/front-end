// import React from "react";
// import {signin} from "./service/ApiService";
// import {Button, TextField, Grid,Link,Container, Typography} from "@material-ui/core";

// class Login extends React.Component{
//     constructor(props){
//         super(props);
//         this.handleSubmit=this.handleSubmit.bind(this);
//     }

//     handleSubmit(event){
//         event.preventDefault();
//         const data=new FormData(event.target);
//         const email=data.get("email");
//         const password=data.get("password");

//         //ApiService의 signin 메소드를 사용해 로그인
//         signin({email:email,password:password});
//     }

//     render(){
//         return(
//             <Container component="main" maxWidth="xs" style={{marginTop:"8%"}}>
//                 <Grid container spacing={2}>
//                     <Typography component="h1" variant="h5">
//                         로그인
//                     </Typography>
//                     <form noValidate onSubmit={this.handleSubmit}>
//                         {" "}
//                         {/* submit 버튼을 클릭하면 handleSubmit이 실행됨 */}
//                         <Grid container spacing={2}>
//                             <Grid item xs={12}>
//                                 <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="이메일 주소"
//                                 name="email"
//                                 autoComplete="email"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 type="password"
//                                 id="password"
//                                 label="패스워드"
//                                 name="password"
//                                 autoComplete="password"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                                 >
//                                     로그인
//                                 </Button>
//                             </Grid>
//                             <Link href="/signup" variant="body2">
//                                 <Grid item>계정이 없습니까? 여기서 가입하세요</Grid>
//                             </Link>
//                         </Grid>
//                     </form>
//                 </Grid>
//             </Container>
//         );
//     }
// }

// export default Login;

import React from "react";
import { signin } from "./service/ApiService";
import { Button, TextField, Grid, Link, Container, Typography } from "@material-ui/core";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKakaoLogin = this.handleKakaoLogin.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");

        // ApiService의 signin 메소드를 사용해 로그인
        signin({ email: email, password: password });
    }

    handleKakaoLogin() {
        // 카카오톡 로그인 페이지로 리다이렉션
        window.location.href = 'http://localhost:8080/oauth/kakao';
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                id="password"
                                label="패스워드"
                                name="password"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={this.handleKakaoLogin}
                            >
                                카카오톡 로그인
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="/signup" variant="body2">
                                계정이 없습니까? 여기서 가입하세요
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default Login;
