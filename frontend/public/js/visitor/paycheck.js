// 현재 URL 가져오기
const currentUrl = window.location.pathname;
let carnum='';

// URL 경로를 '/' 기준으로 분할
const pathParts = currentUrl.split('/');

// 'paycheck' 다음에 오는 부분을 가져오기
if (pathParts.length > 2) {
    const carnumPart = pathParts[2]; // 'carnum=%E3%84%B7%E3%84%B3%E3%85%8E%E3%84%B7%E3%84%B3' 부분
    carnum = decodeURIComponent(carnumPart.split('=')[1]); // '=' 기준으로 분할하여 두 번째 부분 가져오기

}

console.log('출차된 차량 번호:dd', carnum);

