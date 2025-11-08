# 🎮 Controles Virtuais via Socket.IO

Sistema completo para usar celulares como controles via rede local com QR Code.

## 🚀 Como Usar

### 1. Iniciar o Servidor

```bash
npm start
```

Ou use o script arcade-station.sh:
```bash
./arcade-station.sh
```

### 2. Acessar a Interface

Abra no navegador do PC:
```
http://localhost:8080
```

### 3. Conectar Controles

1. **No PC:** Clique no botão "🎮 Controles" no canto superior direito
2. **No Celular:** Escaneie o QR Code que aparece
3. **Ou acesse manualmente:** `http://[IP-DO-PC]:8080/controller.html`

### 4. Jogar

- **Suporta até 2 jogadores** simultaneamente
- **D-Pad:** Direcionais (cima, baixo, esquerda, direita)
- **Botões de Ação:** A, B, X, Y
- **Botões Especiais:** START e SELECT
- **Vibração:** Feedback tátil ao pressionar botões (se o celular suportar)

## 🎯 Mapeamento de Teclas

| Controle Virtual | Tecla EmulatorJS | Função |
|-----------------|------------------|--------|
| D-Pad ↑         | Arrow Up         | Cima |
| D-Pad ↓         | Arrow Down       | Baixo |
| D-Pad ←         | Arrow Left       | Esquerda |
| D-Pad →         | Arrow Right      | Direita |
| Botão A         | X                | Ação A |
| Botão B         | Z                | Ação B |
| Botão X         | S                | Ação X |
| Botão Y         | A                | Ação Y |
| START           | Enter            | Start |
| SELECT          | Shift Right      | Select |

## 📱 Recursos

- ✅ **Conexão via QR Code:** Rápido e fácil
- ✅ **2 Jogadores:** Suporte simultâneo
- ✅ **Baixa Latência:** Comunicação WebSocket
- ✅ **Feedback Visual:** Status de conexão em tempo real
- ✅ **Vibração:** Feedback tátil (quando disponível)
- ✅ **Responsive:** Interface otimizada para celular
- ✅ **Wake Lock:** Mantém tela do celular ligada

## 🛠️ Arquitetura

```
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│   PC/TV     │          │   Servidor  │          │  Celular 1  │
│  (Tela)     │◄────────►│  Socket.IO  │◄────────►│  (Player 1) │
│  index.html │          │  server.js  │          │controller.html
└─────────────┘          └─────────────┘          └─────────────┘
                                │
                                ▼
                         ┌─────────────┐
                         │  Celular 2  │
                         │  (Player 2) │
                         │controller.html
                         └─────────────┘
```

## 🔧 Troubleshooting

### Controle não conecta

1. **Verifique se o celular está na mesma rede WiFi**
2. **Desative VPN/Proxy** se estiver ativo
3. **Permita conexões na porta 8080** no firewall
4. **Tente acessar manualmente:** `http://[IP]:8080/controller.html`

### Comandos não funcionam

1. **Verifique o Console do navegador (F12)** para ver logs
2. **Certifique-se que o jogo está rodando**
3. **Teste com teclado físico** para confirmar que os comandos funcionam
4. **Recarregue a página** do controle

### IP não detectado

Edite `server.js` e defina manualmente:
```javascript
const localIP = '192.168.1.100'; // Seu IP
```

## 📊 Logs do Servidor

O servidor exibe logs detalhados:

```
[14:30:15] Nova conexão: abc123
[TELA] Registrada: abc123
[CONTROLE] Player 1 conectado: def456
[CONTROLE] Player 2 conectado: ghi789
P1: up pressed -> ArrowUp
P2: a pressed -> KeyX
```

## 🔐 Segurança

- ⚠️ **Rede Local Apenas:** Não exponha o servidor para internet pública
- ⚠️ **Sem Autenticação:** Qualquer um na rede pode conectar
- ✅ **CORS Liberado:** Apenas para desenvolvimento local

## 📝 Customização

### Mudar Porta

Edite `server.js`:
```javascript
const PORT = 3000; // Nova porta
```

### Adicionar Mais Jogadores

Edite `server.js` e adicione `player3`, `player4`, etc:
```javascript
const controllers = {
    player1: null,
    player2: null,
    player3: null,
    player4: null
};
```

### Customizar Mapeamento de Teclas

Edite `index.html`:
```javascript
const keyMapping = {
    'a': 'KeyX',    // Mudar para outra tecla
    'b': 'KeyC',    // etc
    // ...
};
```

## 🎨 Cores do Controle

O controle usa o mesmo esquema de cores da interface principal:
- **Preto:** `#0d0d0d`
- **Cinza:** `#1a1a1a`
- **Azul-Violeta:** `#5b6bc0`, `#3f51b5`

## 📚 Dependências

- **express:** Servidor HTTP
- **socket.io:** Comunicação WebSocket em tempo real
- **qrcode:** Geração de QR Codes

## 🐛 Debug Mode

Para ativar logs detalhados, abra o Console (F12) e veja:
- Conexões Socket.IO
- Inputs recebidos
- Status dos jogadores

## 💡 Dicas

1. **Use WiFi 5GHz** para menor latência
2. **Modo Avião + WiFi** no celular para economizar bateria
3. **Fullscreen no celular** para melhor experiência
4. **Teste a latência** antes de jogar competitivo
5. **Deixe o celular carregando** durante longas sessões

---

**Desenvolvido com ❤️ para Arcade Station**
