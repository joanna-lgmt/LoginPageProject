// Grab DOM elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to add messages
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "bot-msg";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll to bottom
}

// Show typing animation
function addTyping() {
  const typing = document.createElement("div");
  typing.className = "bot-msg";
  typing.id = "typing";
  typing.textContent = "Typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove typing animation
function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) chatBox.removeChild(typing);
}

// Send message to backend
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user"); // Show user message
  userInput.value = "";

  addTyping(); // Show typing indicator

  let botReply = "";

  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (response.ok) {
      const data = await response.json();
      botReply = data.reply; // Use the actual backend reply
    } else {
      botReply = "🤖 Sorry, I couldn't fetch a proper response. Can you rephrase?";
    }

  } catch (error) {
    // Fallback reply instead of generic error
    botReply = "🤖 I’m having trouble connecting, but I’m here to help! Can you try asking differently?";
    console.error(error);
  }

  removeTyping();
  addMessage(botReply, "bot"); // Show bot reply
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
