const deviceDicts = [
    { Operators: 1, device_name: "河口海岸东南侧3", device_code: 2022001695 },
    { Operators: 1, device_name: "河口海岸东南侧2", device_code: 2022001694 },
    { Operators: 1, device_name: "河口海岸东南侧1", device_code: 2022001699 },
    { Operators: 1, device_name: "研究生公寓17号楼1号", device_code: 2240418151 },
    { Operators: 1, device_name: "研究生公寓17号楼2号", device_code: 2240418154 },
    { Operators: 1, device_name: "研究生公寓17号楼3号", device_code: 2240418153 },
    { Operators: 1, device_name: "资源与环境馆外西侧车棚2号", device_code: 2022001696 },
    { Operators: 1, device_name: "资源与环境馆外西侧车棚1号", device_code: 2022001698 },
    { Operators: 2, device_name: "电精灵研寓1号机", device_code: "02190900007600" },
    { Operators: 2, device_name: "电精灵研寓", device_code: "07230490008300" },
    { Operators: 2, device_name: "电精灵研寓2号机", device_code: "02190900006900" }
];

function addStateCode(device_name, device_code, stateCount){
    const cardContainer = document.getElementById('card-container')
    if (stateCount) {

        const card = document.createElement('div');
        card.classList.add('card'); // 添加卡片样式

        // 根据设备是否有空闲桩，添加相应的类
        if (stateCount['IDLE'] > 0) {
            card.classList.add('has-idle');
        } else {
            card.classList.add('has-no-idle');
        }

        // 创建卡片内容
        card.innerHTML = `
            <h2>${device_name}</h2>
            <p>设备编号: ${device_code}</p>
            <p>空闲充电桩：${stateCount['IDLE']}</p>
            <p>运行中充电桩：${stateCount['CHARGING']}</p>
            <p>损坏充电桩：${stateCount['ERROR']}</p>
        `;

        // 将卡片添加到卡片容器中
        cardContainer.appendChild(card);
    }
}


async function main() {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''; // Clear previous results

    for (const device of deviceDicts) {
        const { Operators, device_name, device_code } = device;

        if (Operators === 1) {
            const stateCount = await getWorkingStateCount_xa(device_code);
            addStateCode(device_name, device_code, stateCount);
        }
        if (Operators === 2) {
            const stateCount = await getWorkingStateCount_djl(device_code);
            addStateCode(device_name, device_code, stateCount);
        }

        
    }
}

// Call main when the page is fully loaded
window.onload = main;
