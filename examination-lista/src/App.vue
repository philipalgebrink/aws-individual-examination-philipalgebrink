<template>
  <div id="app">
    <h1>Message Board</h1>

    <div class="form-container">
      <input v-model="username" placeholder="Enter your username" />
      <textarea
        v-model="messageText"
        placeholder="Enter your message"
      ></textarea>
      <button @click="postMessage">Post Message</button>
    </div>

    <h2>All Messages</h2>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        <strong>{{ message.username }}:</strong> {{ message.text }}
        <em>({{ message.createdAt }})</em>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      messageText: "",
      messages: [],
    };
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get(
          "https://0ghtxigwa9.execute-api.eu-north-1.amazonaws.com/dev/messages"
        );
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async postMessage() {
      if (this.username === "" || this.messageText === "") {
        alert("Username and message cannot be empty.");
        return;
      }

      const newMessage = {
        id: Date.now().toString(),
        username: this.username,
        text: this.messageText,
        createdAt: new Date().toISOString(),
      };

      try {
        await axios.post(
          "https://0ghtxigwa9.execute-api.eu-north-1.amazonaws.com/dev/messages",
          newMessage
        );
        this.messageText = ""; // Clear message input after successful post
        this.fetchMessages();
      } catch (error) {
        console.error("Error posting message:", error);
      }
    },
  },
  mounted() {
    this.fetchMessages();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 30px;
}

.form-container {
  margin-bottom: 20px;
}

input,
textarea {
  width: 300px;
  margin: 5px 0;
  padding: 10px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
