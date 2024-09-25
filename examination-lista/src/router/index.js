import { createRouter, createWebHistory } from "vue-router";
import MessageList from "@/components/MessageList.vue";

const routes = [
  {
    path: "/",
    name: "MessageList",
    component: MessageList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
