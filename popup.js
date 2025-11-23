// Load and display blocked count
function updateCount() {
  chrome.storage.local.get(['blockedCount'], function(result) {
    const count = result.blockedCount || 0;
    document.getElementById('blockedCount').textContent = count;
  });
}

// Reset counter
document.getElementById('resetBtn').addEventListener('click', function() {
  chrome.storage.local.set({ blockedCount: 0 });
  document.getElementById('blockedCount').textContent = '0';
});

// Update count when popup opens
updateCount();

// Refresh count every second
setInterval(updateCount, 1000);
