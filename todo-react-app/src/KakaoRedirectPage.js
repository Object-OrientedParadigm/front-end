// import React, {useEffect} from 'react';
// import {useLocation, useNavigate} from 'react-router-dom';
// import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthKakao = async (code) => {
        try {
            const response = await axios.get(`http://localhost:8080/oauth/login/kakao?code=${code}`);
            const token = response.data; // 서버에서 JWT 토큰을 반환한다고 가정
            localStorage.setItem("ACCESS_TOKEN", token); // JWT 토큰 저장
            // alert("로그인 성공: " + token)
            window.location.href = "/"; // 홈 페이지로 리디렉션
        } catch (error) {
            console.error("OAuth Kakao error", error);
            navigate("/fail");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code'); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            handleOAuthKakao(code);
        }
    }, [location]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default KakaoRedirectPage;
