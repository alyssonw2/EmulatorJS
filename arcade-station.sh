#!/bin/bash

# Script de inicialização do Arcade Station
# Facilita o uso do sistema

clear
echo "╔════════════════════════════════════════╗"
echo "║     🎮 ARCADE STATION 🎮              ║"
echo "║     Interface Estilo PlayStation 5     ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Função para verificar dependências
check_dependencies() {
    echo "🔍 Verificando dependências..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js não encontrado!"
        exit 1
    fi
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependências..."
        npm install
    fi
    
    echo "✅ Dependências OK"
}

# Função para mostrar o menu
show_menu() {
    echo ""
    echo "Escolha uma opção:"
    echo ""
    echo "1) 🚀 Iniciar servidor"
    echo "2) 📋 Listar jogos"
    echo "3) ➕ Adicionar jogo"
    echo "4) 🔍 Escanear ROMs"
    echo "5) 🎨 Abrir no navegador"
    echo "6) 📚 Ver documentação"
    echo "0) ❌ Sair"
    echo ""
    read -p "Opção: " option
    
    case $option in
        1)
            start_server
            ;;
        2)
            list_games
            ;;
        3)
            add_game
            ;;
        4)
            scan_roms
            ;;
        5)
            open_browser
            ;;
        6)
            show_docs
            ;;
        0)
            echo "👋 Até logo!"
            exit 0
            ;;
        *)
            echo "❌ Opção inválida"
            show_menu
            ;;
    esac
}

# Iniciar servidor
start_server() {
    echo ""
    echo "🚀 Iniciando servidor..."
    echo ""
    echo "Acesse: http://localhost:8080"
    echo ""
    echo "Pressione Ctrl+C para parar o servidor"
    echo ""
    npm start
}

# Listar jogos
list_games() {
    echo ""
    node gerenciar-jogos.js listar
    read -p "Pressione Enter para continuar..."
    show_menu
}

# Adicionar jogo
add_game() {
    echo ""
    node gerenciar-jogos.js adicionar
    read -p "Pressione Enter para continuar..."
    show_menu
}

# Escanear ROMs
scan_roms() {
    echo ""
    node gerenciar-jogos.js scan
    echo ""
    read -p "Pressione Enter para continuar..."
    show_menu
}

# Abrir no navegador
open_browser() {
    echo ""
    echo "🌐 Abrindo navegador..."
    
    # Iniciar servidor em background
    npm start &
    SERVER_PID=$!
    
    # Aguardar servidor iniciar
    sleep 2
    
    # Abrir navegador
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8080
    elif command -v gnome-open &> /dev/null; then
        gnome-open http://localhost:8080
    else
        echo "Acesse: http://localhost:8080"
    fi
    
    echo ""
    echo "Servidor rodando (PID: $SERVER_PID)"
    echo "Pressione Enter para parar o servidor..."
    read
    
    kill $SERVER_PID
    echo "✅ Servidor parado"
    show_menu
}

# Mostrar documentação
show_docs() {
    echo ""
    echo "📚 Documentação disponível:"
    echo ""
    echo "• INICIO-RAPIDO.md - Guia de início rápido"
    echo "• ARCADE-STATION-README.md - Documentação completa"
    echo "• assets/covers/README.md - Como adicionar capas"
    echo "• assets/videos/README.md - Como adicionar vídeos"
    echo ""
    read -p "Abrir INICIO-RAPIDO.md? (s/n): " response
    
    if [ "$response" = "s" ] || [ "$response" = "S" ]; then
        if command -v less &> /dev/null; then
            less INICIO-RAPIDO.md
        else
            cat INICIO-RAPIDO.md
        fi
    fi
    
    read -p "Pressione Enter para continuar..."
    show_menu
}

# Verificar se está no diretório correto
if [ ! -f "jogosdisponiveis.json" ]; then
    echo "❌ Erro: Execute este script na pasta do EmulatorJS"
    exit 1
fi

# Iniciar
check_dependencies
show_menu
