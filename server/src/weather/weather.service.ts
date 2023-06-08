import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { WeatherDTO } from 'src/user/dto/common.dto';

const getToday = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = ('0' + (1 + date.getMonth())).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + month + day;
};
@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  async GetCurrentWeather(): Promise<WeatherDTO> {
    let res: AxiosResponse;

    try {
      const secretKey = this.configService.get<string>('ENCODING_AUTH_KEY');
      res = await axios.get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${secretKey}&pageNo=1&numOfRows=500&dataType=JSON&base_date=${getToday()}&base_time=0500&nx=55&ny=127`,
      );
    } catch (err) {
      throw new HttpException(
        {
          message:
            'Failed to fetch data from external API(공공데이터포털 날씨 API)',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const items = res.data.response.body.items.item;
    let info: WeatherDTO = {
      sky: '',
      max_prob_rain: '',
      highest_temp: '',
      lowest_temp: '',
    };
    let maxRain = 0;

    for (const item of items) {
      switch (item.category) {
        // SKY
        case 'SKY':
          let cloudy = parseInt(item.fcstValue);
          if (cloudy > 8) {
            info.sky = '흐림';
          } else if (cloudy > 5) {
            info.sky = '구름많음';
          } else {
            info.sky = '맑음';
          }
          break;
        // 일 최저기온
        case 'TMN':
          info.lowest_temp = item.fcstValue;
          break;
        // 일 최고기온
        case 'TMX':
          info.highest_temp = item.fcstValue;
          break;
        // 강수 확률 (customize - max)
        case 'POP':
          const temp: number = +item.fcstValue;
          maxRain = temp > maxRain ? temp : maxRain;
          break;
        default:
          break;
      }
    }
    info.max_prob_rain = maxRain.toString();
    return info;
  }
}
