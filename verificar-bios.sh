#!/bin/bash
# Script para verificar se os BIOS necessários estão instalados

echo "🔍 Verificando BIOS para jogos de arcade..."
echo ""

BIOS_PATH="roms/arcade/neogeo.zip"

if [ -f "$BIOS_PATH" ]; then
    echo "✅ BIOS Neo Geo encontrado!"
    echo "📁 Localização: $BIOS_PATH"
    echo "📊 Tamanho: $(du -h "$BIOS_PATH" | cut -f1)"
    echo ""
    echo "🎮 Jogos Neo Geo devem funcionar:"
    echo "   • KOF '97 Plus"
    echo "   • Metal Slug (todos)"
    echo ""
else
    echo "❌ BIOS Neo Geo NÃO encontrado!"
    echo "📁 Esperado em: $BIOS_PATH"
    echo ""
    echo "⚠️  Jogos Neo Geo NÃO VÃO FUNCIONAR sem o BIOS!"
    echo ""
    echo "📖 Leia o arquivo BIOS-NECESSARIOS.md para instruções"
    echo "   de como obter e instalar o neogeo.zip"
    echo ""
    echo "💡 Depois de colocar o arquivo, execute este script novamente"
    echo ""
fi

echo "---"
echo ""
echo "📋 Status dos jogos:"
echo ""

cd roms/arcade 2>/dev/null || exit 1

if [ -f "neogeo.zip" ]; then
    BIOS_STATUS="✅"
else
    BIOS_STATUS="❌"
fi

echo "🎮 Mortal Kombat II ............ ✅ (não precisa de BIOS especial)"
echo "🎮 KOF '97 Plus ................ $BIOS_STATUS (precisa neogeo.zip)"
echo "🎮 Metal Slug .................. $BIOS_STATUS (precisa neogeo.zip)"
echo "🎮 Metal Slug 4 ................ $BIOS_STATUS (precisa neogeo.zip)"
echo "🎮 Metal Slug 5 ................ $BIOS_STATUS (precisa neogeo.zip)"

echo ""
echo "---"
echo ""

if [ ! -f "neogeo.zip" ]; then
    echo "⏳ Próximos passos:"
    echo "   1. Obtenha o arquivo neogeo.zip (veja BIOS-NECESSARIOS.md)"
    echo "   2. Coloque em: roms/arcade/neogeo.zip"
    echo "   3. Execute este script para verificar"
    echo "   4. Limpe o cache do navegador (Ctrl+Shift+R)"
    echo "   5. Teste os jogos Neo Geo!"
else
    echo "✅ Tudo pronto! Seus jogos Neo Geo devem funcionar!"
    echo "   Se ainda não funcionarem:"
    echo "   • Limpe o cache do navegador (Ctrl+Shift+R)"
    echo "   • Verifique o console do navegador (F12)"
    echo "   • Certifique-se que debug está ativado no JSON"
fi

echo ""
