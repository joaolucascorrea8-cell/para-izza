// ==========================================
// SCROLL
// ==========================================

function irPara(id) {

    const elemento =
        document.getElementById(id);

    if (elemento) {

        elemento.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ==========================================
// TEXTO DO INÍCIO
// ==========================================

const titulo =
    "Izza... eu fiz uma coisinha pra você 💗";

const tituloElemento =
    document.getElementById("tituloDigitando");

const inicioSub =
    document.getElementById("inicioSub");

const inicioBotao =
    document.getElementById("inicioBotao");

let letraAtual = 0;


function digitarTitulo() {

    if (letraAtual < titulo.length) {

        tituloElemento.textContent +=
            titulo.charAt(letraAtual);

        letraAtual++;

        setTimeout(
            digitarTitulo,
            60
        );

    } else {

        setTimeout(() => {

            inicioSub.classList.add(
                "mostrar"
            );

        }, 300);


        setTimeout(() => {

            inicioBotao.classList.add(
                "mostrar"
            );

        }, 700);

    }

}


window.addEventListener(
    "load",
    () => {

        setTimeout(
            digitarTitulo,
            500
        );

    }
);


// ==========================================
// BARRA DE PROGRESSO
// ==========================================

window.addEventListener(
    "scroll",
    atualizarProgresso
);


function atualizarProgresso() {

    const scrollAtual =
        window.scrollY;

    const altura =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const porcentagem =
        altura > 0
            ? scrollAtual / altura * 100
            : 0;


    document.getElementById(
        "progresso"
    ).style.width =
        porcentagem + "%";

}


// ==========================================
// CORAÇÕES FLUTUANTES
// ==========================================

function criarCoracao() {

    const container =
        document.getElementById(
            "coracoes"
        );

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
                * tipos.length
            )
        ];


    elemento.style.left =
        Math.random()
        * 100
        + "vw";


    elemento.style.fontSize =
        11
        + Math.random()
        * 16
        + "px";


    const duracao =
        8
        + Math.random()
        * 5;


    elemento.style.animationDuration =
        duracao + "s";


    container.appendChild(
        elemento
    );


    setTimeout(
        () => elemento.remove(),
        duracao * 1000
    );

}


setInterval(
    criarCoracao,
    1000
);


// ==========================================
// REVEAL
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
    .querySelectorAll(".reveal")
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

const observerCards =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const cards =
                            document
                                .querySelectorAll(
                                    ".reveal-item"
                                );


                        cards.forEach(
                            (card, index) => {

                                setTimeout(
                                    () => {

                                        card
                                            .classList
                                            .add(
                                                "ativo"
                                            );

                                    },
                                    index * 180
                                );

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.1
        }
    );


const secaoCards =
    document.getElementById(
        "coisas"
    );


if (secaoCards) {

    observerCards.observe(
        secaoCards
    );

}


// ==========================================
// MÚSICAS
// ==========================================

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


let mcTocando = false;

let fadeRomantica = null;


// ==========================================
// FUNÇÃO VISUAL DO PLAYER
// ==========================================

function mostrarMCTocando() {

    mcTocando = true;

    statusMusica.innerText =
        "TOCANDO AGORA";

    playerMCVV
        .classList
        .add(
            "tocando-musica"
        );

}


function mostrarMCParado() {

    mcTocando = false;

    statusMusica.innerText =
        "TOQUE PARA OUVIR";

    playerMCVV
        .classList
        .remove(
            "tocando-musica"
        );

}


// ==========================================
// BOTÃO "CONTINUA 👀"
// ABRE A PARTE DO CD E TOCA MC VV
// ==========================================

function irParaMusicas() {

    /*
        Primeiro tentamos tocar o áudio
        DIRETAMENTE no clique.

        Isso é importante principalmente
        no celular, porque navegadores podem
        bloquear áudio iniciado depois de
        um setTimeout.
    */

    musicaRomantica.pause();

    musicaMC.currentTime = 0;

    musicaMC.volume = 1;


    const tentativa =
        musicaMC.play();


    if (
        tentativa !== undefined
    ) {

        tentativa
            .then(() => {

                mostrarMCTocando();

            })
            .catch(() => {

                /*
                    Se algum navegador bloquear,
                    o site continua funcionando.

                    A pessoa poderá tocar
                    diretamente no player.
                */

                mostrarMCParado();

            });

    }


    /*
        Depois mandamos a página
        para o CD.
    */

    irPara(
        "musicas"
    );

}


// ==========================================
// CLICAR NO PLAYER
// ==========================================

function tocarMCVV() {

    /*
        Se estiver tocando:
        pausa.
    */

    if (
        !musicaMC.paused
    ) {

        musicaMC.pause();

        mostrarMCParado();

        return;

    }


    /*
        Se estiver parado:
        toca novamente.
    */

    musicaRomantica.pause();


    musicaMC
        .play()
        .then(() => {

            mostrarMCTocando();

        })
        .catch(() => {

            alert(
                "não consegui tocar a música 😭"
            );

        });

}


// ==========================================
// QUANDO O TRECHO DO MC VV TERMINAR
// ==========================================

musicaMC.addEventListener(
    "ended",
    () => {

        mcTocando = false;


        statusMusica.innerText =
            "TOCAR DE NOVO";


        playerMCVV
            .classList
            .remove(
                "tocando-musica"
            );

    }
);


// ==========================================
// "TÁ... AGORA SÉRIO"
// ==========================================

function agoraSerio() {

    /*
        Para completamente o MC VV.
    */

    musicaMC.pause();

    musicaMC.currentTime = 0;

    mostrarMCParado();


    /*
        Cancela algum fade anterior.
    */

    if (
        fadeRomantica
    ) {

        clearInterval(
            fadeRomantica
        );

        fadeRomantica = null;

    }


    /*
        A romântica começa no início.
    */

    musicaRomantica.currentTime = 13;

    musicaRomantica.volume = 0;

    musicaRomantica.addEventListener("ended", () => {

    musicaRomantica.currentTime = 13;

    musicaRomantica.play();

});


    /*
        Como essa função acontece
        diretamente no clique do botão,
        o navegador normalmente permite
        iniciar o áudio.
    */

    const tentativa =
        musicaRomantica.play();


    if (
        tentativa !== undefined
    ) {

        tentativa
            .then(() => {

                /*
                    FADE-IN

                    Vai aumentando o volume
                    aos poucos até 55%.
                */

                let volume = 0;


                fadeRomantica =
                    setInterval(
                        () => {

                            volume += 0.04;


                            if (
                                volume >= 0.55
                            ) {

                                volume = 0.55;

                                clearInterval(
                                    fadeRomantica
                                );

                                fadeRomantica = null;

                            }


                            musicaRomantica.volume =
                                volume;

                        },
                        100
                    );

            })
            .catch(() => {

                console.log(
                    "O navegador bloqueou a música romântica."
                );

            });

    }


    /*
        Desce para a carta.
    */

    irPara(
        "serio"
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


let fugas = 0;

const maxFugas = 25;


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

function fugirDoNao(evento) {

    if (evento) {

        evento.preventDefault();

    }


    /*
        Depois das 25 fugas,
        o botão funciona normalmente.
    */

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
                frasesNao.length - 1
            )
        ];


    contador.innerText =
        fugas < maxFugas

            ? `${fugas}/${maxFugas} tentativas KKKK`

            : "ok... agora ele parou 😭";


    const larguraArea =
        area.clientWidth;

    const alturaArea =
        area.clientHeight;

    const larguraBotao =
        botaoNao.offsetWidth;

    const alturaBotao =
        botaoNao.offsetHeight;


    const margem = 7;


    const maxX =
        larguraArea
        - larguraBotao
        - margem;


    const maxY =
        alturaArea
        - alturaBotao
        - margem;


    const x =
        margem
        + Math.random()
        * Math.max(
            maxX - margem,
            1
        );


    const y =
        margem
        + Math.random()
        * Math.max(
            maxY - margem,
            1
        );


    botaoNao.style.right =
        "auto";

    botaoNao.style.bottom =
        "auto";

    botaoNao.style.left =
        x + "px";

    botaoNao.style.top =
        y + "px";

}


// ==========================================
// EVENTOS DO NÃO
// ==========================================

botaoNao.addEventListener(
    "mouseenter",
    event => {

        if (
            fugas <
            maxFugas
        ) {

            fugirDoNao(
                event
            );

        }

    }
);


botaoNao.addEventListener(
    "touchstart",
    event => {

        if (
            fugas <
            maxFugas
        ) {

            fugirDoNao(
                event
            );

        }

    },
    {
        passive: false
    }
);


botaoNao.addEventListener(
    "click",
    event => {

        event.preventDefault();


        if (
            fugas <
            maxFugas
        ) {

            fugirDoNao(
                event
            );

        } else {

            abrirModalNao();

        }

    }
);


// ==========================================
// MODAL DO NÃO
// ==========================================

function abrirModalNao() {

    document
        .getElementById(
            "modalNao"
        )
        .classList
        .remove(
            "escondido"
        );

}


function fecharModal() {

    document
        .getElementById(
            "modalNao"
        )
        .classList
        .add(
            "escondido"
        );

}


// ==========================================
// SIM
// ==========================================

function aceitou() {

    const final =
        document.getElementById(
            "finalSim"
        );


    final
        .classList
        .remove(
            "escondido"
        );


    setTimeout(
        () => {

            final.scrollIntoView({
                behavior: "smooth"
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
                            * emojis.length
                        )
                    ];


                coracao.style.position =
                    "fixed";


                coracao.style.left =
                    Math.random()
                    * 100
                    + "vw";


                coracao.style.top =
                    Math.random()
                    * 100
                    + "vh";


                coracao.style.fontSize =
                    15
                    + Math.random()
                    * 32
                    + "px";


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
                    () => coracao.remove(),
                    1900
                );

            },
            i * 17
        );

    }

}
