const totalSpots = 100; // 총 주차 자리 수
const parkingSpotsContainer = document.getElementById("parking-spots");

//api로 이미 이용중인 차량 수 가져오기
const usedSpots = 10

// 사용된 자리 인덱스를 저장할 배열
const usedIndices = new Set();

// 랜덤한 인덱스 생성 (중복되지 않도록)
while (usedIndices.size < usedSpots) {
    const randomIndex = Math.floor(Math.random() * totalSpots);
    usedIndices.add(randomIndex);
}

// 사각형 생성
for (let i = 0; i < totalSpots; i++) {
    const spot = document.createElement("div");
    spot.className = "parking-spot";

    // 사용된 자리일 경우 색상 변경
    if (usedIndices.has(i)) {
        spot.style.backgroundColor = "#ff6347"; // 사용 중 (예: 빨간색)
    } else {
        spot.style.backgroundColor = "#32cd32"; // 사용 가능 (예: 초록색)
    }

    parkingSpotsContainer.appendChild(spot);
}
