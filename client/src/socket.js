import { io } from "socket.io-client";
const socket = io('https://chat-backend-green.vercel.app/');
export default socket;
