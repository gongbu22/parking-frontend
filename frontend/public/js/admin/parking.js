// 이용가능한 차량 수
let carCount = 0
// 총 주차 자리 수
let totalSpots = 0;

window.addEventListener('DOMContentLoaded', async () => {
    try {
        await remainCar();
    } catch (e) {
        console.log(e);
        alert('남은 주차 자리수 조회 실패!');
    }
})

// 남은 주차자리 수
const remainCar = async () => {
    // let url = 'http://127.0.0.1:8002/available-spots';
    // const res = await fetch(url);
    // if (res.ok) {
    //     const data = await res.json();
    //     totalSpots = Number(data.total_available_spots);
    //     carCount = Number(data.non_disabled_spots_left);
    // }
    totalSpots = 100;
    carCount = 55;
    const usedSpots = carCount;
    const usedIndices = new Set();

    // 랜덤한 인덱스 생성 (중복되지 않도록)
    while (usedIndices.size < usedSpots) {
        const randomIndex = Math.floor(Math.random() * totalSpots);
        usedIndices.add(randomIndex);
    }

    // 구역당 20개 공간을 생성
    const areas = ['A', 'B', 'C', 'D', 'E'];
    let index = 0;

    for (const area of areas) {
        const parkingSpotsContainer = document.getElementById(`${area}-parking-spots`);

        for (let i = 0; i < 20; i++) { // 각 구역에 20개 공간 생성
            const spot = document.createElement("div");
            spot.className = "parking-spot";

            // 사용된 자리일 경우 색상 변경
            if (usedIndices.has(index)) {
                spot.style.backgroundColor = "#ff6347"; // 사용 중 (예: 빨간색)
            } else {
                spot.style.backgroundColor = "#32cd32"; // 사용 가능 (예: 초록색)
            }


            parkingSpotsContainer.appendChild(spot);
            index++;
        }
    }
};
