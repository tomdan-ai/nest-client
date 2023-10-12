import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');
const messageInput: HTMLInputElement | null = document.getElementById('message') as HTMLInputElement | null;
const messagesList: HTMLUListElement | null = document.getElementById('messages') as HTMLUListElement | null;

const handleSubmitNewMessage = () => {
  const message = messageInput?.value;
  if (message) {
    socket.emit('message', { data: message });
    messageInput.value = '';
  }
};

socket.on('message', ({ data }: { data: string }) => {
  handleNewMessage(data);
});

const handleNewMessage = (message: string) => {
  const newMessageElement = buildNewMessage(message);
  messagesList?.appendChild(newMessageElement);
};

const buildNewMessage = (message: string): HTMLLIElement => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};
