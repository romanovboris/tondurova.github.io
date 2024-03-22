let TOKEN = '6428252920:AAEMzWRb_RLZ8GZHkbLoGZVnfuVkhFSJSiA';
let CHAT_ID = '-1002013830689';
const ipAddress = '';

async function getLocationInfo(ipAddress) {
  const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
  const data = await response.json();
  return data;
}

function extractDeviceInfo() {
  let deviceInfo = {};

  if ('ontouchend' in document) {
    deviceInfo.deviceType = 'touch';
  } else {
    deviceInfo.deviceType = 'mouse';
  }

  deviceInfo.browserVersion = navigator.userAgent;
  return deviceInfo;
}

function sendMessage() {
  getLocationInfo(ipAddress).then((locationData) => {
    let deviceInfo = extractDeviceInfo();

    fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `Страна: ${locationData.country}\nМесто: ${locationData.region}\nУстройство: ${deviceInfo.deviceType}\nВерсия бразуера: ${deviceInfo.browserVersion}`,
        parse_mode: 'HTML',
      }),
    }).then((response) => response.text()).then((data) => console.log(data)).catch((error) => console.error('Error:', error));
  });
}