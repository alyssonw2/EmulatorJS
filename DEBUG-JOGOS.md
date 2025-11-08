# 🐛 Debug - Jogos Não Carregam

## ✅ Status Atual

- ✅ Servidor rodando: `http://192.168.3.9:8080`
- ✅ Socket.IO funcionando (conexões detectadas)
- ✅ Arquivos de ROMs existem (6 jogos)
- ✅ `data/loader.js` e `data/emulator.min.js` existem
- ⚠️ **Falta:** `neogeo.zip` (BIOS) para jogos Neo Geo

## 🔍 Como Investigar

### 1. Abrir Console do Navegador
1. Pressione **F12**
2. Vá na aba **Console**
3. Limpe o console (ícone 🚫 ou Ctrl+L)

### 2. Tentar Carregar um Jogo
1. Selecione **Metal Slug** no carrossel
2. Pressione **Enter** ou clique em "Jogar"
3. **Observe os logs no console**

### 3. Logs Esperados (Sucesso)

```
✅ Conectado ao servidor Socket.IO
🎮 Configuração EmulatorJS: {player: "#game", game: "Metal Slug", ...}
✅ EmulatorJS loader.js carregado
[Carregamento do jogo...]
```

### 4. Possíveis Erros

#### ❌ Erro: "Failed to load resource: net::ERR_FILE_NOT_FOUND"
**Causa:** Arquivo ROM não encontrado
**Solução:** 
```bash
# Verificar se o arquivo existe
ls -la roms/arcade/mslug.zip
```

#### ❌ Erro: "BIOS file not found"
**Causa:** Falta `neogeo.zip` (BIOS do Neo Geo)
**Solução:** 
- Jogos Neo Geo (KOF, Metal Slug): **Precisam do BIOS**
- Mortal Kombat II (Sega MD): **Não precisa de BIOS**
- Teste com **Mortal Kombat II** primeiro

#### ❌ Erro: "Cannot read properties of null (reading 'classList')"
**Causa:** Erro do EmulatorJS ao redimensionar
**Status:** ✅ **JÁ CORRIGIDO** - Erro deve ser silenciado agora

#### ❌ Erro: "Core not found" ou "Invalid core"
**Causa:** Core "arcade" não está carregando
**Solução:**
```bash
# Verificar se o core existe
ls -la data/cores/arcade*
```

#### ❌ Nenhum erro, mas tela fica preta
**Possíveis causas:**
1. BIOS faltando (jogos Neo Geo)
2. ROM corrompida
3. Core não inicializou

**Debug:**
```javascript
// No console (F12), verificar:
console.log(window.EJS_gameUrl);
console.log(window.EJS_core);
console.log(window.EJS_biosUrl);
```

## 🧪 Teste Rápido

### Teste 1: Mortal Kombat II (Não precisa BIOS)
```json
{
  "id": "mortalkombatiijue",
  "plataforma": "segaMD",
  "core": "arcade",
  "biosUrl": "" // SEM BIOS
}
```

✅ **Deveria funcionar** mesmo sem neogeo.zip

### Teste 2: Metal Slug (Precisa BIOS)
```json
{
  "id": "mslug",
  "plataforma": "arcade",
  "core": "arcade",
  "biosUrl": "roms/arcade/neogeo.zip"
}
```

❌ **Vai falhar** se neogeo.zip não existir

## 📊 Logs do Servidor

No terminal onde rodou `npm start`, observe:
```
[02:23:01] Nova conexão: S_g57yCV2VChf3owAAAB
[TELA] Registrada: S_g57yCV2VChf3owAAAB
```

Se tentar carregar jogo, pode aparecer:
```
GET /roms/arcade/mslug.zip 200
GET /roms/arcade/neogeo.zip 404 (se não existir)
```

## 🔧 Correções Aplicadas

✅ **Removida proteção duplicada** de erros
✅ **Simplificado patch** do handleResize
✅ **Adicionados logs** de configuração EmulatorJS
✅ **Proteção leve** para erros de classList

## 🚀 Próximos Passos

1. **Abrir** http://localhost:8080 no navegador
2. **Abrir** Console (F12)
3. **Tentar** carregar Mortal Kombat II (não precisa BIOS)
4. **Copiar** qualquer erro que aparecer
5. **Compartilhar** o erro para análise

## 📝 Informações Úteis

- **Servidor:** http://192.168.3.9:8080
- **ROMs disponíveis:** 6 jogos
- **Cores instalados:** 48 cores
- **BIOS:** ❌ neogeo.zip FALTANDO

---

**Última atualização:** 8 de novembro de 2025, 02:23
