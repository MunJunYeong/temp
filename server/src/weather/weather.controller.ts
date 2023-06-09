import { Controller } from '@nestjs/common';

@Controller('weather')

// export type Category = {
//     base_date?: number;
//     nx?: number;
//     ny?: number;
// }
//     const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
//     const serviceKey ='?' + encodeURIComponent('serviceKey') + 'gty4x0ShJc4LsiaoIGJ5D7CRT5RcZSI6vs6lx6fD%2BqrZn7WLmZVZKnH7aft46y9Kaa5ZdXjB9J8s%2FSSCgISV7w%3D%3D';
//     const pageNo ='&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
//     const numOfRows ='&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000');
//     const dataType ='&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
//     const base_date ='&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20210628'); // 날짜 카테고리로 받아오기?
//     const base_time ='&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0600');
//     const nx ='&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55');
//     const ny ='&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127');
//     /* NodeJs 12 샘플 코드 */
// var request = require('request');
// request({
//     url: url + serviceKey + pageNo + numOfRows + dataType + base_date + base_time + nx + ny,
//     method: 'GET'
// }, function (error, response, body) {
//     //console.log('Status', response.statusCode);
//     //console.log('Headers', JSON.stringify(response.headers));
//     //console.log('Reponse received', body);
// });
export class WeatherController {}
