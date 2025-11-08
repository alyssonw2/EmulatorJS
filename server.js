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

// Gerenciar conexões de controles por usuário
const userSessions = new Map(); // sessionId -> { screen, controllers: {player1, player2}, audioListeners }

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
        // Pegar sessionId da query string
        const sessionId = req.query.sessionId || 'generic';
        const controllerURLWithSession = `http://${localIP}:${PORT}/controller.html?session=${sessionId}`;
        
        const qrCodeDataURL = await QRCode.toDataURL(controllerURLWithSession, {
            width: 300,
            margin: 2,
            color: {
                dark: '#5b6bc0',
                light: '#0a0a0a'
            }
        });
        res.json({ 
            qrcode: qrCodeDataURL, 
            url: controllerURLWithSession,
            ip: localIP,
            sessionId: sessionId
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
});

// Socket.IO eventos
io.on('connection', (socket) => {
    console.log(`[${new Date().toLocaleTimeString()}] Nova conexão: ${socket.id}`);
    
    // Dados de autenticação
    const auth = socket.handshake.auth || {};
    socket.userData = {
        usuario: auth.usuario || 'guest',
        nome: auth.nome || 'Convidado',
        sessionId: auth.sessionId || socket.id,
        premium: auth.premium || false
    };

    // Registrar como tela (emulador)
    socket.on('register-screen', (data) => {
        const sessionId = data?.sessionId || socket.userData.sessionId;
        
        // Criar sessão se não existir
        if (!userSessions.has(sessionId)) {
            userSessions.set(sessionId, {
                screen: socket.id,
                usuario: socket.userData.usuario,
                nome: socket.userData.nome,
                controllers: { player1: null, player2: null },
                audioListeners: { player1: false, player2: false }
            });
        } else {
            // Atualizar screen da sessão existente
            const session = userSessions.get(sessionId);
            session.screen = socket.id;
        }
        
        socket.sessionId = sessionId;
        screens.add(socket.id);
        
        console.log(`[TELA] ${socket.userData.nome} (${socket.userData.usuario}) registrado - Sessão: ${sessionId}`);
        
        // Enviar status dos controles
        const session = userSessions.get(sessionId);
        socket.emit('controllers-status', {
            player1: session.controllers.player1 !== null,
            player2: session.controllers.player2 !== null
        });
    });

    // Registrar como controle
    socket.on('register-controller', (data) => {
        // Usar sessionId enviado pelo controller ou procurar uma sessão disponível
        let sessionId = data?.sessionId || null;
        let targetSession = null;
        
        // Se enviou sessionId, tentar encontrar essa sessão
        if (sessionId && userSessions.has(sessionId)) {
            targetSession = userSessions.get(sessionId);
            console.log(`[CONTROLE] Tentando conectar à sessão específica: ${sessionId}`);
        } else {
            // Procurar por uma sessão com vagas
            console.log('[CONTROLE] Procurando sessão disponível...');
            for (const [sid, session] of userSessions.entries()) {
                if (!session.controllers.player1 || !session.controllers.player2) {
                    targetSession = session;
                    sessionId = sid;
                    console.log(`[CONTROLE] Sessão encontrada: ${sessionId}`);
                    break;
                }
            }
        }
        
        // Se não encontrou nenhuma sessão, criar uma genérica
        if (!targetSession) {
            console.log('[CONTROLE] Nenhuma sessão encontrada, criando genérica');
            sessionId = 'generic_' + Date.now();
            targetSession = {
                screen: null,
                usuario: 'system',
                nome: 'Sistema',
                controllers: { player1: null, player2: null },
                audioListeners: { player1: false, player2: false }
            };
            userSessions.set(sessionId, targetSession);
        }
        
        let playerNumber = null;

        // Atribuir jogador
        if (!targetSession.controllers.player1) {
            targetSession.controllers.player1 = socket.id;
            playerNumber = 1;
        } else if (!targetSession.controllers.player2) {
            targetSession.controllers.player2 = socket.id;
            playerNumber = 2;
        } else {
            console.log(`[CONTROLE] Sessão ${sessionId} cheia!`);
            socket.emit('controller-full');
            return;
        }

        socket.playerNumber = playerNumber;
        socket.sessionId = sessionId;
        
        console.log(`[CONTROLE] Player ${playerNumber} conectado à sessão de ${targetSession.nome} (${sessionId}) - Socket: ${socket.id}`);

        // Confirmar conexão
        socket.emit('controller-registered', { 
            player: playerNumber,
            message: `Conectado como Jogador ${playerNumber}`,
            usuario: targetSession.nome
        });

        // Notificar a tela específica da sessão
        if (targetSession.screen) {
            io.to(targetSession.screen).emit('controller-connected', { player: playerNumber });
        }
    });

    // Receber comandos do controle
    socket.on('controller-input', (data) => {
        const playerNumber = socket.playerNumber;
        const sessionId = socket.sessionId;
        
        if (!playerNumber || !sessionId) return;
        
        const session = userSessions.get(sessionId);
        if (!session) return;

        console.log(`[INPUT] ${session.nome} P${playerNumber}: ${data.key} ${data.pressed ? 'pressed' : 'released'}`);

        // Enviar apenas para a tela da sessão
        if (session.screen) {
            io.to(session.screen).emit('game-input', {
                player: playerNumber,
                ...data
            });
        }
    });

    // Vibração no controle
    socket.on('vibrate-controller', (data) => {
        const sessionId = socket.sessionId;
        if (!sessionId) return;
        
        const session = userSessions.get(sessionId);
        if (!session) return;
        
        if (data.player === 1 && session.controllers.player1) {
            io.to(session.controllers.player1).emit('vibrate', data);
        } else if (data.player === 2 && session.controllers.player2) {
            io.to(session.controllers.player2).emit('vibrate', data);
        }
    });

    // Ativar áudio no controle
    socket.on('enable-audio', (data) => {
        const playerNumber = data.player;
        const sessionId = socket.sessionId;
        
        if (!sessionId) return;
        const session = userSessions.get(sessionId);
        if (!session) return;
        
        if (playerNumber === 1) {
            session.audioListeners.player1 = true;
            console.log(`[AUDIO] ${session.nome} Player 1 habilitou áudio`);
        } else if (playerNumber === 2) {
            session.audioListeners.player2 = true;
            console.log(`[AUDIO] ${session.nome} Player 2 habilitou áudio`);
        }
    });

    // Desativar áudio no controle
    socket.on('disable-audio', (data) => {
        const playerNumber = data.player;
        const sessionId = socket.sessionId;
        
        if (!sessionId) return;
        const session = userSessions.get(sessionId);
        if (!session) return;
        
        if (playerNumber === 1) {
            session.audioListeners.player1 = false;
            console.log(`[AUDIO] ${session.nome} Player 1 desabilitou áudio`);
        } else if (playerNumber === 2) {
            session.audioListeners.player2 = false;
            console.log(`[AUDIO] ${session.nome} Player 2 desabilitou áudio`);
        }
    });

    // Receber stream de áudio da tela (emulador)
    socket.on('game-audio', (audioData) => {
        const sessionId = socket.sessionId;
        if (!sessionId) return;
        
        const session = userSessions.get(sessionId);
        if (!session) return;
        
        // Enviar para os controles da sessão que têm áudio habilitado
        if (session.audioListeners.player1 && session.controllers.player1) {
            io.to(session.controllers.player1).emit('audio-stream', audioData);
        }
        if (session.audioListeners.player2 && session.controllers.player2) {
            io.to(session.controllers.player2).emit('audio-stream', audioData);
        }
    });

    // Teste de áudio
    socket.on('test-audio', (audioData) => {
        const sessionId = socket.sessionId;
        if (!sessionId) return;
        
        const session = userSessions.get(sessionId);
        if (!session) return;
        
        console.log(`[TEST AUDIO] Enviando áudio de teste para controles de ${session.nome}`);
        
        // Enviar para todos os controles da sessão
        if (session.controllers.player1) {
            io.to(session.controllers.player1).emit('test-audio-play', audioData);
        }
        if (session.controllers.player2) {
            io.to(session.controllers.player2).emit('test-audio-play', audioData);
        }
    });

    // Voltar ao menu inicial (fechar jogo)
    socket.on('back-to-menu', () => {
        const sessionId = socket.sessionId;
        if (!sessionId) return;
        
        const session = userSessions.get(sessionId);
        if (!session) return;
        
        console.log(`[MENU] ${session.nome} solicitou voltar ao menu`);
        
        // Enviar comando para a tela fechar o jogo
        if (session.screen) {
            io.to(session.screen).emit('close-game');
            console.log(`[MENU] Comando enviado para tela de ${session.nome}`);
        }
    });

    // Desconexão
    socket.on('disconnect', () => {
        console.log(`[${new Date().toLocaleTimeString()}] Desconectado: ${socket.id}`);

        // Remover tela
        if (screens.has(socket.id)) {
            screens.delete(socket.id);
            console.log(`[TELA] ${socket.userData.nome} desconectado`);
        }

        // Remover controle da sessão
        const sessionId = socket.sessionId;
        if (sessionId) {
            const session = userSessions.get(sessionId);
            if (session) {
                if (session.controllers.player1 === socket.id) {
                    console.log(`[CONTROLE] ${session.nome} Player 1 desconectado`);
                    session.controllers.player1 = null;
                    session.audioListeners.player1 = false;
                    
                    // Notificar apenas a tela da sessão
                    if (session.screen) {
                        io.to(session.screen).emit('controller-disconnected', { player: 1 });
                    }
                } else if (session.controllers.player2 === socket.id) {
                    console.log(`[CONTROLE] ${session.nome} Player 2 desconectado`);
                    session.controllers.player2 = null;
                    session.audioListeners.player2 = false;
                    
                    // Notificar apenas a tela da sessão
                    if (session.screen) {
                        io.to(session.screen).emit('controller-disconnected', { player: 2 });
                    }
                }
                
                // Limpar sessão se não há mais nada conectado
                if (!session.screen && !session.controllers.player1 && !session.controllers.player2) {
                    userSessions.delete(sessionId);
                    console.log(`[SESSÃO] Sessão ${session.nome} removida (inativa)`);
                }
            }
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
