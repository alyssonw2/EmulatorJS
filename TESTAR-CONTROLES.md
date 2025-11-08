# 🧪 Teste de Controles Socket.IO

## 📋 Checklist de Debug

### 1️⃣ Iniciar o Servidor
```bash
npm start
```

**Verifique se aparece:**
```
🎮 ARCADE STATION SERVER 🎮
📡 Servidor rodando em: http://192.168.x.x:8080
📱 URL do Controle: http://192.168.x.x:8080/controller.html
```

### 2️⃣ Abrir o Console do Navegador (PC)
1. Acesse `http://localhost:8080`
2. Pressione `F12` para abrir DevTools
3. Vá na aba **Console**

**Deve aparecer:**
```
✅ Conectado ao servidor Socket.IO
```

### 3️⃣ Conectar o Controle (Celular)
1. No PC, clique em "🎮 Controles"
2. Escaneie o QR Code com o celular
3. Observe o console do PC

**Deve aparecer:**
```
✅ Jogador 1 conectado
```

### 4️⃣ Testar Inputs ANTES do Jogo
1. No celular, pressione qualquer botão (ex: botão A)
2. Observe o console do PC

**Deve aparecer:**
```
🎮 Recebido input: {player: 1, key: "a", pressed: true, timestamp: ...}
🎯 P1: a -> KeyX (keyCode: 88) [keydown]
📤 Evento enviado para canvas
```

### 5️⃣ Iniciar um Jogo
1. Selecione um jogo (ex: Metal Slug)
2. Pressione Enter (teclado físico) para iniciar
3. Aguarde o jogo carregar

### 6️⃣ Testar Inputs DENTRO do Jogo
1. No celular, pressione os direcionais
2. No celular, pressione os botões A, B, X, Y
3. Observe o console do PC

**Deve aparecer para CADA tecla:**
```
🎮 Recebido input: {player: 1, key: "up", pressed: true, ...}
🎯 P1: up -> ArrowUp (keyCode: 38) [keydown]
📤 Evento enviado para canvas
```

### 7️⃣ Verificar o Servidor (Terminal)
No terminal onde rodou `npm start`, deve aparecer:
```
[INPUT] P1: up pressed
[INPUT] P1: up released
[INPUT] P1: a pressed
[INPUT] P1: a released
```

## 🐛 Problemas Comuns

### ❌ "Conectado ao servidor" não aparece
- **Solução:** Reinicie o servidor com `npm start`
- Verifique se não há outro processo usando a porta 8080

### ❌ QR Code não carrega
- **Solução:** Verifique o IP local
- Teste acessando manualmente: `http://[SEU_IP]:8080/controller.html`

### ❌ "Recebido input" não aparece no console
- **Problema:** Socket.IO não está enviando os dados
- **Solução:** 
  1. Recarregue a página do PC (F5)
  2. Reconecte o controle no celular
  3. Verifique se o terminal do servidor mostra `[INPUT] P1: ...`

### ❌ Input chega mas o jogo não responde
- **Problema:** EmulatorJS não está capturando os eventos
- **Debug:**
  1. Pressione uma tecla no TECLADO FÍSICO - funciona?
  2. Se sim, o problema é na injeção de eventos
  3. Verifique se há `📤 Evento enviado para canvas` no console

### ❌ Apenas teclado físico funciona, controle não
- **Possível causa:** EmulatorJS está usando captura direta de teclado
- **Solução alternativa:** 
  - Teste com um jogo diferente
  - Verifique se o canvas está em foco (clique nele)

## 🔍 Logs Detalhados

### No Console do PC (F12):
```javascript
// Copie e cole para ver o status:
console.log('Socket conectado:', socket.connected);
console.log('Jogadores:', {p1: player1Status.textContent, p2: player2Status.textContent});
```

### Simular Input Manualmente (Teste):
```javascript
// No console do PC (F12), teste manualmente:
handleControllerInput({
    player: 1,
    key: 'a',
    pressed: true,
    timestamp: Date.now()
});
```

## ✅ Teste de Mapeamento

### Jogador 1:
- **Cima** → deve simular `↑` (Arrow Up)
- **Baixo** → deve simular `↓` (Arrow Down)
- **Esquerda** → deve simular `←` (Arrow Left)
- **Direita** → deve simular `→` (Arrow Right)
- **Botão A** → deve simular tecla `X`
- **Botão B** → deve simular tecla `Z`
- **Botão X** → deve simular tecla `S`
- **Botão Y** → deve simular tecla `A`
- **START** → deve simular `Enter`
- **SELECT** → deve simular `Shift`

### Jogador 2:
- **Cima** → deve simular `8`
- **Baixo** → deve simular `5`
- **Esquerda** → deve simular `4`
- **Direita** → deve simular `6`
- **Botão A** → deve simular `K`
- **Botão B** → deve simular `J`
- **Botão X** → deve simular `M`
- **Botão Y** → deve simular `L`
- **START** → deve simular `2`
- **SELECT** → deve simular `1`

## 📞 Se Nada Funcionar

1. **Reinicie TUDO:**
   ```bash
   # Pare o servidor (Ctrl+C)
   npm start
   ```

2. **Recarregue o navegador:** `Ctrl+Shift+R` (hard reload)

3. **Reconecte o celular:** Escaneie o QR Code novamente

4. **Verifique os logs:** Terminal e Console (F12) devem mostrar atividade

5. **Teste com teclado físico primeiro:** Se nem o teclado funciona, o problema é no jogo/core

---

**Última atualização:** 8 de novembro de 2025
