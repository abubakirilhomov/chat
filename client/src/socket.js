import { io } from "socket.io-client";
const socket = io('https://chat-quiz-back.vercel.app/');
export default socket;
