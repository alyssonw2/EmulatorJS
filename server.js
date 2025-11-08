//utilize import 
import express from 'express';
import http from 'http';
import { Server as socketIO } from 'socket.io';
import path from 'path';
import QRCode from 'qrcode';
import os from 'os';
const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);

const io = new socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 8080;

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Gerenciar conexões de controles
const controllers = {
    player1: null,
    player2: null
};

const audioListeners = {
    player1: false,
    player2: false
};

const screens = new Set();

// Obter IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const localIP = getLocalIP();
const controllerURL = `http://${localIP}:${PORT}/controller.html`;

// Gerar QR Code
app.get('/qrcode', async (req, res) => {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(controllerURL, {
            width: 300,
            margin: 2,
            color: {
                dark: '#5b6bc0',
                light: '#0a0a0a'
            }
        });
        res.json({ 
            qrcode: qrCodeDataURL, 
            url: controllerURL,
            ip: localIP 
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
});

// Socket.IO eventos
io.on('connection', (socket) => {
    console.log(`[${new Date().toLocaleTimeString()}] Nova conexão: ${socket.id}`);

    // Registrar como tela (emulador)
    socket.on('register-screen', () => {
        screens.add(socket.id);
        console.log(`[TELA] Registrada: ${socket.id}`);
        
        // Enviar status dos controles
        socket.emit('controllers-status', {
            player1: controllers.player1 !== null,
            player2: controllers.player2 !== null
        });
    });

    // Registrar como controle
    socket.on('register-controller', (data) => {
        let playerNumber = null;

        // Atribuir jogador
        if (!controllers.player1) {
            controllers.player1 = socket.id;
            playerNumber = 1;
        } else if (!controllers.player2) {
            controllers.player2 = socket.id;
            playerNumber = 2;
        } else {
            socket.emit('controller-full');
            return;
        }

        socket.playerNumber = playerNumber;
        console.log(`[CONTROLE] Player ${playerNumber} conectado: ${socket.id}`);

        // Confirmar conexão
        socket.emit('controller-registered', { 
            player: playerNumber,
            message: `Conectado como Jogador ${playerNumber}`
        });

        // Notificar todas as telas
        screens.forEach(screenId => {
            io.to(screenId).emit('controller-connected', { player: playerNumber });
        });
    });

    // Receber comandos do controle
    socket.on('controller-input', (data) => {
        const playerNumber = socket.playerNumber;
        if (!playerNumber) return;

        console.log(`[INPUT] P${playerNumber}: ${data.key} ${data.pressed ? 'pressed' : 'released'}`);

        // Enviar para todas as telas
        screens.forEach(screenId => {
            io.to(screenId).emit('game-input', {
                player: playerNumber,
                ...data
            });
        });
    });

    // Vibração no controle
    socket.on('vibrate-controller', (data) => {
        if (data.player === 1 && controllers.player1) {
            io.to(controllers.player1).emit('vibrate', data);
        } else if (data.player === 2 && controllers.player2) {
            io.to(controllers.player2).emit('vibrate', data);
        }
    });

    // Ativar áudio no controle
    socket.on('enable-audio', (data) => {
        const playerNumber = data.player;
        if (playerNumber === 1) {
            audioListeners.player1 = true;
            console.log(`[AUDIO] Player 1 habilitou áudio`);
        } else if (playerNumber === 2) {
            audioListeners.player2 = true;
            console.log(`[AUDIO] Player 2 habilitou áudio`);
        }
    });

    // Desativar áudio no controle
    socket.on('disable-audio', (data) => {
        const playerNumber = data.player;
        if (playerNumber === 1) {
            audioListeners.player1 = false;
            console.log(`[AUDIO] Player 1 desabilitou áudio`);
        } else if (playerNumber === 2) {
            audioListeners.player2 = false;
            console.log(`[AUDIO] Player 2 desabilitou áudio`);
        }
    });

    // Receber stream de áudio da tela (emulador)
    socket.on('game-audio', (audioData) => {
        // Enviar para os controles que têm áudio habilitado
        if (audioListeners.player1 && controllers.player1) {
            io.to(controllers.player1).emit('audio-stream', audioData);
        }
        if (audioListeners.player2 && controllers.player2) {
            io.to(controllers.player2).emit('audio-stream', audioData);
        }
    });

    // Desconexão
    socket.on('disconnect', () => {
        console.log(`[${new Date().toLocaleTimeString()}] Desconectado: ${socket.id}`);

        // Remover tela
        if (screens.has(socket.id)) {
            screens.delete(socket.id);
            console.log(`[TELA] Desconectada: ${socket.id}`);
        }

        // Remover controle
        if (controllers.player1 === socket.id) {
            console.log(`[CONTROLE] Player 1 desconectado`);
            controllers.player1 = null;
            audioListeners.player1 = false;
            screens.forEach(screenId => {
                io.to(screenId).emit('controller-disconnected', { player: 1 });
            });
        } else if (controllers.player2 === socket.id) {
            console.log(`[CONTROLE] Player 2 desconectado`);
            controllers.player2 = null;
            audioListeners.player2 = false;
            screens.forEach(screenId => {
                io.to(screenId).emit('controller-disconnected', { player: 2 });
            });
        }
    });
});

// Iniciar servidor
server.listen(PORT, '0.0.0.0', () => {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║           🎮 ARCADE STATION SERVER 🎮                ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');
    console.log(`📡 Servidor rodando em: http://${localIP}:${PORT}`);
    console.log(`📱 URL do Controle: ${controllerURL}`);
    console.log(`\n🎯 Acesse a página principal e escaneie o QR Code\n`);
    console.log('═══════════════════════════════════════════════════════\n');
});
