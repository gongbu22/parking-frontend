window.addEventListener('load', async () => {
    try {
        remainCar();
    } catch (e) {
        console.log(e);
        alert('남은 주차 자리수 조회 실패!');
    }
})

// 남은 주차자리 수
const remainCar = async () => {
    // let url = 'http://127.0.0.1:8000/remainCar'
    // const res = await fetch(url);
    // if (res.ok) {
    //     const data = await res.json();
        const remainCars = document.querySelector('#remainCars');
        const remainBarrier = document.querySelector('#remainBarrier');

        // let html = `${data.remainCars}/100`;
        let html1 = `50/100`;
        remainCars.innerHTML = html1;

        // let html2 = `${data.remainBarrier}/2`;
        let html2 = `1/2`;
        remainBarrier.innerHTML = html2;
    // }
}

// 차량 등록
const regbtn = document.querySelector('#regbtn');
const carnumfrm = document.forms['carnumfrm'];
let carnum = '';

regbtn.addEventListener('click', async (event) => {
    event.preventDefault();
    carnum = document.querySelector('#carnum').value;

    const formData = new FormData(carnumfrm);

    let jsondata = {};
    formData.forEach((val, key) => {
        jsondata[key] = val;
    });
    console.log(jsondata);
    window.location.href = `./paycheck/carnum=${encodeURIComponent(carnum)}`; // 출차 페이지로 이동

    // try {
    //     const res = await fetch('http://127.0.0.1:8000/carregist',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(jsondata)
    //         })
    //     const result = await res.json();
    //     if (res.ok) {
    //         if (result.status === 'parking') {
    //             alert('차량이 등록되었습니다.');
    //         } else if (result.status === 'exit') {
    //             // 출차 처리
    //             alert('차량이 출차되었습니다.');
    //             window.location.href = `./paycheck?carnum=${encodeURIComponent(carnum)}`; // 출차 페이지로 이동
    //         }
    //     } else {
    //         alert('등록 실패: ' + result.message); // 오류 메시지 출력
    //     }
    // } catch (error) {
    //     alert('등록 실패: 서버와 통신 중 오류가 발생했습니다.');
    //     console.error(error);
    // }

})