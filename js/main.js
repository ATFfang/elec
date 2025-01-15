const urlTemplate = "https://ev.acrel-eem.com/charging/pile/get_ev_pile_by_device_code?deviceCode={key}";

const deviceDicts = [
    { device_name: "河口海岸东南侧3", device_code: 2022001695 },
    { device_name: "河口海岸东南侧2", device_code: 2022001694 },
    { device_name: "河口海岸东南侧1", device_code: 2022001699 }
];

const headers = {
    "Host": "ev.acrel-eem.com",
    "Connection": "keep-alive",
    "content-type": "application/x-www-form-urlencoded",
    "loginType": "WECHAT",
    "token": "userapp_eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MjI2MzM2LCJhY2NvdW50IjoiMTgxMzY0ODU3MjkiLCJuYW1lIjoiMTgxMzY0ODU3MjkiLCJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIn0.XjhSwiTXRpeiHfltRR4A2tVdOqgDBs4wH79rIvWUoS8",
    "pileType": "ELECTRIC_VEHICLE",
    "Accept-Encoding": "gzip,compress,br,deflate",
    "User-Agent": "Mozilla/5.0 (iPad; CPU OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800323d) NetType/WIFI Language/zh_CN",
    "Referer": "https://servicewechat.com/wx62fcba19b2c33f42/18/page-frame.html"
};

async function getWorkingStateCount(deviceCode) {
    const url = urlTemplate.replace("{key}", deviceCode);

    try {
        const response = await axios.get(url, { headers });

        if (response.status !== 200) {
            console.log(`请求失败，设备编号: ${deviceCode}`);
            return null;
        }

        const data = response.data;
        const gunStatusList = data.data ? data.data.gunStatusList : [];

        const stateCount = { "IDLE": 0, "CHARGING": 0, "ERROR": 0 };

        gunStatusList.forEach(gunStatus => {
            const workingState = gunStatus.workingState;
            if (stateCount[workingState] !== undefined) {
                stateCount[workingState] += 1;
            }
        });

        return stateCount;

    } catch (error) {
        console.error("请求出错:", error);
        return null;
    }
}

async function main() {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''; // Clear previous results

    for (const device of deviceDicts) {
        const { device_name, device_code } = device;
        const stateCount = await getWorkingStateCount(device_code);

        if (stateCount) {

            const card = document.createElement('div');
            card.classList.add('card'); // 添加卡片样式

            // 根据设备是否有空闲桩，添加相应的类
            if (stateCount['IDLE'] > 0) {
                // 模拟随机情况，有空闲桩
                card.classList.add('has-idle');
            } else {
                // 模拟没有空闲桩
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
}

// Call main when the page is fully loaded
window.onload = main;
