chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.status === "complete" &&
    tab.url != null &&
    tab.url.startsWith("https://chat.openai.com/")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: checkURL,
    });
  }
});

function checkURL() {
  const ta = document.querySelector("#prompt-textarea");
  const btn = document.querySelector('[data-testid="send-button"]');

  const url = new URL(window.location.href);
  const prepopulate = url.searchParams.get("prepopulate");

  setTimeout(() => {
    ta.innerText = prepopulate;
    const inputEvent = new Event("input", { bubbles: true });
    ta.dispatchEvent(inputEvent);
    btn.click();
  }, 0);
}
