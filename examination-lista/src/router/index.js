import { createRouter, createWebHistory } from "vue-router";
import MessageList from "@/components/MessageList.vue";
import MessageForm from "@/components/MessageForm.vue";

const routes = [
  {
    path: "/",
    name: "MessageList",
    component: MessageList,
  },
  {
    path: "/write",
    name: "MessageForm",
    component: MessageForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
