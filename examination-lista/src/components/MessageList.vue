<template>
  <div class="messages-container">
    <div class="sort-options">
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="sortOrder" @change="sortMessages">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>

    <div
      class="message-card"
      v-for="(message, index) in sortedMessages"
      :key="index"
    >
      <p class="message-text">{{ message.text }}</p>
      <p class="message-author">— {{ message.username }}</p>
      <p class="message-date">{{ formatDate(message.createdAt) }}</p>
    </div>
    <div v-if="messages.length === 0" class="no-messages">
      Du har inga meddelanden att visa.
    </div>

    <button class="fab" @click="$router.push('/write')">
      <h1>✍</h1>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      sortOrder: "newest",
    };
  },
  computed: {
    sortedMessages() {
      const messagesCopy = Array.from(this.messages);
      return messagesCopy.sort((a, b) => {
        if (this.sortOrder === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
        }
      });
    },
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      };
      return new Date(dateString).toLocaleString(undefined, options);
    },
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
    sortMessages() {
      this.sortedMessages;
    },
  },
  mounted() {
    this.fetchMessages();
  },
};
</script>

<style>
.sort-options {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.sort-options select {
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #bdc3c7;
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 10%;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.fab h1 {
  margin-bottom: 0;
}
</style>
