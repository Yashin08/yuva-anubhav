// Get the chatbot window elements
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = chatbotWindow.querySelector('.chatbot-messages');
const chatbotInput = chatbotWindow.querySelector('.chatbot-input input');
const chatbotSendBtn = chatbotWindow.querySelector('.send-btn');
const chatbotCloseBtn = chatbotWindow.querySelector('.close-btn');

// Toggle chatbot window visibility
function toggleChatbotWindow() {
  chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'block' : 'none';
}

// Close chatbot window
chatbotCloseBtn.addEventListener('click', () => {
 chatbotWindow.style.display = 'none';
});
// Handle chatbot input
chatbotSendBtn.addEventListener('click', () => {
    const message = chatbotInput.value.trim();
    if (message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = `You: ${message}`;

      chatbotMessages.appendChild(messageElement);
      chatbotInput.value = '';
      // Add code to handle the chatbot functionality here
    }
   });
   
   // Get the APK download button element
   const apkBtn = document.getElementById('apk-btn');
   
   // Add a click event listener to the APK download button
   apkBtn.addEventListener('click', () => {
    // Code to handle APK download functionality
    // For example, you can open a download link or a modal with instructions
   });
   
   // Get the chatbot button element
   const chatbotBtn = document.getElementById('chatbot-btn');
   
   // Add a click event listener to the chatbot button
   chatbotBtn.addEventListener('click', () => {
    // Open the chatbot window
    toggleChatbotWindow();
   });

   document.getElementById("chatbot-link").addEventListener("click", function() {
    document.getElementById("user-input").scrollIntoView({ behavior: 'smooth' });
});
