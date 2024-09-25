<template>
  <div id="app">
    <router-view></router-view>

    <div class="wave-container darker-wave">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#005f80"
          fill-opacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,208C672,235,768,245,864,218.7C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>

    <div class="wave-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#00bfff"
          fill-opacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,208C672,235,768,245,864,218.7C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Global styling */

.wave-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
  z-index: -1;
}

.darker-wave {
  z-index: -2; /* Puts it behind the first wave */
  opacity: 1; /* Optional: Adds a bit of transparency for subtle effect */
  bottom: 30px;
}

.wave-container svg {
  width: 100%;
  height: 100%;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: #19274a;
  color: white;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  overflow-x: hidden;
}

h1,
h2,
h3 {
  color: #ecf0f1;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  font-size: 16px;
}

#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: white;
}

button {
  display: inline-block;
  background-color: #e74c3c;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c0392b;
}

.container {
  padding: 20px;
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.fab img {
  width: 20px;
  height: 20px;
}

.no-messages {
  text-align: center;
  color: #ecf0f1;
  font-size: 18px;
  padding: 20px;
  background-color: #34495e;
  border-radius: 10px;
}

.message-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  color: #333;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.message-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.message-author {
  font-weight: bold;
  font-size: 14px;
}

.message-date {
  font-size: 12px;
  color: #7f8c8d;
  text-align: right;
}
</style>
