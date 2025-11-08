# Vídeos dos Jogos

Adicione os vídeos de gameplay dos jogos nesta pasta com os seguintes nomes:

- `kof97pls.mp4` - The King of Fighters '97 Plus
- `mk2.mp4` - Mortal Kombat II
- `mslug.mp4` - Metal Slug
- `mslug4.mp4` - Metal Slug 4
- `mslug5.mp4` - Metal Slug 5

## Formato recomendado:
- Formato: MP4 (H.264)
- Resolução: 1280x720 ou 1920x1080
- Duração: 10-30 segundos (loops)
- Sem áudio ou áudio baixo

## Como obter vídeos:
1. Grave gameplay usando OBS Studio ou software similar
2. Procure no YouTube por "gameplay" do jogo
3. Use ferramentas como youtube-dl para baixar
4. Converta para MP4 usando FFmpeg

## Exemplo FFmpeg para converter/otimizar:
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 -preset medium -an output.mp4
```

**Nota:** Os vídeos são opcionais. Se não estiverem disponíveis, o sistema usará as imagens de capa como fallback.
