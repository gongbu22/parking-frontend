// 현재 URL의 경로 가져오기
const path = window.location.pathname;

// 경로를 슬래시로 분리
const pathSegments = path.split('/');

// 마지막 값을 가져오기 (배열의 마지막 요소)
const lastSegment = pathSegments[pathSegments.length - 1];

// 마지막 값을 디코딩
const carnum = decodeURIComponent(lastSegment);

console.log(`마지막 값: ${carnum}`);

window.addEventListener('DOMContentLoaded', async () => {

})

