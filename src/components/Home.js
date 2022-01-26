import React from 'react';
const io = require("socket.io-client");

const socket = io("/ws/my-namespace", {
  reconnectionDelayMax: 10000,
  auth: { token: "123"},
  query: {"my-key": "my-value"}
});

socket.on("connect", () => {
  console.log(socket.id);
});

const Home = () => {
    return (
        <div>
            HOME - LETS GO!
        </div>
    );
}

export default Home;