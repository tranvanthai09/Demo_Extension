async function countMaliciousDetections(url) {
    const id_response = await fetch(`https://www.virustotal.com/api/v3/urls/${url}`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'x-apikey': 'a81834294cbaa5cd9c51013bbe945e4a48b4ce3905930785c6585ec734fc57b2', // Thay thế bằng API key của bạn
            'content-type': 'application/x-www-form-urlencoded',
      },
    });
}

function handleUrlClick(event) {
    const url = event.url;
    countMaliciousDetections(url)
      .then(isDangerous => {
        if (isDangerous) {
          // Hiển thị popup cảnh báo
          chrome.windows.create({
            url: 'popup.html',
            type: 'popup',
            width: 400,
            height: 300
          }, 
          function(win) {
            chrome.runtime.sendMessage({
              url: url,
              isDangerous: isDangerous
            });
          });
        } else {
            console.log('Secure');
        }
      })
      .catch(error => {
        console.error("Error checking URL:", error);
        // Handle the error appropriately, like displaying an error message to the user
    });
}
  
// Thêm trình lắng nghe sự kiện click vào tất cả các liên kết
document.addEventListener('click', handleUrlClick);
