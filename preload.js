import { ipcRenderer, clipboard } from 'electron';
import { getChatCompletion } from './huggingface.js';

window.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.getElementById('userInput');
  const chatMessages = document.getElementById('chatMessages');
  const clearAllButton = document.getElementById('clearAll');
  const helpButton = document.getElementById('help');

  if (!inputBox) {
    console.error("Element with id 'userInput' not found.");
    return;
  }

  clearAllButton.addEventListener('click', () => {
    chatMessages.innerHTML = '';
  });

  helpButton.addEventListener('click', () => {
    ipcRenderer.invoke('show-help-dialog');
  });

  inputBox.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      const userMessage = inputBox.value;
      if (!userMessage.trim()) return;
      console.log("User message:", userMessage);
      const questionElement = document.createElement('div');
      questionElement.className = 'question';
      questionElement.innerHTML = `<div class="message-content">${userMessage}</div>`;
      chatMessages.appendChild(questionElement);
      // block ui
      try {
        const response = await getChatCompletion(userMessage);
        console.log("Response from Hugging Face:", response.choices[0].message.content);
        const answerElement = document.createElement('div');
        answerElement.className = 'answer';
        answerElement.addEventListener('click', () => {
          clipboard.writeText(response.choices[0].message.content);
          alert('Answer copied to clipboard!');
        });
        answerElement.innerHTML = `<div class="message-content">${response.choices[0].message.content}</div>`;
        chatMessages.appendChild(answerElement);
      } catch (error) {
        console.error("Error fetching chat completion:", error);
      }
      //unblock ui
      inputBox.value = '';
    }
  });
});