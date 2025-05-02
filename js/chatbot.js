const chatbot = document.getElementById('heav-chatbot');
const toggleChat = document.getElementById('chatbotToggle');
const chatMessages = document.getElementById('chatMessages');

toggleChat.addEventListener('click', () => {
  restartChat()
  chatbot.classList.toggle('chatbot-open');
});

function appendMessage(content, type = 'bot') {
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  msg.innerHTML = content;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  scrollToBottom();
}

function scrollToBottom() {
  const chatContainer = document.getElementById('chatbot-window');
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function selectOption(option) {
  appendMessage(option === 'technical' ? '🔧 Technical Support' : '🧑‍💼 Talk to a Human', 'user');

  if (option === 'technical') {
    const techOptions = `
      <div class="options">
        <button onclick="handleTechIssue('Website/App Not Working')">🖥️ Website/App Not Working</button>
        <button onclick="handleTechIssue('Product Not Functioning')">🛠️ Product Not Functioning</button>
        <button onclick="handleTechIssue('Installation Help')">💾 Installation Help</button>
        <button onclick="handleTechIssue('Connectivity Issues')">🔌 Connectivity Issues</button>
        <button onclick="handleTechIssue('Troubleshooting Guide')">📃 Troubleshooting Guide</button>
      </div>
    `;
    appendMessage("Please choose a technical issue:");
    appendMessage(techOptions);
  } else if (option === 'human') {
    const supportMessage = `
      <p>Please call our support team at <strong>+966 53 295 7753</strong> and raise your query.</p>
      <p>Alternatively, you can email us at <strong>heav.ai.info@gmail.com</strong>, and our support team will get in touch with you as soon as possible.</p>
    `;
    appendMessage("Thanks for reaching out to our support team. Here's how you can connect with us:", 'bot');
    appendMessage(supportMessage);
    appendMessage('<button onclick="restartChat()" style="margin-top: 20px; padding: 8px 20px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer;">Chat Again</button>');
  } else {
    appendMessage("Sure! Please wait while we connect you to a support agent. This might take a minute.");
  }
}

function handleTechIssue(issue) {
  appendMessage(issue, 'user');
  appendMessage(`Please enter your email address so we can assist you with "${issue}".`);

  const emailForm = `
    <div class="email-form">
      <input type="email" id="userEmail" placeholder="Enter your email" style="width: 100%; padding: 8px; margin-top: 8px; border-radius: 6px; border: none;">
      <button onclick="submitEmail('${issue}')" style="margin-top: 10px; padding: 8px 12px; background: var(--primary); color: #fff; border: none; border-radius: 6px; cursor: pointer;">Submit</button>
    </div>
  `;
  appendMessage(emailForm);
}

function submitEmail(issue) {
  const emailInput = document.getElementById('userEmail');
  const email = emailInput ? emailInput.value.trim() : '';

  if (email && /\S+@\S+\.\S+/.test(email)) {
    appendMessage(email, 'user');
    appendMessage(`✅ Thanks for connecting with heav! Our support team will reach out to: <b><i>${email}</i></b> regarding <b><i>${issue}</i></b>.`);
    appendMessage('<button onclick="restartChat()" style="margin-top: 20px; padding: 8px 20px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer;">Chat Again</button>');
  } else {
    appendMessage("❗ Please enter a valid email address.");
  }
}

function restartChat() {
  // Clear the chat window
  chatMessages.innerHTML = '';
  
  // Reset the chatbot to initial state
  appendMessage('Hi! How can I assist you today?', 'bot');
  const initialOptions = `
    <div class="options">
      <button onclick="selectOption('technical')">🔧 Technical Support</button>
      <button onclick="selectOption('human')">🧑‍💼 Talk to a Human</button>
    </div>
  `;
  appendMessage(initialOptions);
}