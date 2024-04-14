async function countMaliciousDetections(url) {
  const response = await fetch(`https://www.virustotal.com/api/v3/urls/${url}`, {
      method: 'POST',
      headers: {
          accept: 'application/json',
          'x-apikey': 'a81834294cbaa5cd9c51013bbe945e4a48b4ce3905930785c6585ec734fc57b2', // Thay thế bằng API key của bạn
          'content-type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.ok) {
      const data = await response.json();
      const positives = data.data.attributes.last_analysis_stats.malicious;
      if (positives > 0) {
          console.log(positives)
          return true;
      }
  } else {
      console.error(`Error fetching VirusTotal data: ${response.status}`);
  }
}

// Lắng nghe tin nhắn từ content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'checkUrl') {
    const url = message.url;
    countMaliciousDetections(url).then(response => sendResponse(response));
  }
});
