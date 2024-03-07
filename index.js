chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.status === "complete" &&
    tab.url != null
  ) {
    if (tab.url.startsWith("https://chat.openai.com/")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: handleChatGPT,
      });
      return;
    }

    if (tab.url.startsWith("https://claude.ai/chats")) {
      console.log("here");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: handleClaude,
      });
    }
  }
});

function handleChatGPT() {
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

function handleClaude() {
  const fieldset = document.querySelector("fieldset");

  if (fieldset != null) {
    const p = fieldset.querySelector("p");
    const btn = fieldset.querySelector("button");

    const url = new URL(window.location.href);
    const prepopulate = url.searchParams.get("prepopulate");

    setTimeout(() => {
      console.log(prepopulate);
      p.innerText = prepopulate;
      btn.click();
    }, 0);
  }
}
