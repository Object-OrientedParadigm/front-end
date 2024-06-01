// import { API_BASE_URL } from "../app-config";

// export function call(api, method, request){
//     let headers= new Headers({
//         "Content-Type":"application/json",
//     });
//     const accessToken=localStorage.getItem("ACCESS_TOKEN");
//     if(accessToken){
//         headers.append("Authorization","Bearer "+accessToken);
//     }

//     let options={
//         headers:headers,
//         url:API_BASE_URL+api,
//         method:method,
//     };

//     if(request){
//         options.body=JSON.stringify(request);
//     }

//     // return fetch(options.url, options)
//     // .then((response)=>
//     //     response.json().then((json)=>{
//     //         if(!response.ok){
//     //             return Promise.reject(json);
//     //         }
//     //         return json;
//     //     })
//     //     ).catch((error)=>{
//     //         console.log(error.status);
//     //         if(error.status===403){
//     //             window.location.href="/login";
//     //         }
//     //         return Promise.reject(error);
//     //     });

//     return fetch(options.url, options)
//         .then((response) => {
//             return response.json().then((json) => {
//                 if (!response.ok) {
//                     return Promise.reject(json);
//                 }
//                 return json;
//             }).catch(() => {
//                 if (!response.ok) {
//                     return Promise.reject({ status: response.status, message: response.statusText });
//                 }
//                 return { status: response.status, message: response.statusText };
//             });
//         })
//         .catch((error) => {
//             console.log("Error:", error);
//             if (error.status === 403) {
//                 window.location.href = "/login";
//             }
//             return Promise.reject(error);
//         });
// }

// export function signin(userDTO){
//     return call("/auth/signin","POST", userDTO)
//     .then((response)=>{
//         if(response.token){
//             //local스토리지에 토큰 저장
//             localStorage.setItem("ACCESS_TOKEN",response.token);
//             //token이 존재하는 경우 todo 화면으로 리디렉트
//             window.location.href="/";
//         }
//     })
//     .catch((error) => {
//         console.error("Signin error:", error);
//         alert("로그인에 실패했습니다. 다시 시도해주세요.");
//     });
// }

// //회원가입 요청
// export function signup(userDTO){
//     return call("/auth/signup","POST",userDTO)
//     .then((response)=>{
//         if(response.id){
//             window.location.href="/";
//         }
//     })
//     .catch((error)=>{
//         console.log("회원가입 오류");
//         console.log(error.state);
//         if(error.status===403){
//             window.location.href="/auth/signup";
//         }
//         return Promise.reject(error);
//     });
// }

// //로그아웃
// export function signout(){
//     // //local 스토리지에 삭제
//     // localStorage.setItem("ACCESS_TOKEN",null);
//     // window.location.href="/";
//     localStorage.removeItem("ACCESS_TOKEN");
//     // 사용자를 홈 페이지로 리디렉트
//     window.location.href = "/";
// }


import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then((response) => {
            return response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            }).catch(() => {
                if (!response.ok) {
                    return Promise.reject({ status: response.status, message: response.statusText });
                }
                return { status: response.status, message: response.statusText };
            });
        })
        .catch((error) => {
            console.log("Error:", error);
            if (error.status === 403) {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.token) {
                localStorage.setItem("ACCESS_TOKEN", response.token);
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.error("Signin error:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        });
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO)
        .then((response) => {
            if (response.id) {
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log("회원가입 오류");
            console.log(error.state);
            if (error.status === 403) {
                window.location.href = "/auth/signup";
            }
            return Promise.reject(error);
        });
}

export function signout() {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/login";
}
