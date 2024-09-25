<template>
  <div class="form-container">
    <h2>Write a Message</h2>
    <textarea
      v-model="messageText"
      placeholder="Låt oss baka pannkakor!"
      class="message-input"
    ></textarea>
    <input
      v-model="username"
      placeholder="Användarnamn"
      class="username-input"
    />
    <button @click="postMessage" class="submit-btn">Publicera</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      messageText: "",
    };
  },
  methods: {
    async postMessage() {
      if (this.username === "" || this.messageText === "") {
        alert("Användarnamn och meddelande kan inte vara tomt.");
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
        this.$router.push("/"); // Navigate back to the message list
      } catch (error) {
        console.error("Error posting message:", error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

textarea.message-input {
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
}

input.username-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
}

button.submit-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button.submit-btn:hover {
  background-color: #c0392b;
}
</style>
