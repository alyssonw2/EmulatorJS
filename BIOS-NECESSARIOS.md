# 🎮 BIOS Necessários para Jogos Neo Geo

## ⚠️ IMPORTANTE

Os jogos de **arcade Neo Geo** (KOF '97, Metal Slug, etc.) **NÃO FUNCIONAM** sem o arquivo BIOS correto!

## 📁 Arquivo Necessário

Você precisa do arquivo:
```
neogeo.zip
```

## 📍 Onde Colocar

Coloque o arquivo `neogeo.zip` na pasta:
```
roms/arcade/neogeo.zip
```

**Estrutura correta:**
```
EmulatorJS/
├── roms/
│   └── arcade/
│       ├── neogeo.zip          ← BIOS AQUI!
│       ├── kof97pls.zip
│       ├── mslug.zip
│       ├── mslug4.zip
│       └── ...
```

## 🔍 Onde Conseguir

Por questões legais, **não posso fornecer** o arquivo BIOS. Você precisa:

1. **Extrair de um console Neo Geo real** que você possua
2. **Procurar em sites de ROMs** (sua responsabilidade legal)
3. **Buscar por "neogeo.zip bios"** no Google

## ✅ Conteúdo do neogeo.zip

O arquivo `neogeo.zip` deve conter arquivos como:
- `000-lo.lo`
- `sfix.sfix`
- `sp-s2.sp1`
- `neo-geo.rom`
- E outros arquivos de BIOS

**NÃO DESCOMPACTE** o arquivo! Deixe como `.zip`

## 🎯 Jogos que Precisam do BIOS

- ✅ **Mortal Kombat II** - Funciona SEM BIOS (arcade genérico)
- ❌ **KOF '97 Plus** - PRECISA do neogeo.zip
- ❌ **Metal Slug** - PRECISA do neogeo.zip
- ❌ **Metal Slug 4** - PRECISA do neogeo.zip
- ❌ **Metal Slug 5** - PRECISA do neogeo.zip

## 🧪 Como Testar

Depois de colocar o `neogeo.zip` na pasta correta:

1. **Limpe o cache do navegador**: `Ctrl + Shift + R`
2. **Selecione um jogo Neo Geo** (KOF ou Metal Slug)
3. **Clique em "Jogar Agora"**
4. **Abra o Console** (`F12`) e veja os logs de debug

Se aparecer erro de BIOS, verifique se o arquivo está no local correto!

## 🐛 Solução de Problemas

### Tela branca ao carregar jogo Neo Geo
→ Falta o arquivo `neogeo.zip`

### Erro "BIOS not found"
→ Arquivo não está em `roms/arcade/neogeo.zip`

### Erro "Invalid BIOS"
→ Arquivo `neogeo.zip` está corrompido ou incompleto

### Mortal Kombat funciona mas Neo Geo não
→ Mortal Kombat não precisa de BIOS especial, mas Neo Geo sim!

## 📚 Mais Informações

- EmulatorJS usa o core **FBNeo** para arcade
- FBNeo precisa de BIOS específicos para cada sistema
- Neo Geo MVS e AES usam o mesmo BIOS
- O arquivo deve estar **compactado** em `.zip`

---

**Nota Legal:** É sua responsabilidade garantir que você tem direito legal para usar os arquivos BIOS e ROMs.
