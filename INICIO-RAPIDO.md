# 🚀 Guia Rápido - Arcade Station

## ▶️ Iniciar o Servidor

```bash
cd "/home/pc/Área de Trabalho/SERVIDOR JOGOS/EmulatorJS"
npm start
```

Ou:

```bash
yarn start
```

Acesse: **http://localhost:8080**

---

## 📸 Próximos Passos

### 1. Adicionar Capas Reais dos Jogos

As imagens atuais são placeholders. Para adicionar capas reais:

1. Baixe imagens de alta qualidade dos jogos
2. Salve como `.jpg` na pasta `assets/covers/`
3. Use os mesmos nomes dos arquivos existentes

**Fontes recomendadas:**
- https://www.mobygames.com/
- https://www.screenscraper.fr/
- https://thegamesdb.net/

### 2. Adicionar Vídeos (Opcional mas Impressionante!)

Para ter backgrounds animados como no PS5:

1. Grave ou baixe vídeos curtos de gameplay (10-30 seg)
2. Converta para MP4 se necessário
3. Salve na pasta `assets/videos/`

**Exemplo com FFmpeg:**
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 -t 20 output.mp4
```

---

## 🎮 Como Usar a Interface

### Navegação:
- **← →** Mover entre jogos
- **Enter** Jogar o jogo selecionado
- **ESC** Voltar ao menu (quando estiver jogando)

### Mouse:
- Clique nos cards dos jogos para selecionar
- Clique em "▶ Jogar Agora" para iniciar
- Use os botões ◀ ▶ para navegar

---

## 🛠️ Gerenciar Jogos

### Listar jogos cadastrados:
```bash
node gerenciar-jogos.js listar
```

### Adicionar novo jogo:
```bash
node gerenciar-jogos.js adicionar
```

### Remover um jogo:
```bash
node gerenciar-jogos.js remover <id>
```

### Escanear pasta de ROMs:
```bash
node gerenciar-jogos.js scan
```

---

## 📝 Adicionar Jogo Manualmente

Edite `jogosdisponiveis.json`:

```json
{
  "id": "seu_jogo",
  "nome": "Nome do Jogo",
  "descricao": "Descrição completa...",
  "arquivo": "arcade/seu_jogo.zip",
  "imagem": "assets/covers/seu_jogo.jpg",
  "video": "assets/videos/seu_jogo.mp4",
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
```

---

## 🎨 Personalizar

### Mudar o nome do sistema:
Edite `index.html`, linha ~415:
```html
<div class="logo">🎮 SEU NOME AQUI</div>
```

### Mudar as cores:
Edite as variáveis CSS no `index.html`:
- Gradiente de fundo (linha ~15)
- Cores de destaque (linha ~418)

---

## ✅ Checklist de Setup

- [x] EmulatorJS instalado
- [x] Cores instalados e linkados
- [x] Interface PS5 criada
- [x] JSON de jogos configurado
- [ ] **Adicionar capas reais dos jogos**
- [ ] **Adicionar vídeos de gameplay (opcional)**
- [ ] Personalizar cores/nome
- [ ] Testar todos os jogos

---

## 🆘 Problemas Comuns

### Jogo não carrega
- Verifique se o arquivo ROM existe
- Confira o caminho no JSON
- Ative debug: `"debug": true`

### Imagem não aparece
- Usa o logo padrão como fallback
- Adicione a imagem com o nome correto
- Formatos: .jpg ou .png

### Vídeo não toca
- Sistema usa imagem como fallback
- Formato: MP4 (H.264)
- Teste o vídeo diretamente no navegador

---

## 📚 Documentação Completa

Veja: **ARCADE-STATION-README.md**

---

**Divirta-se! 🎮✨**
