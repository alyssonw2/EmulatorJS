#!/usr/bin/env node

/**
 * Script para gerenciar jogos no Arcade Station
 * 
 * Uso:
 *   node gerenciar-jogos.js listar                    - Lista todos os jogos
 *   node gerenciar-jogos.js adicionar                 - Adiciona um novo jogo
 *   node gerenciar-jogos.js remover <id>              - Remove um jogo
 *   node gerenciar-jogos.js scan                      - Escaneia pasta roms/arcade
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const JOGOS_FILE = './jogosdisponiveis.json';
const ROMS_DIR = './roms/arcade';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pergunta(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function carregarJogos() {
    if (!fs.existsSync(JOGOS_FILE)) {
        return { jogos: [] };
    }
    return JSON.parse(fs.readFileSync(JOGOS_FILE, 'utf8'));
}

function salvarJogos(data) {
    fs.writeFileSync(JOGOS_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ Arquivo salvo com sucesso!');
}

function listarJogos() {
    const data = carregarJogos();
    console.log('\n📚 JOGOS DISPONÍVEIS:\n');
    
    if (data.jogos.length === 0) {
        console.log('Nenhum jogo cadastrado.');
        return;
    }

    data.jogos.forEach((jogo, index) => {
        console.log(`${index + 1}. ${jogo.nome}`);
        console.log(`   ID: ${jogo.id}`);
        console.log(`   Arquivo: ${jogo.arquivo}`);
        console.log(`   Plataforma: ${jogo.plataforma}`);
        console.log(`   Ano: ${jogo.ano}`);
        console.log('');
    });
}

async function adicionarJogo() {
    console.log('\n➕ ADICIONAR NOVO JOGO\n');

    const id = await pergunta('ID do jogo (ex: mslug): ');
    const nome = await pergunta('Nome do jogo: ');
    const descricao = await pergunta('Descrição: ');
    const arquivo = await pergunta('Arquivo ROM (ex: arcade/mslug.zip): ');
    const plataforma = await pergunta('Plataforma (default: arcade): ') || 'arcade';
    const genero = await pergunta('Gênero: ');
    const ano = await pergunta('Ano: ');
    const jogadores = await pergunta('Jogadores (ex: 1-2): ');
    const core = await pergunta('Core (default: arcade): ') || 'arcade';

    const novoJogo = {
        id,
        nome,
        descricao,
        arquivo,
        imagem: `assets/covers/${id}.jpg`,
        video: `assets/videos/${id}.mp4`,
        plataforma,
        genero,
        ano,
        jogadores,
        configuracoes: {
            core,
            threads: false,
            debug: false
        }
    };

    const data = carregarJogos();
    data.jogos.push(novoJogo);
    salvarJogos(data);

    console.log('\n✅ Jogo adicionado com sucesso!');
    console.log('\n⚠️  Não se esqueça de adicionar:');
    console.log(`   - Imagem: ${novoJogo.imagem}`);
    console.log(`   - Vídeo: ${novoJogo.video} (opcional)`);
}

function removerJogo(id) {
    const data = carregarJogos();
    const index = data.jogos.findIndex(j => j.id === id);

    if (index === -1) {
        console.log(`❌ Jogo com ID "${id}" não encontrado.`);
        return;
    }

    const jogo = data.jogos[index];
    data.jogos.splice(index, 1);
    salvarJogos(data);

    console.log(`✅ Jogo "${jogo.nome}" removido com sucesso!`);
}

async function escanearRoms() {
    console.log('\n🔍 ESCANEANDO PASTA DE ROMS...\n');

    if (!fs.existsSync(ROMS_DIR)) {
        console.log(`❌ Pasta ${ROMS_DIR} não encontrada.`);
        return;
    }

    const arquivos = fs.readdirSync(ROMS_DIR)
        .filter(f => f.endsWith('.zip'))
        .sort();

    if (arquivos.length === 0) {
        console.log('Nenhum arquivo .zip encontrado.');
        return;
    }

    console.log(`Encontrados ${arquivos.length} arquivos:\n`);
    
    const data = carregarJogos();
    const idsExistentes = new Set(data.jogos.map(j => j.id));

    for (const arquivo of arquivos) {
        const nomeBase = path.basename(arquivo, '.zip');
        const id = nomeBase
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');

        const status = idsExistentes.has(id) ? '✅' : '❌';
        console.log(`${status} ${arquivo} (ID: ${id})`);
    }

    console.log('\n✅ = Já cadastrado');
    console.log('❌ = Não cadastrado');
}

// Main
const comando = process.argv[2];
const argumento = process.argv[3];

(async () => {
    try {
        switch (comando) {
            case 'listar':
                listarJogos();
                break;
            case 'adicionar':
                await adicionarJogo();
                break;
            case 'remover':
                if (!argumento) {
                    console.log('❌ Por favor, forneça o ID do jogo a ser removido.');
                    break;
                }
                removerJogo(argumento);
                break;
            case 'scan':
                await escanearRoms();
                break;
            default:
                console.log('Uso:');
                console.log('  node gerenciar-jogos.js listar');
                console.log('  node gerenciar-jogos.js adicionar');
                console.log('  node gerenciar-jogos.js remover <id>');
                console.log('  node gerenciar-jogos.js scan');
        }
    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        rl.close();
    }
})();
