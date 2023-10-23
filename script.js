// Simple substitution cipher
let alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}\|;':",./<>?~`;
let substitution = `ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba~?<>.,"':;|\{}[]=+-_)(*&^%$#@!9876543210`;

// Button to encrypt/decrypt text
document.getElementById("encryptButton").addEventListener("click", function () {
  let input = document.getElementById("inputText").value;
  let output = substitute(input, alphabet, substitution);
  document.getElementById("outputText").textContent = output;

  // store in localstorage
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let newItem = {
    type: output === input ? "decrypted" : "encrypted",
    original: input,
    result: output,
  };

  // limit the history to the last 10 items
  if (history.length >= 10) {
    history.shift(); // remove the oldest item
  }

  history.push(newItem);
  localStorage.setItem("history", JSON.stringify(history));

  // update displayed history
  displayHistory();
  toggleCopyButton();
});

// Button to copy the output text to clipboard
document.getElementById("copyButton").addEventListener("click", function () {
  let copyText = document.getElementById("outputText").textContent;
  let textarea = document.createElement("textarea");
  textarea.textContent = copyText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  document.getElementById("copyNotification").textContent =
    "Copied to clipboard!";
  document.getElementById("copyNotification").style.visibility = "visible";
});

// Convert the input text
function substitute(input, source, target) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    let index = source.indexOf(input[i]);
    output += index >= 0 ? target[index] : input[i];
  }
  return output;
}

// Show COPY button when user encrypts/decrypts text
function toggleCopyButton() {
  let outputText = document.getElementById("outputText").textContent;
  let copyButton = document.getElementById("copyButton");
  if (outputText.trim() === "") {
    copyButton.style.display = "none";
  } else {
    copyButton.style.display = "block";
  }
}

// Show the history
function displayHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let historyElement = document.getElementById("history");
  historyElement.innerHTML = ""; // clear current history

  // iterate over the history array and add each item to the historyElement
  for (let i = history.length - 1; i >= 0; i--) {
    // iterating in reverse order to display latest first
    let item = history[i];
    let itemElement = document.createElement("p");
    itemElement.textContent = `${item.original}   ▶   ${item.result}`;
    historyElement.appendChild(itemElement);
  }
}

// Clear the history
document
  .getElementById("clearHistoryButton")
  .addEventListener("click", function () {
    localStorage.removeItem("history");
    displayHistory();
  });
