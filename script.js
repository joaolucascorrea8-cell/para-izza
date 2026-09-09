// ==========================================
// MÚSICAS
// ==========================================

const musicaInicio =
    document.getElementById(
        "musicaInicio"
    );

const musicaMC =
    document.getElementById(
        "musicaMC"
    );

const musicaRomantica =
    document.getElementById(
        "musicaRomantica"
    );

const playerMCVV =
    document.getElementById(
        "playerMCVV"
    );

const statusMusica =
    document.getElementById(
        "statusMusica"
    );


// ==========================================
// CONFIGURAÇÃO DAS MÚSICAS
// ==========================================

// From The Start começa em 13 segundos
const TEMPO_INICIO =
    13;

// I Wanna Be Yours começa em 13 segundos
const TEMPO_ROMANTICA =
    13;


// volume da música inicial
const VOLUME_INICIO =
    0.05;

// volume da romântica
const VOLUME_ROMANTICA =
    0.55;


// controla fade
let fadeInicio =
    null;

let fadeRomantica =
    null;


// ==========================================
// SCROLL
// ==========================================

function irPara(id) {

    const elemento =
        document.getElementById(
            id
        );

    if (!elemento) {

        console.error(
            "Não achei:",
            id
        );

        return;
    }


    elemento.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ==========================================
// PRIMEIRO BOTÃO
//
// COMEÇA FROM THE START
// ==========================================

function comecarSite() {

    /*
        PRIMEIRO MUDA DE SEÇÃO.

        Assim, mesmo se o navegador
        der algum erro com o áudio,
        o botão continua funcionando.
    */

    irPara(
        "gatos"
    );


    if (!musicaInicio) {

        console.error(
            "inicio.mp3 não encontrado"
        );

        return;

    }


    // garante que as outras estão paradas

    if (musicaMC) {

        musicaMC.pause();

    }


    if (musicaRomantica) {

        musicaRomantica.pause();

    }


    // cancela fade anterior

    if (fadeInicio) {

        clearInterval(
            fadeInicio
        );

        fadeInicio =
            null;

    }


    /*
        Começa From The Start
        nos 13 segundos
    */

    try {

        musicaInicio.currentTime =
            TEMPO_INICIO;

        musicaInicio.volume =
            0;

    } catch (erro) {

        console.log(
            erro
        );

    }


    musicaInicio
        .play()
        .then(() => {

            let volume =
                0;


            fadeInicio =
                setInterval(
                    () => {

                        volume +=
                            0.02;


                        if (
                            volume >=
                            VOLUME_INICIO
                        ) {

                            volume =
                                VOLUME_INICIO;


                            clearInterval(
                                fadeInicio
                            );


                            fadeInicio =
                                null;

                        }


                        musicaInicio.volume =
                            volume;

                    },
                    100
                );

        })
        .catch(
            erro => {

                console.error(
                    "Erro ao tocar From The Start:",
                    erro
                );

            }
        );

}


// ==========================================
// LOOP FROM THE START
//
// TERMINOU?
// VOLTA PARA 13 SEGUNDOS
// ==========================================

if (musicaInicio) {

    musicaInicio.loop =
        false;


    musicaInicio.addEventListener(
        "ended",
        () => {

            try {

                musicaInicio.currentTime =
                    TEMPO_INICIO;

            } catch (erro) {

                console.log(
                    erro
                );

            }


            musicaInicio
                .play()
                .catch(
                    erro => {

                        console.log(
                            erro
                        );

                    }
                );

        }
    );

}


// ==========================================
// TEXTO DIGITANDO
// ==========================================

const titulo =
    "Izza... eu fiz uma coisinha pra você 💗";


const tituloElemento =
    document.getElementById(
        "tituloDigitando"
    );


const inicioSub =
    document.getElementById(
        "inicioSub"
    );


const inicioBotao =
    document.getElementById(
        "inicioBotao"
    );


let letraAtual =
    0;


function digitarTitulo() {

    if (!tituloElemento) {

        return;

    }


    if (
        letraAtual <
        titulo.length
    ) {

        tituloElemento.textContent +=
            titulo.charAt(
                letraAtual
            );


        letraAtual++;


        setTimeout(
            digitarTitulo,
            60
        );

    } else {


        setTimeout(
            () => {

                if (inicioSub) {

                    inicioSub
                        .classList
                        .add(
                            "mostrar"
                        );

                }

            },
            300
        );


        setTimeout(
            () => {

                if (inicioBotao) {

                    inicioBotao
                        .classList
                        .add(
                            "mostrar"
                        );

                }

            },
            700
        );

    }

}


// começa a digitação
setTimeout(
    digitarTitulo,
    500
);


// ==========================================
// BARRA DE PROGRESSO
// ==========================================

function atualizarProgresso() {

    const progresso =
        document.getElementById(
            "progresso"
        );


    if (!progresso) {

        return;

    }


    const scrollAtual =
        window.scrollY;


    const altura =
        document.documentElement.scrollHeight
        -
        window.innerHeight;


    const porcentagem =
        altura > 0
            ?
            (
                scrollAtual
                /
                altura
            )
            *
            100
            :
            0;


    progresso.style.width =
        porcentagem
        +
        "%";

}


window.addEventListener(
    "scroll",
    atualizarProgresso
);


// ==========================================
// CORAÇÕES DE FUNDO
// ==========================================

function criarCoracao() {

    const container =
        document.getElementById(
            "coracoes"
        );


    if (!container) {

        return;

    }


    const elemento =
        document.createElement(
            "div"
        );


    elemento.classList.add(
        "coracao-flutuante"
    );


    const tipos = [
        "💗",
        "💕",
        "💖",
        "🌸"
    ];


    elemento.innerText =
        tipos[
            Math.floor(
                Math.random()
                *
                tipos.length
            )
        ];


    elemento.style.left =
        Math.random()
        *
        100
        +
        "vw";


    elemento.style.fontSize =
        11
        +
        Math.random()
        *
        16
        +
        "px";


    const duracao =
        8
        +
        Math.random()
        *
        5;


    elemento.style.animationDuration =
        duracao
        +
        "s";


    container.appendChild(
        elemento
    );


    setTimeout(
        () => {

            elemento.remove();

        },
        duracao
        *
        1000
    );

}


setInterval(
    criarCoracao,
    1000
);


// ==========================================
// REVEAL DAS SEÇÕES
// ==========================================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "ativo"
                            );

                    }

                }
            );

        },
        {
            threshold: 0.16
        }
    );


document
    .querySelectorAll(
        ".reveal"
    )
    .forEach(
        elemento => {

            observer.observe(
                elemento
            );

        }
    );


// ==========================================
// CARDS
// ==========================================

const secaoCards =
    document.getElementById(
        "coisas"
    );


if (secaoCards) {

    const observerCards =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const cards =
                            document
                                .querySelectorAll(
                                    ".reveal-item"
                                );


                        cards.forEach(
                            (
                                card,
                                index
                            ) => {

                                setTimeout(
                                    () => {

                                        card
                                            .classList
                                            .add(
                                                "ativo"
                                            );

                                    },
                                    index
                                    *
                                    180
                                );

                            }
                        );

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    observerCards.observe(
        secaoCards
    );

}


// ==========================================
// VISUAL MC VV
// ==========================================

function mostrarMCTocando() {

    if (statusMusica) {

        statusMusica.innerText =
            "TOCANDO AGORA";

    }


    if (playerMCVV) {

        playerMCVV
            .classList
            .add(
                "tocando-musica"
            );

    }

}


function mostrarMCParado() {

    if (statusMusica) {

        statusMusica.innerText =
            "TOQUE PARA OUVIR";

    }


    if (playerMCVV) {

        playerMCVV
            .classList
            .remove(
                "tocando-musica"
            );

    }

}


// ==========================================
// CONTINUA 👀
//
// PARA FROM THE START
// COMEÇA MC VV
// ==========================================

function irParaMusicas() {

    /*
        PRIMEIRO SCROLL
    */

    irPara(
        "musicas"
    );


    // ===============================
    // PARA FROM THE START
    // ===============================

    if (musicaInicio) {

        if (fadeInicio) {

            clearInterval(
                fadeInicio
            );

            fadeInicio =
                null;

        }


        musicaInicio.pause();

    }


    // ===============================
    // PARA A ROMÂNTICA SE PRECISAR
    // ===============================

    if (musicaRomantica) {

        musicaRomantica.pause();

    }


    // ===============================
    // MC VV
    // ===============================

    if (!musicaMC) {

        console.error(
            "musica.mp3 não encontrado"
        );

        return;

    }


    try {

        musicaMC.currentTime =
            0;

        musicaMC.volume =
            0.30;

    } catch (erro) {

        console.log(
            erro
        );

    }


    musicaMC
        .play()
        .then(
            () => {

                mostrarMCTocando();

            }
        )
        .catch(
            erro => {

                console.error(
                    "Erro ao tocar MC VV:",
                    erro
                );


                mostrarMCParado();

            }
        );

}


// ==========================================
// CLICOU NO CD
//
// PAUSA / CONTINUA MC VV
// ==========================================

function tocarMCVV() {

    if (!musicaMC) {

        return;

    }


    if (
        !musicaMC.paused
    ) {

        musicaMC.pause();

        mostrarMCParado();

        return;

    }


    musicaMC
        .play()
        .then(
            () => {

                mostrarMCTocando();

            }
        )
        .catch(
            erro => {

                console.log(
                    erro
                );

            }
        );

}


// ==========================================
// QUANDO MC VV ACABAR
// ==========================================

if (musicaMC) {

    musicaMC.addEventListener(
        "ended",
        () => {

            mostrarMCParado();


            if (statusMusica) {

                statusMusica.innerText =
                    "TOCAR DE NOVO";

            }

        }
    );

}


// ==========================================
// TÁ... AGORA SÉRIO 💗
//
// PARA MC VV
// COMEÇA I WANNA BE YOURS
// ==========================================

function agoraSerio() {

    /*
        Vai para a carta primeiro.
    */

    irPara(
        "serio"
    );


    // ===============================
    // PARA FROM THE START
    // ===============================

    if (musicaInicio) {

        musicaInicio.pause();

    }


    // ===============================
    // PARA MC VV
    // ===============================

    if (musicaMC) {

        musicaMC.pause();


        try {

            musicaMC.currentTime =
                0;

        } catch (erro) {

            console.log(
                erro
            );

        }

    }


    mostrarMCParado();


    // ===============================
    // I WANNA BE YOURS
    // ===============================

    if (!musicaRomantica) {

        console.error(
            "romantica.mp3 não encontrada"
        );

        return;

    }


    // cancela fade anterior

    if (fadeRomantica) {

        clearInterval(
            fadeRomantica
        );


        fadeRomantica =
            null;

    }


    try {

        musicaRomantica.currentTime =
            TEMPO_ROMANTICA;


        musicaRomantica.volume =
            0;

    } catch (erro) {

        console.log(
            erro
        );

    }


    musicaRomantica
        .play()
        .then(
            () => {

                let volume =
                    0;


                fadeRomantica =
                    setInterval(
                        () => {

                            volume +=
                                0.04;


                            if (
                                volume >=
                                VOLUME_ROMANTICA
                            ) {

                                volume =
                                    VOLUME_ROMANTICA;


                                clearInterval(
                                    fadeRomantica
                                );


                                fadeRomantica =
                                    null;

                            }


                            musicaRomantica.volume =
                                volume;

                        },
                        100
                    );

            }
        )
        .catch(
            erro => {

                console.error(
                    "Erro ao tocar I Wanna Be Yours:",
                    erro
                );

            }
        );

}


// ==========================================
// LOOP I WANNA BE YOURS
//
// TERMINOU?
// VOLTA PARA 13 SEGUNDOS
// ==========================================

if (musicaRomantica) {

    musicaRomantica.loop =
        false;


    musicaRomantica.addEventListener(
        "ended",
        () => {

            try {

                musicaRomantica.currentTime =
                    TEMPO_ROMANTICA;

            } catch (erro) {

                console.log(
                    erro
                );

            }


            musicaRomantica
                .play()
                .catch(
                    erro => {

                        console.log(
                            erro
                        );

                    }
                );

        }
    );

}


// ==========================================
// BOTÃO NÃO
// ==========================================

const botaoNao =
    document.getElementById(
        "botaoNao"
    );


const area =
    document.getElementById(
        "areaBotoes"
    );


const contador =
    document.getElementById(
        "contadorNao"
    );


let fugas =
    0;


const maxFugas =
    25;


const frasesNao = [

    "não 😭",
    "tem certeza? 🤨",
    "Izza... 😭",
    "pensa bem",
    "olha os gatos 😭",
    "nem tenta KKKK",
    "esse botão corre",
    "vai no SIM 😭",
    "quase KKKKK",
    "errou de novo",
    "não desiste? 😭",
    "MEU DEUS KKKK",
    "para de tentar 😭",
    "olha o botão verde",
    "Izza por favor KKKK",
    "ele é rápido",
    "quase pegou 👀",
    "não foi dessa vez",
    "KKKKKKKKKK",
    "o SIM tá ali 👉",
    "persistente hein",
    "o gato preto julgou",
    "últimas tentativas 😭",
    "tá quase...",
    "tá bom 😭"

];


// ==========================================
// FAZER O NÃO FUGIR
// ==========================================

function fugirDoNao(
    evento
) {

    if (
        evento
    ) {

        evento.preventDefault();

    }


    if (
        fugas >=
        maxFugas
    ) {

        abrirModalNao();

        return;

    }


    fugas++;


    botaoNao.innerText =
        frasesNao[
            Math.min(
                fugas,
                frasesNao.length
                -
                1
            )
        ];


    if (contador) {

        contador.innerText =
            fugas < maxFugas

                ?

                `${fugas}/${maxFugas} tentativas KKKK`

                :

                "ok... agora ele parou 😭";

    }


    const larguraArea =
        area.clientWidth;


    const alturaArea =
        area.clientHeight;


    const larguraBotao =
        botaoNao.offsetWidth;


    const alturaBotao =
        botaoNao.offsetHeight;


    const margem =
        7;


    const maxX =
        larguraArea
        -
        larguraBotao
        -
        margem;


    const maxY =
        alturaArea
        -
        alturaBotao
        -
        margem;


    const x =
        margem
        +
        Math.random()
        *
        Math.max(
            maxX
            -
            margem,
            1
        );


    const y =
        margem
        +
        Math.random()
        *
        Math.max(
            maxY
            -
            margem,
            1
        );


    botaoNao.style.right =
        "auto";


    botaoNao.style.bottom =
        "auto";


    botaoNao.style.left =
        x
        +
        "px";


    botaoNao.style.top =
        y
        +
        "px";

}


// ==========================================
// EVENTOS BOTÃO NÃO
// ==========================================

if (
    botaoNao
    &&
    area
) {


    botaoNao.addEventListener(
        "mouseenter",
        evento => {

            if (
                fugas <
                maxFugas
            ) {

                fugirDoNao(
                    evento
                );

            }

        }
    );


    botaoNao.addEventListener(
        "touchstart",
        evento => {

            if (
                fugas <
                maxFugas
            ) {

                fugirDoNao(
                    evento
                );

            }

        },
        {
            passive: false
        }
    );


    botaoNao.addEventListener(
        "click",
        evento => {

            evento.preventDefault();


            if (
                fugas <
                maxFugas
            ) {

                fugirDoNao(
                    evento
                );

            } else {

                abrirModalNao();

            }

        }
    );

}


// ==========================================
// MODAL NÃO
// ==========================================

function abrirModalNao() {

    const modal =
        document.getElementById(
            "modalNao"
        );


    if (modal) {

        modal
            .classList
            .remove(
                "escondido"
            );

    }

}


function fecharModal() {

    const modal =
        document.getElementById(
            "modalNao"
        );


    if (modal) {

        modal
            .classList
            .add(
                "escondido"
            );

    }

}


// ==========================================
// BOTÃO SIM
// ==========================================

function aceitou() {

    const final =
        document.getElementById(
            "finalSim"
        );


    if (!final) {

        return;

    }


    final
        .classList
        .remove(
            "escondido"
        );


    setTimeout(
        () => {

            final.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );


    explosaoDeCoracoes();

}


// ==========================================
// EXPLOSÃO DE CORAÇÕES
// ==========================================

function explosaoDeCoracoes() {

    const emojis = [
        "💗",
        "💕",
        "💖",
        "💓",
        "🌸"
    ];


    for (
        let i = 0;
        i < 110;
        i++
    ) {

        setTimeout(
            () => {

                const coracao =
                    document.createElement(
                        "div"
                    );


                coracao.innerText =
                    emojis[
                        Math.floor(
                            Math.random()
                            *
                            emojis.length
                        )
                    ];


                coracao.style.position =
                    "fixed";


                coracao.style.left =
                    Math.random()
                    *
                    100
                    +
                    "vw";


                coracao.style.top =
                    Math.random()
                    *
                    100
                    +
                    "vh";


                coracao.style.fontSize =
                    15
                    +
                    Math.random()
                    *
                    32
                    +
                    "px";


                coracao.style.zIndex =
                    "5000";


                coracao.style.pointerEvents =
                    "none";


                coracao.style.animation =
                    "pulsar .5s infinite";


                document.body.appendChild(
                    coracao
                );


                setTimeout(
                    () => {

                        coracao.remove();

                    },
                    1900
                );

            },
            i
            *
            17
        );

    }

}
