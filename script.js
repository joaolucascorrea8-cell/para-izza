// ==========================================
// FUNÇÃO DE SCROLL
// ==========================================

window.irPara = function (id) {
    const elemento = document.getElementById(id);

    if (!elemento) {
        console.error("Seção não encontrada:", id);
        return;
    }

    elemento.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
};


// ==========================================
// INÍCIO - TEXTO DIGITANDO
// ==========================================

const titulo = "Izza... eu fiz uma coisinha pra você 💗";

let letraAtual = 0;

function digitarTitulo() {
    const tituloElemento = document.getElementById("tituloDigitando");
    const inicioSub = document.getElementById("inicioSub");
    const inicioBotao = document.getElementById("inicioBotao");

    if (!tituloElemento) return;

    if (letraAtual < titulo.length) {
        tituloElemento.textContent += titulo.charAt(letraAtual);
        letraAtual++;

        setTimeout(digitarTitulo, 60);
    } else {
        setTimeout(() => {
            if (inicioSub) {
                inicioSub.classList.add("mostrar");
            }
        }, 300);

        setTimeout(() => {
            if (inicioBotao) {
                inicioBotao.classList.add("mostrar");
            }
        }, 700);
    }
}


// ==========================================
// BARRA DE PROGRESSO
// ==========================================

function atualizarProgresso() {
    const progresso = document.getElementById("progresso");

    if (!progresso) return;

    const scrollAtual = window.scrollY;

    const altura =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const porcentagem =
        altura > 0
            ? (scrollAtual / altura) * 100
            : 0;

    progresso.style.width =
        porcentagem + "%";
}


// ==========================================
// CORAÇÕES FLUTUANTES
// ==========================================

function criarCoracao() {
    const container =
        document.getElementById("coracoes");

    if (!container) return;

    const elemento =
        document.createElement("div");

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
                Math.random() *
                tipos.length
            )
        ];

    elemento.style.left =
        Math.random() * 100 + "vw";

    elemento.style.fontSize =
        11 +
        Math.random() * 16 +
        "px";

    const duracao =
        8 +
        Math.random() * 5;

    elemento.style.animationDuration =
        duracao + "s";

    container.appendChild(elemento);

    setTimeout(() => {
        elemento.remove();
    }, duracao * 1000);
}


// ==========================================
// VARIÁVEIS DAS MÚSICAS
// ==========================================

let musicaMC;
let musicaRomantica;
let playerMCVV;
let statusMusica;

let mcTocando = false;
let fadeRomantica = null;


// ==========================================
// VISUAL DO PLAYER
// ==========================================

function mostrarMCTocando() {
    mcTocando = true;

    if (statusMusica) {
        statusMusica.innerText =
            "TOCANDO AGORA";
    }

    if (playerMCVV) {
        playerMCVV.classList.add(
            "tocando-musica"
        );
    }
}


function mostrarMCParado() {
    mcTocando = false;

    if (statusMusica) {
        statusMusica.innerText =
            "TOQUE PARA OUVIR";
    }

    if (playerMCVV) {
        playerMCVV.classList.remove(
            "tocando-musica"
        );
    }
}


// ==========================================
// CONTINUA 👀
// VAI PRO CD E COMEÇA MC VV
// ==========================================

window.irParaMusicas = function () {
    const secaoMusicas =
        document.getElementById("musicas");

    if (!secaoMusicas) {
        console.error(
            "Não achei a seção #musicas"
        );
        return;
    }

    // primeiro faz o scroll
    window.irPara("musicas");

    if (!musicaMC) {
        console.error(
            "Não achei o áudio musicaMC"
        );
        return;
    }

    // para a romântica caso esteja tocando
    if (musicaRomantica) {
        musicaRomantica.pause();
    }

    // reinicia MC VV
    try {
        musicaMC.currentTime = 0;
        musicaMC.volume = 1;
    } catch (erro) {
        console.log(erro);
    }

    const tentativa =
        musicaMC.play();

    if (
        tentativa &&
        typeof tentativa.then === "function"
    ) {
        tentativa
            .then(() => {
                mostrarMCTocando();
            })
            .catch((erro) => {
                console.log(
                    "Áudio bloqueado:",
                    erro
                );

                mostrarMCParado();
            });
    }
};


// ==========================================
// CLICAR NO PLAYER MC VV
// ==========================================

window.tocarMCVV = function () {
    if (!musicaMC) return;

    if (!musicaMC.paused) {
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
        .catch((erro) => {
            console.log(erro);

            alert(
                "não consegui tocar a música 😭"
            );
        });
};


// ==========================================
// TÁ... AGORA SÉRIO 💗
// PARA MC VV E COMEÇA ROMÂNTICA
// ==========================================

window.agoraSerio = function () {
    /*
        O SCROLL ACONTECE SEMPRE,
        MESMO QUE O ÁUDIO DÊ ALGUM ERRO.
    */

    window.irPara("serio");

    // Para MC VV
    if (musicaMC) {
        musicaMC.pause();

        try {
            musicaMC.currentTime = 0;
        } catch (erro) {
            console.log(erro);
        }
    }

    mostrarMCParado();

    if (!musicaRomantica) {
        console.error(
            "Não achei musicaRomantica"
        );

        return;
    }

    // cancela fade antigo
    if (fadeRomantica) {
        clearInterval(
            fadeRomantica
        );

        fadeRomantica = null;
    }

    /*
        I WANNA BE YOURS
        começa em 13 segundos
    */

    try {
        musicaRomantica.currentTime = 13;
        musicaRomantica.volume = 0;
    } catch (erro) {
        console.log(erro);
    }

    const tentativa =
        musicaRomantica.play();

    if (
        tentativa &&
        typeof tentativa.then === "function"
    ) {
        tentativa
            .then(() => {
                let volume = 0;

                fadeRomantica =
                    setInterval(() => {
                        volume += 0.04;

                        if (volume >= 0.55) {
                            volume = 0.55;

                            clearInterval(
                                fadeRomantica
                            );

                            fadeRomantica = null;
                        }

                        musicaRomantica.volume =
                            volume;
                    }, 100);
            })
            .catch((erro) => {
                console.log(
                    "Romântica bloqueada:",
                    erro
                );
            });
    }
};


// ==========================================
// MODAL DO NÃO
// ==========================================

window.abrirModalNao = function () {
    const modal =
        document.getElementById(
            "modalNao"
        );

    if (modal) {
        modal.classList.remove(
            "escondido"
        );
    }
};


window.fecharModal = function () {
    const modal =
        document.getElementById(
            "modalNao"
        );

    if (modal) {
        modal.classList.add(
            "escondido"
        );
    }
};


// ==========================================
// SIM
// ==========================================

window.aceitou = function () {
    const final =
        document.getElementById(
            "finalSim"
        );

    if (!final) return;

    final.classList.remove(
        "escondido"
    );

    setTimeout(() => {
        final.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);

    explosaoDeCoracoes();
};


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

    for (let i = 0; i < 110; i++) {
        setTimeout(() => {
            const coracao =
                document.createElement(
                    "div"
                );

            coracao.innerText =
                emojis[
                    Math.floor(
                        Math.random() *
                        emojis.length
                    )
                ];

            coracao.style.position =
                "fixed";

            coracao.style.left =
                Math.random() *
                100 +
                "vw";

            coracao.style.top =
                Math.random() *
                100 +
                "vh";

            coracao.style.fontSize =
                15 +
                Math.random() *
                32 +
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

            setTimeout(() => {
                coracao.remove();
            }, 1900);
        }, i * 17);
    }
}


// ==========================================
// QUANDO A PÁGINA CARREGAR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {
        // músicas
        musicaMC =
            document.getElementById(
                "musicaMC"
            );

        musicaRomantica =
            document.getElementById(
                "musicaRomantica"
            );

        playerMCVV =
            document.getElementById(
                "playerMCVV"
            );

        statusMusica =
            document.getElementById(
                "statusMusica"
            );


        // ======================================
        // TEXTO INICIAL
        // ======================================

        setTimeout(
            digitarTitulo,
            500
        );


        // ======================================
        // REVEAL
        // ======================================

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


        // ======================================
        // CARDS
        // ======================================

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
                                            index *
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


        // ======================================
        // QUANDO MC VV ACABAR
        // ======================================

        if (musicaMC) {
            musicaMC.addEventListener(
                "ended",
                () => {
                    mcTocando = false;

                    if (statusMusica) {
                        statusMusica.innerText =
                            "TOCAR DE NOVO";
                    }

                    if (playerMCVV) {
                        playerMCVV
                            .classList
                            .remove(
                                "tocando-musica"
                            );
                    }
                }
            );
        }


        // ======================================
        // LOOP DA ROMÂNTICA
        // VOLTA PRA 13 SEGUNDOS
        // ======================================

        if (musicaRomantica) {
            /*
                Se o HTML ainda estiver com "loop",
                removemos via JS para poder
                controlar onde ela recomeça.
            */

            musicaRomantica.loop =
                false;

            musicaRomantica.addEventListener(
                "ended",
                () => {
                    try {
                        musicaRomantica.currentTime =
                            13;
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


        // ======================================
        // BOTÃO NÃO
        // ======================================

        configurarBotaoNao();
    }
);


// ==========================================
// SCROLL
// ==========================================

window.addEventListener(
    "scroll",
    atualizarProgresso
);


// ==========================================
// CORAÇÕES DE FUNDO
// ==========================================

setInterval(
    criarCoracao,
    1000
);


// ==========================================
// CONFIGURAR BOTÃO NÃO
// ==========================================

function configurarBotaoNao() {
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

    if (
        !botaoNao ||
        !area
    ) {
        return;
    }

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


    function fugirDoNao(evento) {
        if (evento) {
            evento.preventDefault();
        }

        if (
            fugas >=
            maxFugas
        ) {
            window.abrirModalNao();
            return;
        }

        fugas++;

        botaoNao.innerText =
            frasesNao[
                Math.min(
                    fugas,
                    frasesNao.length -
                        1
                )
            ];

        if (contador) {
            contador.innerText =
                fugas <
                maxFugas
                    ? `${fugas}/${maxFugas} tentativas KKKK`
                    : "ok... agora ele parou 😭";
        }

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
            larguraArea -
            larguraBotao -
            margem;

        const maxY =
            alturaArea -
            alturaBotao -
            margem;

        const x =
            margem +
            Math.random() *
                Math.max(
                    maxX -
                        margem,
                    1
                );

        const y =
            margem +
            Math.random() *
                Math.max(
                    maxY -
                        margem,
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
                window.abrirModalNao();
            }
        }
    );
}
