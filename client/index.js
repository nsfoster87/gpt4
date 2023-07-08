const chatLog = document.querySelector('.chat-log');
const message = document.getElementById('message');
const form = document.querySelector('form');
const messages = [];

const displayMessage = (text, role, targetElem) => {
  const newMessage = { role, content: `${text}` };
  messages.push(newMessage);

  const className = role === 'user' ? 'message-sent' : 'message-received';
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(className);

  const messageTextElement = document.createElement('div');
  messageTextElement.classList.add('message-text');
  messageTextElement.textContent = text;
  messageElement.appendChild(messageTextElement);

  chatLog.classList.remove('border-hidden');

  targetElem.appendChild(messageElement);
  targetElem.scrollTop = targetElem.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const messageText = message.value;
  message.value = '';

  displayMessage(messageText, 'user', chatLog);

  axios.post('http://localhost:3000', { messages }, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => displayMessage(res.data.completion.content, 'assistant', chatLog))
  .catch(err => console.log(err));
});