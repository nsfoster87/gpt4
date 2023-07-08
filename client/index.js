const chatLog = document.getElementById('chat-log');
const message = document.getElementById('message');
const form = document.querySelector('form');

const displayMessage = (text, className, targetElem) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(className);

  const messageTextElement = document.createElement('div');
  messageTextElement.classList.add('message-text');
  messageTextElement.textContent = text;
  messageElement.appendChild(messageTextElement);

  targetElem.appendChild(messageElement);
  targetElem.scrollTop = targetElem.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const messageText = message.value;
  message.value = '';

  displayMessage(messageText, 'message-sent', chatLog);

  axios.post('http://localhost:3000', { message: messageText }, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => displayMessage(res.data.completion.content, 'message-received', chatLog))
  .catch(err => console.log(err));
});