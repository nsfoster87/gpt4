const chatLog = document.getElementById('chat-log');
const message = document.getElementById('message');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(message.value);

  const messageText = message.value;
  message.value = '';

  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add('message-sent');
  messageElement.innerHTML = `
    <div class="message__text">${messageText}</div>
  `;

  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;

  axios.post('http://localhost:3000', { message: messageText }, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    console.log(res.data);
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('message-received');
    messageElement.innerHTML = `
      <div class="message__text">${res.data.completion.content}</div>
    `;

    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
  })
  .catch(err => console.log(err));
});