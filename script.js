// ==========================================
// ELEMENTOS DE ÁUDIO
// ==========================================

const musicaMC =
    document.getElementById("musicaMC");

const musicaRomantica =
    document.getElementById("musicaRomantica");

const playerMCVV =
    document.getElementById("playerMCVV");

const statusMusica =
    document.getElementById("statusMusica");


// ==========================================
// SCROLL
// ==========================================

function irPara(id) {

    const elemento =
        document.getElementById(id);

    if (!elemento) {
        console.error(
            "Não encontrei a seção:",
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

let letraAtual = 0;


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

        setTimeout(() => {

            if (inicioSub) {
                inicioSub
                    .classList
                    .add(
                        "mostrar"
                    );
            }

        }, 300);


        setTimeout(() => {

            if (inicioBotao) {
                inicioBotao
                    .classList
                    .add(
                        "mostrar"
                    );
            }

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
// PROGRESSO
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
                scrollAtual /
                altura
            ) * 100
            :
            0;

    progresso.style.width =
        porcentagem + "%";
}


window.addEventListener(
    "scroll",
    atualizarProgresso
);


// ==========================================
// CORAÇÕES FLUTUANTES
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
// VISUAL DO MC VV
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
// CLICOU:
// 1. MC VV começa
// 2. desce pro CD
// ==========================================

function irParaMusicas() {

    /*
        O scroll funciona
        independentemente do áudio.
    */

    irPara(
        "musicas"
    );


    if (!musicaMC) {

        console.error(
            "musicaMC não encontrada"
        );

        return;
    }


    /*
        Se a romântica estiver tocando,
        para.
    */

    if (musicaRomantica) {

        musicaRomantica.pause();

    }


    /*
        MC VV começa do início
        do arquivo musica.mp3.
    */

    musicaMC.pause();

    musicaMC.currentTime = 0;

    musicaMC.volume = 1;


    musicaMC
        .play()
        .then(() => {

            mostrarMCTocando();

        })
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
// CLICAR NO CD
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


    if (musicaRomantica) {

        musicaRomantica.pause();

    }


    musicaMC
        .play()
        .then(() => {

            mostrarMCTocando();

        })
        .catch(
            erro => {

                console.error(
                    "Erro ao tocar:",
                    erro
                );

            }
        );

}


// ==========================================
// QUANDO MC VV TERMINAR
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
// AGORA SÉRIO 💗
//
// 1. para MC VV
// 2. começa I WANNA BE YOURS em 0:13
// 3. fade-in
// 4. vai pra carta
// ==========================================

let fadeRomantica = null;


function agoraSerio() {

    /*
        PRIMEIRO VAI PRA CARTA.

        Assim mesmo se o áudio der erro,
        o botão continua funcionando.
    */

    irPara(
        "serio"
    );


    // PARA MC VV

    if (musicaMC) {

        musicaMC.pause();

        musicaMC.currentTime =
            0;

    }


    mostrarMCParado();


    // CONFERE ROMÂNTICA

    if (!musicaRomantica) {

        console.error(
            "musicaRomantica não encontrada"
        );

        return;
    }


    // CANCELA FADE ANTIGO

    if (fadeRomantica) {

        clearInterval(
            fadeRomantica
        );

        fadeRomantica =
            null;

    }


    /*
        I WANNA BE YOURS
        começa aos 13 segundos.
    */

    musicaRomantica.pause();

    musicaRomantica.currentTime =
        13;

    musicaRomantica.volume =
        0;


    musicaRomantica
        .play()
        .then(() => {

            let volume =
                0;


            fadeRomantica =
                setInterval(
                    () => {

                        volume +=
                            0.04;


                        if (
                            volume >=
                            0.55
                        ) {

                            volume =
                                0.55;


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

        })
        .catch(
            erro => {

                console.error(
                    "Erro na música romântica:",
                    erro
                );

            }
        );

}


// ==========================================
// LOOP DA ROMÂNTICA
//
// TERMINOU?
// VOLTA PRA 0:13
// ==========================================

if (musicaRomantica) {

    musicaRomantica.loop =
        false;


    musicaRomantica.addEventListener(
        "ended",
        () => {

            musicaRomantica.currentTime =
                13;


            musicaRomantica
                .play()
                .catch(
                    erro => {

                        console.error(
                            "Erro ao repetir:",
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
                frasesNao.length - 1
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
            maxX - margem,
            1
        );


    const y =
        margem
        +
        Math.random()
        *
        Math.max(
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

if (
    botaoNao &&
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
// SIM
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
// EXPLOSÃO FINAL
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
            i * 17
        );

    }

}
