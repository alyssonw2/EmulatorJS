# 🎮 Controle Analógico Virtual

## ✨ Nova Funcionalidade

Agora o controle móvel possui **dois modos de entrada**:

### 🕹️ **Modo D-Pad (Digital)**
- Direcionais com 4 botões (↑ ↓ ← →)
- Pressão digital (ligado/desligado)
- Ideal para jogos 2D clássicos

### 🎮 **Modo Analógico (Virtual)**
- Stick analógico virtual estilo console
- Movimentação suave 360°
- Zona morta configurável (10px)
- Distância máxima limitada (45px)
- Ideal para jogos que precisam de precisão direcional

## 🔄 Como Alternar

### Botão de Alternância
- **Localização:** Acima do controle esquerdo
- **Texto:** 
  - "🎮 Analógico" → Clique para ativar analógico
  - "🕹️ D-Pad" → Clique para voltar ao D-Pad

### Atalho Visual
```
┌─────────────────┐
│  🎮 Analógico   │ ← Botão de alternância
├─────────────────┤
│   ▲             │
│ ◀   ▶  D-Pad   │
│   ▼             │
└─────────────────┘

        OU

┌─────────────────┐
│   ��️ D-Pad     │ ← Botão de alternância
├─────────────────┤
│      ●          │
│    ╱   ╲        │
│   ●─────●       │ ← Analógico Virtual
│    ╲   ╱        │
│      ●          │
└─────────────────┘
```

## 🎯 Características do Analógico

### Movimentação
- **Centro:** Nenhuma direção pressionada
- **Mover para cima:** Pressiona "up"
- **Mover para baixo:** Pressiona "down"
- **Mover para esquerda:** Pressiona "left"
- **Mover para direita:** Pressiona "right"
- **Diagonais:** Pressiona 2 direções simultaneamente

### Zona Morta
- **Raio:** 10px do centro
- **Função:** Evita inputs acidentais quando o stick está próximo do centro

### Limite de Movimento
- **Raio máximo:** 45px
- **Visual:** Stick não ultrapassa a borda da base circular

### Feedback Visual
- **Stick se move** seguindo o toque/mouse
- **Volta ao centro** automaticamente ao soltar
- **Brilho aumentado** quando ativo

### Feedback Tátil
- **Vibração curta (10ms)** ao começar a mover
- **Vibração (50ms)** ao alternar entre modos

## 🔧 Implementação Técnica

### Detecção de Movimento
```javascript
// Calcula distância e ângulo do centro
const distance = Math.sqrt(deltaX² + deltaY²);
const angle = Math.atan2(deltaY, deltaX);

// Limita ao raio máximo
if (distance > maxDistance) {
    deltaX = Math.cos(angle) * maxDistance;
    deltaY = Math.sin(angle) * maxDistance;
}
```

### Conversão para Inputs Digitais
```javascript
// Zona morta: 10px
shouldPressUp = deltaY < -10
shouldPressDown = deltaY > 10
shouldPressLeft = deltaX < -10
shouldPressRight = deltaX > 10
```

### Exemplo de Uso
```
Posição: (0, -30)
↓
deltaX = 0, deltaY = -30
↓
shouldPressUp = true (deltaY < -10)
↓
Envia: sendInput('up', true)
```

## 📱 Compatibilidade

### Touch Events (Celular)
✅ `touchstart` - Inicia movimento
✅ `touchmove` - Atualiza posição
✅ `touchend` - Reseta ao centro

### Mouse Events (PC/Testes)
✅ `mousedown` - Inicia movimento
✅ `mousemove` - Atualiza posição
✅ `mouseup` - Reseta ao centro

## 🎨 Estilo Visual

### D-Pad
- **Cor base:** Azul-violeta gradiente
- **Borda:** 2px azul brilhante
- **Sombra:** Glow azul ao pressionar

### Analógico
- **Base:** Círculo 150x150px, gradiente escuro
- **Stick:** Círculo 60x60px, gradiente brilhante
- **Borda:** 3px azul claro
- **Sombra:** Glow azul intenso quando ativo

## 🐛 Debug

### Console Logs
```javascript
// Ao alternar modo
"Modo: Analógico" ou "Modo: D-Pad"

// Ao mover stick
"Analog: deltaX=25, deltaY=-30"
"Pressing: up, right"
```

### Verificar Estado
```javascript
console.log(isAnalogMode); // true/false
console.log(analogActive); // true quando movendo
console.log(pressedKeys); // Set de teclas pressionadas
```

## 💡 Dicas de Uso

### Jogos Recomendados

**Use D-Pad para:**
- Metal Slug (precisão de tiro)
- King of Fighters (combos)
- Jogos de luta em geral
- Jogos 2D clássicos

**Use Analógico para:**
- Jogos de corrida
- Jogos 3D
- Simuladores
- Jogos que precisam de movimentação suave

### Configuração Ideal
1. **Inicie em D-Pad** (padrão)
2. **Teste o jogo**
3. **Alterne para analógico** se precisar de mais precisão
4. **Use fullscreen** para melhor experiência

## 🔐 Segurança

### Limpeza ao Alternar
✅ Todas as teclas são liberadas ao trocar de modo
✅ Previne teclas "travadas"
✅ Estado sempre consistente

### Prevenção de Bugs
✅ Eventos duplicados bloqueados
✅ Zona morta evita drift
✅ Limites impedem valores inválidos

---

**Status:** ✅ Implementado e Funcional
**Versão:** 1.0
**Data:** 8 de novembro de 2025
