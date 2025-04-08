const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const proyectos = [
  { name: 'BrightBloom', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Glow.png' } },
  { name: 'SmartPet Solutions', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Meow.jpg' } },
  { name: 'XicoWeb', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Ixaya.jpeg' } },
  { name: 'BDMatrix', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Gym.png' } },
  { name: 'Violet', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Dimen.png' } },
  { name: 'Xicolab', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Xicolab.png' } },
  { name: 'MediTech', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_PillBox.png' } },
  { name: 'Virtall', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_iHome.png' } },
  { name: 'DreamStudios', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Iris.png' } },
  { name: 'SabeRed', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_Sabores.png' } },
  { name: 'MedikOS', puntaje: 0, pictureSettings: { src: 'http://localhost:3000/images/Logo_MedikOS.jpg' } },
];

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Enviar los proyectos iniciales al cliente
  socket.emit('conexionInicial', proyectos);

  // Evento para aumentar el puntaje de un proyecto
  socket.on('aumentarPuntaje', (proyecto) => {
    const index = proyectos.findIndex((p) => p.name === proyecto.name);
    if (index !== -1) {
      proyectos[index].puntaje += proyecto.puntaje;  // Sumamos el puntaje
      console.log(`Puntaje actualizado: ${proyecto.name} → ${proyectos[index].puntaje}`);
      // Emitir el evento con los datos actualizados a todos los clientes
      io.emit('puntajeActualizado', proyectos);
    }
  });

  socket.on('restablecerPuntajes', () => {
    proyectos.forEach(proyecto => proyecto.puntaje = 0);
    console.log('Puntajes restablecidos');
    io.emit('puntajeActualizado', proyectos);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});
