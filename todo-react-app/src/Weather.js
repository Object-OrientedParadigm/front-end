import React from 'react';
import axios from 'axios';

import { Box, Typography, Grid, CircularProgress, Card, CardContent } from '@material-ui/core';

const REACT_APP_WEATHER_KEY = 'a7a557ac31410fa18685274c56ce4214';

class Weather extends React.Component {
    // 상태 변수 정의
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            temp_max: 0,
            temp_min: 0,
            humidity: 0,
            desc: '',
            icon: '',
            rain:0,
            pop:0,
            loading: true,
        };
    }
    // 컴포넌트 생성 후 날씨 정보 조회
    componentDidMount() {
        const cityName = 'Seoul';
        const apiKey = REACT_APP_WEATHER_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        //위에서 만든 상태 변수에 값을 전달
        axios
            .get(url)
            .then((responseData) => {
                console.log(responseData);
                const data = responseData.data;
                // const pop=responseData.data.hourly[0].pop;
                
                this.setState({
                    temp: data.main.temp,
                    temp_max: data.main.temp_max,
                    temp_min: data.main.temp_min,
                    humidity: data.main.humidity,
                    desc: data.weather[0].description,
                    icon: data.weather[0].icon,
                    rain: data.rain? data.rain['1h']:0,
                    // pop:pop*100,
                    loading: false,
                });
            })
            .catch((error) => console.log(error));
    }
    // 날씨 정보 출력
    render() {
        const { temp, temp_max, temp_min, humidity, desc, icon, rain, loading } = this.state;
        const imgSrc = `https://openweathermap.com/img/w/${icon}.png`;
        const rainn=10;
        if (this.state.loading) {
            return <CircularProgress />;
        } else {
            return (
                <Card >
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h4">{(temp - 273.15).toFixed(0)}°C</Typography>
                            <Box display="flex" alignItems="center">
                                <img src={imgSrc} alt={desc} />
                                <Typography variant="h5" style={{ marginLeft: '8px' }}>
                                    {desc}
                                </Typography>
                            </Box>
                            <Grid container justifyContent="center" style={{ marginTop: '2px' }}>
                                <Grid item>
                                    <Typography variant="h4" style={{ marginTop: '5px' }} >
                                        Seoul
                                    </Typography>

                                    <Typography variant="h6" style={{ marginTop: '5px' }} >
                                        최저온도: {(temp_min - 273.15).toFixed(0)}°C
                                    </Typography>
                                    <Typography variant="h6" style={{ marginTop: '5px' }}>
                                        최고온도: {(temp_max - 273.15).toFixed(0)}°C
                                    </Typography>
                                    <Typography variant="h6" style={{ marginTop: '5px' }}>
                                        습도: {humidity}%
                                    </Typography>
                                    <br/>
                                    {/* <Typography variant="h6" style={{ marginTop: '5px' }}>
                                        강수량: {rain}mm
                                    </Typography>
                                    {rain > 0 && <Typography variant="h5" style={{ color: 'red', marginTop: '5px' }}>☔️ 우산 챙기세요! ☔️</Typography>} */}

                                    <Typography variant="h6" style={{ marginTop: '5px' }}>
                                        강수량: {rainn}mm
                                    </Typography>
                                    {rainn > 0 && <Typography variant="h5" style={{ color: 'red', marginTop: '5px' }}>☔️ 우산 챙기세요! ☔️</Typography>}
                                    {/* 우산 챙기세요 체크용 코드 */}
                                </Grid>
                                <Grid item>

                                </Grid>

                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            )
        }
    }
}

export default Weather;