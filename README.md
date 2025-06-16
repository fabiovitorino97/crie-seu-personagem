# Crie Seu Personagem

Bem-vindo ao **Crie Seu Personagem**, um jogo web interativo onde você pode personalizar um personagem escolhendo diferentes características, como gênero, cor dos olhos, boca, orelhas, cabelo, cor do cabelo e roupa. Este projeto foi desenvolvido com carinho para minha enteada se divertir, permitindo que ela crie personagens únicos de forma divertida e criativa.

**Os desenhos utilizados no jogo são de autoria do perfil @mochilovecraft no TikTok. Todos os direitos autorais das ilustrações pertencem ao criador.**

## Sobre o Projeto

Este é um jogo de personalização de personagens construído com HTML, CSS e JavaScript. Ele apresenta uma interface simples e intuitiva, com música de fundo, efeitos sonoros e a possibilidade de salvar o personagem criado como uma imagem JPG. O projeto é **open source**, e você é livre para usar, modificar e distribuir o código sob a licença MIT (veja a seção de Licença abaixo).

O jogo está em desenvolvimento ativo, e **futuras atualizações** trarão melhorias, como novas opções de personalização, ajustes na interface, e possíveis novos recursos para tornar a experiência ainda mais divertida!

## Funcionalidades

- **Personalização de Personagem**:
  - Escolha entre diferentes opções para:
    - Gênero (`masculino.png`, `feminino.png`, `your_choice.png`)
    - Cor dos olhos (`cor1.png`, `cor2.png`, `cor3.png`)
    - Boca (`1.png`, `2.png`, `3.png`)
    - Orelhas (`1.png`, `2.png`, `3.png`)
    - Cabelo (`estilo1.png`, `estilo2.png`, `estilo3.png`)
    - Cor do cabelo (depende do estilo escolhido, ex.: `estilo1_loiro.png`, `estilo1_ruivo.png`, `estilo1_castanho.png`)
    - Roupa (`1.png`, `2.png`, `3.png`, `4.png`)
  - As opções são exibidas em um loop automático, que pode ser pausado para seleção.

- **Controles Interativos**:
  - **Pausar/Continuar**: Pausa o loop de opções para facilitar a escolha.
  - **Selecionar**: Confirma a escolha atual e avança para a próxima categoria.
  - **Reiniciar**: Reseta o jogo ao final, limpando todas as escolhas e reiniciando do início.
  - **Silenciar/Ativar Som**: Liga ou desliga a música de fundo e efeitos sonoros.
  - **Salvar Imagem**: Faz download do personagem criado como `personagem.jpg` ao final do jogo.

- **Áudio**:
  - Música de fundo (`theme.mp3`) toca em loop durante o jogo.
  - Efeito sonoro (`select.mp3`) é reproduzido ao clicar em "Selecionar".
  - Som de vitória (`win.mp3`) toca quando o jogo termina.
  - Botão de silenciar controla todos os sons.

- **Download da Imagem**:
  - Ao final do jogo, um botão "Salvar Imagem" permite baixar o personagem como um arquivo JPG com fundo branco, combinando todas as camadas selecionadas.

## Estrutura do Projeto
```
├── css/
│   └── styles.css           # Estilos da interface
├── imagens/                 # Imagens dos assets (direitos autorais: @mochilovecraft
)
│   ├── genero/
│   ├── cor_olhos/
│   ├── boca/
│   ├── orelhas/
│   ├── cabelo/
│   ├── cor_cabelo/
│   └── roupa/
├── songs/                   # Arquivos de áudio
│   ├── theme.mp3            # Música de fundo
│   ├── select.mp3           # Som de seleção
│   └── win.mp3              # Som de vitória
├── js/
│   └── scripts.js           # Lógica do jogo
├── index.html               # Página principal
├── README.md                # Documentação do projeto
└── LICENSE                  # Licença MIT
```

## Como Executar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/cr ie-seu-personagem.git
   cd crie-seu-personagem
   ```

2. **Execute com um servidor local**:
Use uma extensão como Live Server no VS Code ou um servidor local (ex.: python -m http.server) para evitar problemas de CORS ao carregar imagens e áudios.

Abra o index.html no navegador.

3. **Jogue**:
Siga as instruções na tela para personalizar seu personagem.

Use os botões "Pausar", "Selecionar", "Silenciar", "Reiniciar" e "Salvar Imagem" conforme necessário.

## Tecnologias Utilizadas
HTML5: Estrutura da página.

CSS3: Estilização da interface e camadas de imagens.

JavaScript: Lógica do jogo, manipulação de DOM, áudio e canvas para salvar imagens.

Canvas API: Combinação das camadas para gerar a imagem JPG.

HTML5 Audio: Reprodução de música e efeitos sonoros.

## Futuras Melhorias
Planejamos adicionar:
Mais opções de personalização (ex.: novos estilos de cabelo, roupas, acessórios).

Suporte para fundo transparente nas imagens salvas.

Animações para transições entre categorias.

Interface ajustável para diferentes tamanhos de tela.

Opção de compartilhar o personagem criado nas redes sociais.

Contribuições são bem-vindas! Veja a seção de Contribuição abaixo.

## Direitos Autorais
Desenhos: Todos os desenhos utilizados no jogo são de autoria do perfil @mochilovecraft
 no TikTok. Os direitos autorais pertencem exclusivamente ao criador. Este projeto utiliza os desenhos com permissão para fins não comerciais.

Código: O código é open source sob a licença MIT.

## Licença
Este projeto é licenciado sob a Licença MIT. Você é livre para usar, copiar, modificar e distribuir o código, desde que mantenha a atribuição de autoria e a menção aos direitos autorais dos desenhos.
Veja o arquivo LICENSE para mais detalhes.
Contribuição
Quer contribuir? Fique à vontade para abrir issues ou pull requests! Algumas ideias:
Correção de bugs.

Novas funcionalidades (ex.: mais categorias de personalização).

Melhoria da interface ou performance.

Fork o repositório.

Crie uma branch (git checkout -b feature/nova-funcionalidade).

Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade').

Push para a branch (git push origin feature/nova-funcionalidade).

Abra um Pull Request.

## Agradecimentos
À minha enteada, por inspirar este projeto com sua criatividade.

Ao @mochilovecraft, pelos incríveis desenhos que tornam o jogo visualmente encantador.

Divirta-se criando seus personagens! 

