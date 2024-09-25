<template>
  <div class="header-container">
    <div class="app-title">Shui</div>
    <!-- Sort options dropdown -->
    <div class="sort-options">
      <label for="sort">Sortera:</label>
      <select id="sort" v-model="sortOrder" @change="sortMessages">
        <option value="newest">Nyaste</option>
        <option value="oldest">Äldsta</option>
      </select>
    </div>
  </div>
  <div>
    <!-- Search field for username -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchUsername"
        placeholder="Sök efter användarnamn"
        @input="searchMessagesByUsername"
      />
    </div>

    <!-- Display messages sorted -->
    <div
      class="message-card"
      v-for="(message, index) in sortedMessages"
      :key="index"
    >
      <div class="date-tab">{{ formatDateWithDay(message.createdAt) }}</div>
      <div class="message-body">
        <p class="message-text">{{ message.text }}</p>
        <p class="message-author">— {{ message.username }}</p>
      </div>
    </div>

    <div v-if="sortedMessages.length === 0" class="no-messages">
      Du har inga meddelanden att visa.
    </div>

    <!-- Floating button to navigate to the form view -->
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
      messages: [], // All messages from the backend
      sortOrder: "newest", // Default sort order
      searchUsername: "", // Search input for username
    };
  },
  computed: {
    sortedMessages() {
      let filteredMessages = this.messages;

      // Filter by username if searchUsername is not empty
      if (this.searchUsername) {
        filteredMessages = filteredMessages.filter((message) =>
          message.username
            .toLowerCase()
            .includes(this.searchUsername.toLowerCase())
        );
      }

      // Sort the messages by createdAt
      return filteredMessages.sort((a, b) => {
        if (this.sortOrder === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
        }
      });
    },
  },
  methods: {
    formatDateWithDay(dateString) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      // Format the date in Swedish locale
      return new Date(dateString).toLocaleDateString("sv-SE", options);
    },
    async fetchMessages(username = "") {
      try {
        // Fetch all messages or messages from a specific user
        let url =
          "https://0ghtxigwa9.execute-api.eu-north-1.amazonaws.com/dev/messages";
        if (username) {
          url += `?username=${username}`;
        }
        console.log(`Fetching messages for username: ${username}`);
        const response = await axios.get(url);
        console.log("Fetched messages:", response.data);
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    searchMessagesByUsername() {
      // Fetch messages filtered by username when the user types in the search field
      console.log("Search query:", this.searchUsername);
      this.fetchMessages(this.searchUsername);
    },
  },
  mounted() {
    this.fetchMessages(); // Fetch all messages when the component is mounted
  },
};
</script>

<style scoped>
/* Header styling */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.app-title {
  background-color: #ff5b5b;
  color: #19274a;
  font-size: 36px;
  font-weight: bold;
  padding: 0px 70px;
  text-align: center;
  height: auto;
  width: auto;
}

/* Sort options styling */
.sort-options {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-container input {
  padding: 8px;
  width: 100%;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
}

/* Message card styling */
.message-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.date-tab {
  background-color: #ff5b5b;
  color: white;
  font-size: 12px;
  padding: 5px 10px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.message-body {
  margin-top: 30px;
}

.message-text {
  font-size: 16px;
  color: #333;
  word-wrap: break-word; /* Ensures long text breaks and wraps to a new line */
  overflow-wrap: break-word; /* Supports wider browser compatibility */
}

.message-author {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

/* Floating action button (FAB) */
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.fab h1 {
  margin-bottom: 0;
}

.no-messages {
  text-align: center;
  font-size: 16px;
  color: #bdc3c7;
  margin-top: 20px;
}
</style>
