// List of known tracking domains
const trackerDomains = [
  'google-analytics.com',
  'doubleclick.net',
  'facebook.com/tr',
  'connect.facebook.net',
  'scorecardresearch.com',
  'quantserve.com',
  'hotjar.com',
  'crazyegg.com',
  'mouseflow.com',
  'analytics.twitter.com',
  'ads.linkedin.com'
];

let blockedCount = 0;

// Block requests to tracking domains
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);
    const hostname = url.hostname;
    
    for (let tracker of trackerDomains) {
      if (hostname.includes(tracker)) {
        blockedCount++;
        chrome.storage.local.set({ blockedCount: blockedCount });
        console.log('Blocked tracker:', hostname);
        return { cancel: true };
      }
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Reset counter on browser restart
chrome.runtime.onStartup.addListener(() => {
  blockedCount = 0;
  chrome.storage.local.set({ blockedCount: 0 });
});

// Load blocked count from storage
chrome.storage.local.get(['blockedCount'], function(result) {
  if (result.blockedCount) {
    blockedCount = result.blockedCount;
  }
});
