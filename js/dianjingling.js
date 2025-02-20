const urlTemplate2 = 'https://chargeplatformapp.beidiancloud.cn/app/business/getUnitInfo';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjE4MDIxNjQ3OTYwIiwiZXhwIjoxNzQwNjIxNzUzfQ.ylZrCI33g7-8uunvdoYAsw30dIu3x1gb9zMEZmXje_Y'

async function getWorkingStateCount_djl(deviceCode) {
    const data = {
        token: token,
        deviceId: deviceCode
    };

    try {
        const response = await fetch(urlTemplate2, {
            method: 'POST', // 使用POST方法
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Accept': '*/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Referer': 'https://servicewechat.com/wx79ae23876b6643f6/263/page-frame.html',
                'xweb_xhr': '1',
            },
            body: new URLSearchParams(data), 
        });

        // 解析JSON响应
        var jsonData = await response.json();

        // 获取 totalCount 和 unusedCount
        var totalCount = jsonData.data.length;  // 获取 data 数组的长度
        var unusedCount = jsonData.data.filter(item => item.isUsed === '0').length;

        // console.log(totalCount, unusedCount); // 输出统计信息

        const stateCount = { "IDLE": unusedCount, "CHARGING": totalCount-unusedCount, "ERROR": 0 }
        return stateCount;; // 返回统计结果

    } catch (error) {
        console.error("请求出错:", error);
        return null;
    }
}