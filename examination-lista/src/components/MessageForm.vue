<template>
  <div class="form-container">
    <div class="message-bubble">
      <!-- Message content -->
      <div class="message-tab">S</div>
      <textarea
        v-model="messageText"
        placeholder="Låt oss baka pannkakor!"
        class="message-input"
        rows="4"
      ></textarea>
    </div>

    <!-- Username input -->
    <input
      v-model="username"
      placeholder="Användarnamn"
      class="username-input"
    />

    <!-- Submit button -->
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
/* Form container */
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
}

/* Message bubble with speech bubble style */
.message-bubble {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 600px;
  max-height: 600px;
}

.message-bubble::after {
  content: "";
  position: absolute;
  bottom: -8px;
  right: 5px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white; /* Rotates the tail to point down */
  transform: rotate(0deg); /* Adjusts the angle */
}

/* Message tab at top-left with initial */
.message-tab {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ff5b5b;
  color: white;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-weight: bold;
}

/* Textarea inside the message bubble */
textarea.message-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  resize: none;
  outline: none;
  border-radius: 5px;
  height: 550px;
  max-height: 550px;
}

/* Username input styling */
input.username-input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  background-color: #19274a;
  color: white;
}

/* Submit button */
button.submit-btn {
  width: 100%;
  max-width: 400px;
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button.submit-btn:hover {
  background-color: #c0392b;
}
</style>
