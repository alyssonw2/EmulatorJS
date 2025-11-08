# 🎮 Arcade Station - Interface Estilo PlayStation 5

Uma interface moderna e elegante para EmulatorJS, inspirada no design do PlayStation 5.

## ✨ Recursos

- 🎨 Design moderno inspirado no menu do PS5
- 🎮 Carrossel horizontal de jogos com navegação suave
- 🖼️ Backgrounds dinâmicos com imagens ou vídeos
- ⌨️ Navegação por teclado (setas, Enter, ESC)
- 📱 Design responsivo
- 🎯 Transições e animações fluidas
- 📊 Sistema de gerenciamento de jogos via JSON

## 🚀 Como Usar

### 1. Adicionar Imagens dos Jogos

Adicione as capas dos jogos na pasta `assets/covers/`:

```
assets/covers/
├── kof97pls.jpg
├── mk2.jpg
├── mslug.jpg
├── mslug4.jpg
└── mslug5.jpg
```

**Formatos aceitos:** JPG, PNG  
**Resolução recomendada:** 640x480 ou maior

### 2. Adicionar Vídeos (Opcional)

Para backgrounds animados, adicione vídeos na pasta `assets/videos/`:

```
assets/videos/
├── kof97pls.mp4
├── mk2.mp4
├── mslug.mp4
├── mslug4.mp4
└── mslug5.mp4
```

**Formato:** MP4 (H.264)  
**Duração:** 10-30 segundos em loop  
**Nota:** Os vídeos são opcionais. Se não existirem, usará as imagens.

### 3. Adicionar Novos Jogos

#### Método 1: Script Auxiliar (Recomendado)

```bash
# Listar jogos cadastrados
node gerenciar-jogos.js listar

# Adicionar novo jogo (interativo)
node gerenciar-jogos.js adicionar

# Remover um jogo
node gerenciar-jogos.js remover <id>

# Escanear ROMs na pasta arcade
node gerenciar-jogos.js scan
```

#### Método 2: Editar Manualmente

Edite o arquivo `jogosdisponiveis.json`:

```json
{
  "jogos": [
    {
      "id": "meu_jogo",
      "nome": "Nome do Jogo",
      "descricao": "Descrição detalhada do jogo...",
      "arquivo": "arcade/meu_jogo.zip",
      "imagem": "assets/covers/meu_jogo.jpg",
      "video": "assets/videos/meu_jogo.mp4",
      "plataforma": "arcade",
      "genero": "Ação",
      "ano": "1995",
      "jogadores": "1-2",
      "configuracoes": {
        "core": "arcade",
        "threads": false,
        "debug": false
      }
    }
  ]
}
```

### 4. Iniciar o Servidor

```bash
npm start
# ou
yarn start
```

Acesse: `http://localhost:8080`

## ⌨️ Controles

### No Menu:
- **← →** - Navegar entre jogos
- **Enter** - Jogar jogo selecionado
- **ESC** - Sair do jogo (quando estiver jogando)

### No Jogo:
Depende da configuração de cada emulador. Use o menu do EmulatorJS (ícone ⚙️) para configurar controles.

## 📁 Estrutura de Arquivos

```
EmulatorJS/
├── index.html              # Interface principal (estilo PS5)
├── jogosdisponiveis.json   # Base de dados dos jogos
├── gerenciar-jogos.js      # Script de gerenciamento
├── assets/
│   ├── covers/            # Imagens de capa
│   └── videos/            # Vídeos de background (opcional)
├── roms/
│   └── arcade/            # Arquivos ROM (.zip)
├── data/                  # Arquivos do EmulatorJS
└── docs/                  # Documentação
```

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS no `index.html`:

```css
/* Gradiente de fundo */
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);

/* Cor de destaque */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Alterar Título

No arquivo `index.html`, linha ~415:

```html
<div class="logo">🎮 SEU TÍTULO AQUI</div>
```

## 🎮 Cores Suportados

O EmulatorJS suporta diversos cores:

- **Arcade**: MAME, FBNeo
- **Nintendo**: NES, SNES, N64, Game Boy, GBA, DS
- **PlayStation**: PS1, PSP
- **Sega**: Genesis, Saturn, Dreamcast, Game Gear
- **Atari**: 2600, 7800, Jaguar, Lynx
- E muitos outros...

Veja a lista completa em `data/cores/README.md`

## 🔧 Configurações Avançadas

### Ativar Threads (Melhor Performance)

No `jogosdisponiveis.json`:

```json
"configuracoes": {
  "core": "ppsspp",
  "threads": true,  // ← Ativar aqui
  "debug": false
}
```

**Nota:** Requer configuração de headers CORS. Veja documentação do EmulatorJS.

### Modo Debug

```json
"configuracoes": {
  "core": "arcade",
  "threads": false,
  "debug": true  // ← Ativar para ver logs detalhados
}
```

## 🐛 Solução de Problemas

### Jogo não carrega

1. Verifique se o arquivo ROM existe na pasta especificada
2. Confirme que o core está correto para o tipo de ROM
3. Ative o modo debug para ver logs de erro

### Imagem não aparece

1. Verifique o caminho no JSON
2. Use extensões .jpg ou .png em minúsculas
3. Confirme que o arquivo existe na pasta

### Vídeo não toca

1. Certifique-se que é MP4 (H.264)
2. Teste o vídeo no navegador diretamente
3. O sistema usará a imagem como fallback se o vídeo falhar

## 📦 Obter Recursos

### Imagens de Capa
- [MobyGames](https://www.mobygames.com/)
- [ScreenScraper](https://www.screenscraper.fr/)
- [TheGamesDB](https://thegamesdb.net/)

### Vídeos de Gameplay
- Grave com OBS Studio
- Procure no YouTube por "gameplay no commentary"
- Use youtube-dl para baixar

## 📝 Licença

Este projeto usa EmulatorJS que é licenciado sob GPL-3.0.

## 🤝 Contribuindo

Sinta-se livre para melhorar este projeto!

1. Adicione mais jogos ao JSON
2. Melhore o CSS
3. Adicione novos recursos
4. Compartilhe suas melhorias

## 📚 Recursos Adicionais

- [EmulatorJS Docs](https://emulatorjs.org)
- [EmulatorJS GitHub](https://github.com/EmulatorJS/EmulatorJS)
- [Lista de Cores](https://github.com/EmulatorJS/EmulatorJS/tree/main/data/cores)

---

**Desenvolvido com ❤️ para a comunidade de retrogaming**
