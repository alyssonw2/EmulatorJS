# 📋 Referência de Cores EmulatorJS

## 🎮 Tabela de Cores por Plataforma

| Plataforma | Core Recomendado | Extensões de Arquivo | Plataforma ID |
|------------|------------------|----------------------|---------------|
| **Nintendo** |
| NES | `nes` ou `fceumm` | `.nes`, `.fds`, `.unif` | `nes` |
| SNES | `snes` ou `snes9x` | `.smc`, `.sfc`, `.fig`, `.swc` | `snes` |
| Nintendo 64 | `mupen64plus_next` ou `parallel_n64` | `.z64`, `.n64`, `.v64` | `n64` |
| Game Boy | `gambatte` | `.gb` | `gb` |
| Game Boy Color | `gambatte` | `.gbc` | `gb` |
| Game Boy Advance | `mgba` | `.gba` | `gba` |
| Nintendo DS | `desmume` ou `melonds` | `.nds` | `nds` |
| **Sega** |
| Master System | `genesis_plus_gx` | `.sms` | `segaMS` |
| Genesis/Mega Drive | `genesis_plus_gx` ou `picodrive` | `.md`, `.smd`, `.gen` | `segaMD` |
| Game Gear | `genesis_plus_gx` | `.gg` | `segaGG` |
| Sega CD | `genesis_plus_gx` | `.bin`, `.cue`, `.iso` | `segaCD` |
| Sega 32X | `picodrive` | `.32x` | `sega32x` |
| Sega Saturn | `yabause` | `.bin`, `.cue`, `.iso` | `segaSaturn` |
| **Sony** |
| PlayStation | `mednafen_psx_hw` ou `pcsx_rearmed` | `.bin`, `.cue`, `.iso`, `.pbp` | `psx` |
| PlayStation Portable | `ppsspp` (requer threads) | `.iso`, `.cso` | `psp` |
| **Atari** |
| Atari 2600 | `stella2014` | `.a26`, `.bin` | `atari2600` |
| Atari 5200 | `a5200` | `.a52`, `.bin` | `atari5200` |
| Atari 7800 | `prosystem` | `.a78`, `.bin` | `atari7800` |
| Atari Lynx | `handy` | `.lnx` | `lynx` |
| Atari Jaguar | `virtualjaguar` | `.j64`, `.jag` | `jaguar` |
| **Arcade** |
| MAME | `mame2003_plus` ou `fbneo` | `.zip` | `arcade` |
| Neo Geo | `fbneo` | `.zip` | `arcade` |
| CPS1/CPS2 | `fbneo` ou `fbalpha2012_cps1/2` | `.zip` | `arcade` |
| **Outras** |
| PC Engine / TurboGrafx-16 | `mednafen_pce` | `.pce`, `.sgx` | `pce` |
| PC-FX | `mednafen_pcfx` | `.cue`, `.ccd`, `.toc` | `pcfx` |
| Neo Geo Pocket | `mednafen_ngp` | `.ngp`, `.ngc` | `ngp` |
| WonderSwan | `mednafen_wswan` | `.ws`, `.wsc` | `ws` |
| Virtual Boy | `beetle_vb` | `.vb`, `.vboy` | `vb` |
| 3DO | `opera` | `.iso`, `.cue` | `3do` |
| ColecoVision | `gearcoleco` | `.col`, `.cv` | `coleco` |
| Commodore 64 | `vice_x64sc` | `.d64`, `.t64`, `.prg` | `vice_x64sc` |
| DOS | `dosbox_pure` (requer threads) | `.zip`, `.dosz` | `dosbox` |

## 🎯 Cores mais Populares

### Arcade (MAME/FBNeo)
- **fbneo** - Mais compatível e atualizado
- **mame2003_plus** - Boa compatibilidade com romsets 0.78
- **fbalpha2012_cps1** - Específico para jogos Capcom CPS1
- **fbalpha2012_cps2** - Específico para jogos Capcom CPS2

### Nintendo 64
- **mupen64plus_next** - Melhor precisão
- **parallel_n64** - Melhor performance (requer threads)

### PlayStation
- **mednafen_psx_hw** - Melhor qualidade (usa aceleração de hardware)
- **pcsx_rearmed** - Melhor performance

### Game Boy Advance
- **mgba** - Mais preciso e rápido

## 📝 Configurações Especiais

### Threads Habilitados
Alguns cores funcionam melhor com threads habilitados (requer headers CORS):

```json
"configuracoes": {
  "core": "ppsspp",
  "threads": true,
  "debug": false
}
```

**Cores que se beneficiam de threads:**
- `ppsspp` (PSP)
- `dosbox_pure` (DOS)
- `parallel_n64` (N64 com high-res)
- `mupen64plus_next` (N64)

### BIOS Necessárias
Algumas plataformas precisam de arquivos BIOS:

- **PlayStation** - `scph5501.bin`, `scph7001.bin`, `scph1001.bin`
- **Sega Saturn** - `saturn_bios.bin`, `sega_101.bin`
- **PC Engine CD** - `syscard3.pce`

Coloque os arquivos BIOS na pasta `bios/` (criar se não existir).

## 🔧 Exemplo Completo

```json
{
  "id": "crash_bandicoot",
  "nome": "Crash Bandicoot",
  "descricao": "O clássico jogo de plataforma do PlayStation.",
  "arquivo": "psx/crash-bandicoot.bin",
  "imagem": "assets/covers/crash_bandicoot.jpg",
  "video": "assets/videos/crash_bandicoot.mp4",
  "plataforma": "psx",
  "genero": "Plataforma",
  "ano": "1996",
  "jogadores": "1",
  "configuracoes": {
    "core": "mednafen_psx_hw",
    "threads": false,
    "debug": false,
    "biosUrl": "bios/scph5501.bin"
  }
}
```

## 🌐 Links Úteis

- [EmulatorJS Cores](https://github.com/EmulatorJS/EmulatorJS/tree/main/data/cores)
- [Libretro Docs](https://docs.libretro.com/)
- [RetroArch Cores](https://www.retroarch.com/index.php?page=cores)

## 💡 Dicas

1. **Performance**: Se um jogo estiver lento, tente um core alternativo
2. **Compatibilidade**: Alguns jogos funcionam melhor com cores específicos
3. **Debug**: Ative `"debug": true` para diagnosticar problemas
4. **BIOS**: Certifique-se de ter as BIOS corretas para sistemas que precisam

---

**Última atualização:** Novembro 2025
