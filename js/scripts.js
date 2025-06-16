// Configuração das categorias e opções (ajuste os caminhos conforme seus frames)
const categories = [
    {
        name: 'genero',
        label: 'Escolha o gênero',
        options: [
            'imagens/genero/masculino.png',
            'imagens/genero/feminino.png',
        ]
    },
    {
        name: 'cor_olhos',
        label: 'Escolha a cor dos olhos',
        options: [
            'imagens/cor_olhos/cor1.png',
            'imagens/cor_olhos/cor2.png',
            'imagens/cor_olhos/cor3.png'            
        ]
    },
    {
        name: 'boca',
        label: 'Escolha o formato da boca',
        options: [
            'imagens/boca/1.png',
            'imagens/boca/2.png',
            'imagens/boca/3.png'
        ]
    },
    {
        name: 'orelhas',
        label: 'Escolha o formato das orelhas',
        options: [
            'imagens/orelhas/1.png',
            'imagens/orelhas/2.png',
            'imagens/orelhas/3.png'
        ]
    },
    {
        name: 'cabelo',
        label: 'Escolha o formato do cabelo',
        options: [
            'imagens/cabelo/estilo1.png',
            'imagens/cabelo/estilo2.png',
            'imagens/cabelo/estilo3.png'
        ]
    },
    {
        name: 'cor_cabelo',
        label: 'Escolha a cor do cabelo',
        options: [] // Será preenchido dinamicamente com base no cabelo escolhido
    },
    {
        name: 'roupa',
        label: 'Escolha o estilo da roupa',
        options: [
            'imagens/roupa/1.png',
            'imagens/roupa/2.png',
            'imagens/roupa/3.png',
            'imagens/roupa/4.png'
        ]
    }
];

let currentCategoryIndex = 0;
let currentOptionIndex = 0;
let isPaused = false;
let intervalId = null;
let selectedOptions = {}; // Armazena as escolhas feitas
let isMuted = true; // Controla o estado do som

const currentCategoryElement = document.getElementById('current-category');
const pausePlayBtn = document.getElementById('pause-play-btn');
const selectBtn = document.getElementById('select-btn');
const resetBtn = document.getElementById('reset-btn');
const muteBtn = document.getElementById('mute-btn');
const saveBtn = document.getElementById('save-btn');
const themeAudio = document.getElementById('theme-audio');
const selectAudio = document.getElementById('select-audio');
const winAudio = document.getElementById('win-audio');

// Inicia o loop da primeira categoria
startCategoryLoop();

function startCategoryLoop() {
    const category = categories[currentCategoryIndex];
    currentCategoryElement.textContent = category.label;
    selectBtn.disabled = true;
    isPaused = false;
    pausePlayBtn.textContent = 'Pausar';
    resetBtn.style.display = 'none'; // Esconde o botão de reiniciar
    saveBtn.style.display = 'none'; // Esconde o botão de salvar
    
    // Toca a música de fundo se não estiver silenciada
    if (!isMuted) {
        themeAudio.currentTime = 0; // Reseta para o início
        themeAudio.play().catch(error => console.error('Erro ao tocar música de fundo:', error));
    }
    
    // Define as opções para a categoria atual
    let options = category.options;

    // Lógica para cor_cabelo com if/else
    if (category.name === 'cor_cabelo') {
        const selectedCabelo = selectedOptions['cabelo'];
        if (selectedCabelo === 'imagens/cabelo/estilo1.png') {
            options = [
                'imagens/cor_cabelo/estilo1_loiro.png',
                'imagens/cor_cabelo/estilo1_ruivo.png',
                'imagens/cor_cabelo/estilo1_castanho.png'
            ];
        } else if (selectedCabelo === 'imagens/cabelo/estilo2.png') {
            options = [
                'imagens/cor_cabelo/estilo2_loiro.png',
                'imagens/cor_cabelo/estilo2_ruivo.png',
                'imagens/cor_cabelo/estilo2_castanho.png'
            ];
        } else if (selectedCabelo === 'imagens/cabelo/estilo3.png') {
            options = [
                'imagens/cor_cabelo/estilo3_loiro.png',
                'imagens/cor_cabelo/estilo3_ruivo.png',
                'imagens/cor_cabelo/estilo3_castanho.png'
            ];
        } else {
            console.error('Estilo de cabelo não reconhecido ou não selecionado:', selectedCabelo);
            // Pula a categoria cor_cabelo se não houver escolha válida
            currentCategoryIndex++;
            if (currentCategoryIndex < categories.length) {
                startCategoryLoop();
            } else {
                currentCategoryElement.textContent = 'Personagem concluído!';
                pausePlayBtn.disabled = true;
                selectBtn.disabled = true;
                resetBtn.style.display = 'inline-block';
                saveBtn.style.display = 'inline-block';
                if (!isMuted) {
                    themeAudio.pause();
                    winAudio.play().catch(error => console.error('Erro ao tocar som de vitória:', error));
                }
                clearInterval(intervalId);
            }
            return;
        }
    }

    // Verifica se há opções disponíveis
    if (options.length === 0) {
        console.warn('Nenhuma opção disponível para', category.name);
        currentCategoryIndex++;
        if (currentCategoryIndex < categories.length) {
            startCategoryLoop();
        } else {
            currentCategoryElement.textContent = 'Personagem concluído!';
            pausePlayBtn.disabled = true;
            selectBtn.disabled = true;
            resetBtn.style.display = 'inline-block';
            saveBtn.style.display = 'inline-block';
            if (!isMuted) {
                themeAudio.pause();
                winAudio.play().catch(error => console.error('Erro ao tocar som de vitória:', error));
            }
            clearInterval(intervalId);
        }
        return;
    }

    // Atualiza a camada atual
    updateLayer(category.name, options[currentOptionIndex]);
    
    // Inicia o loop
    intervalId = setInterval(() => {
        if (!isPaused) {
            currentOptionIndex = (currentOptionIndex + 1) % options.length;
            updateLayer(category.name, options[currentOptionIndex]);
        }
    }, 100); // Muda a cada 1/10 segundo
}

function updateLayer(layerId, src) {
    const layer = document.getElementById(`${layerId}-layer`);
    layer.src = src;
    layer.style.display = 'block';
}

pausePlayBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pausePlayBtn.textContent = isPaused ? 'Continuar' : 'Pausar';
    selectBtn.disabled = !isPaused;
});

selectBtn.addEventListener('click', () => {
    // Toca o som de seleção
    if (!isMuted) {
        selectAudio.currentTime = 0; // Reseta o áudio para o início
        selectAudio.play().catch(error => console.error('Erro ao tocar som de seleção:', error));
    }

    // Salva a escolha atual
    const category = categories[currentCategoryIndex];
    let options = category.options;

    // Reaplica a lógica para cor_cabelo
    if (category.name === 'cor_cabelo') {
        const selectedCabelo = selectedOptions['cabelo'];
        if (selectedCabelo === 'imagens/cabelo/estilo1.png') {
            options = [
                'imagens/cor_cabelo/estilo1_loiro.png',
                'imagens/cor_cabelo/estilo1_ruivo.png',
                'imagens/cor_cabelo/estilo1_castanho.png'
            ];
        } else if (selectedCabelo === 'imagens/cabelo/estilo2.png') {
            options = [
                'imagens/cor_cabelo/estilo2_loiro.png',
                'imagens/cor_cabelo/estilo2_ruivo.png',
                'imagens/cor_cabelo/estilo2_castanho.png'
            ];
        } else if (selectedCabelo === 'imagens/cabelo/estilo3.png') {
            options = [
                'imagens/cor_cabelo/estilo3_loiro.png',
                'imagens/cor_cabelo/estilo3_ruivo.png',
                'imagens/cor_cabelo/estilo3_castanho.png'
            ];
        } else {
            console.error('Estilo de cabelo não reconhecido ou não selecionado:', selectedCabelo);
            // Pula a categoria cor_cabelo
            currentCategoryIndex++;
            if (currentCategoryIndex < categories.length) {
                startCategoryLoop();
            } else {
                currentCategoryElement.textContent = 'Personagem concluído!';
                pausePlayBtn.disabled = true;
                selectBtn.disabled = true;
                resetBtn.style.display = 'inline-block';
                saveBtn.style.display = 'inline-block';
                if (!isMuted) {
                    themeAudio.pause();
                    winAudio.play().catch(error => console.error('Erro ao tocar som de vitória:', error));
                }
            }
            return;
        }
    }

    selectedOptions[category.name] = options[currentOptionIndex];

    // Fixa a escolha atual
    clearInterval(intervalId);
    
    // Avança para a próxima categoria
    currentCategoryIndex++;
    currentOptionIndex = 0;
    
    if (currentCategoryIndex < categories.length) {
        startCategoryLoop();
    } else {
        // Fim do jogo
        currentCategoryElement.textContent = 'Personagem concluído!';
        pausePlayBtn.disabled = true;
        selectBtn.disabled = true;
        resetBtn.style.display = 'inline-block';
        saveBtn.style.display = 'inline-block';
        if (!isMuted) {
            themeAudio.pause();
            winAudio.play().catch(error => console.error('Erro ao tocar som de vitória:', error));
        }
    }
});

// Evento para o botão de reiniciar
resetBtn.addEventListener('click', () => {
    // Reseta as variáveis
    currentCategoryIndex = 0;
    currentOptionIndex = 0;
    isPaused = false;
    selectedOptions = {};
    clearInterval(intervalId);
    
    // Reseta as camadas
    categories.forEach(category => {
        const layer = document.getElementById(`${category.name}-layer`);
        layer.src = '';
        layer.style.display = 'none';
    });
    
    // Reativa os botões e inicia o jogo
    pausePlayBtn.disabled = false;
    selectBtn.disabled = true;
    resetBtn.style.display = 'none';
    saveBtn.style.display = 'none';
    if (!isMuted) {
        winAudio.pause();
        themeAudio.currentTime = 0;
        themeAudio.play().catch(error => console.error('Erro ao tocar música de fundo:', error));
    }
    startCategoryLoop();
});

// Evento para o botão de silenciar
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? 'Ativar Som' : 'Silenciar';
    if (isMuted) {
        themeAudio.pause();
        winAudio.pause();
    } else {
        if (currentCategoryIndex < categories.length) {
            themeAudio.currentTime = 0;
            themeAudio.play().catch(error => console.error('Erro ao tocar música de fundo:', error));
        } else {
            winAudio.currentTime = 0;
            winAudio.play().catch(error => console.error('Erro ao tocar som de vitória:', error));
        }
    }
});

// Evento para o botão de salvar
saveBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const preview = document.querySelector('.character-preview');
    const layers = Array.from(document.querySelectorAll('.layer')).filter(layer => layer.src);

    // Define o tamanho do canvas com base na área de visualização
    canvas.width = preview.offsetWidth;
    canvas.height = preview.offsetHeight;

    // Desenha um fundo branco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Carrega e desenha cada camada
    let loadedImages = 0;
    layers.forEach(layer => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = layer.src;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            loadedImages++;
            if (loadedImages === layers.length) {
                // Faz o download da imagem
                const link = document.createElement('a');
                link.download = 'personagem.jpg';
                link.href = canvas.toDataURL('image/jpeg', 0.9);
                link.click();
            }
        };
        img.onerror = () => {
            console.error('Erro ao carregar imagem:', layer.src);
            loadedImages++;
            if (loadedImages === layers.length) {
                const link = document.createElement('a');
                link.download = 'personagem.jpg';
                link.href = canvas.toDataURL('image/jpeg', 0.9);
                link.click();
            }
        };
    });
});