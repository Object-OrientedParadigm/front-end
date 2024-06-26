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
            if (response.token && response.username) {
                localStorage.setItem("ACCESS_TOKEN", response.token);
                localStorage.setItem("USER_NAME", response.username); // 사용자 이름 저장
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

export function deleteAllTodos(userId) {
    return call(`/todo/all?userId=${userId}`, "DELETE", null);
}