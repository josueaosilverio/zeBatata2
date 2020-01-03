var intteclas, arrayTeclas = [], tiroativo = false, tiroativoBoss = false, intTiro, atualiza, intTiroBoss, timerJogo, vidas_boss = 10;
var pontuacaolvl1 = sessionStorage["pontuacao_lvl1"], pontuacaolvl2 = sessionStorage["pontuacao_lvl2"], death = false, animationEnded = false;
var contKills = 0, pontuacaolvlboss = 0, pontuacaoTotal = 0, countTime = 0, tabela = [];
var vidas = sessionStorage["vidas"];


//Sound Variables
var arraySounds = [];
var laser_gun = new Audio("sounds/laser_gun.mp3");
var ze_morte = new Audio("sounds/explosion_inimigo.mp3");
var iminigo_morte = new Audio("sounds/explosion_inimigo.mp3");
var som_fundo = new Audio("sounds/boss_level/som_boss.mp3");
som_fundo.loop = true;
var som_pausa = new Audio("sounds/som_pausa.mp3");
som_pausa.loop = true;

arraySounds[0] = laser_gun;
arraySounds[1] = ze_morte;
arraySounds[2] = iminigo_morte;


//Keyboard Variables
var intteclas_pausa, arrayTeclas_pausa = [], facing_pausa = "right", zePausaMov, button, estadoPremir = false;
var teclaCima = sessionStorage["result_saltar"];
var teclaDireita = sessionStorage["result_frente"];
var teclaEsquerda = sessionStorage["result_tras"];
var teclaBaixo = sessionStorage["result_baixo"];
var teclaTiro = sessionStorage["result_shoot"];
var teclaPausa = sessionStorage["result_pausa"];

som_fundo.volume = sessionStorage["volumeFundo"];
som_pausa.volume = sessionStorage["volumeFundo"];
volume_slider_efeitos = parseInt(sessionStorage["volumeSliderEfeitos"]);
volume_slider_fundo = parseInt(sessionStorage["volumeSliderFundo"]);

tabela[0] = ["-", "-"];
tabela[1] = ["-", "-"];
tabela[2] = ["-", "-"];
tabela[3] = ["-", "-"];
tabela[4] = ["-", "-"];
tabela[5] = ["-", "-"];
tabela[6] = ["-", "-"];
tabela[7] = ["-", "-"];
tabela[8] = ["-", "-"];
tabela[9] = ["-", "-"];
escolhaComandos();

/************************************************************************************************************************************/

var arrow_keys_handler = function (e) {
    switch (e.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40: // Arrow keys
        case 32:
            e.preventDefault();
            break; // Space
        default:
            break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);

window.onload = function () {
    document.getElementById("main_boss").style.position = "absolute";
    document.getElementById("main_boss").style.left = Math.round((innerWidth - 1100) / 2) + "px";
    document.getElementById("main_boss").style.top = Math.round((innerHeight - 600) / 2) + "px";
    for (var i = 1; i < 5; i++) {
        document.getElementById("nave_inimigo" + i).style.position = "absolute";
        document.getElementById("nave_inimigo" + i).style.left = "-100px";
        document.getElementById("nave_inimigo" + i).style.top = "-100px";
    }
    document.getElementById("lifes_adolfo").src = "images/boss_level/lifes_adolfo/" + vidas_boss + ".png";
    document.getElementById("lifes_ze").src = "images/lifes/" + vidas + ".png";
    document.getElementById("boss_background").style.backgroundPositionX = "-350px";
    document.getElementById("boss_background").style.position = "absolute";
    document.getElementById("lifes_adolfo").style.position = "absolute";
    document.getElementById("lifes_adolfo").style.left = "820px";
    document.getElementById("lifes_adolfo").style.top = "4px";
    document.getElementById("lifes_ze").style.position = "absolute";
    document.getElementById("lifes_ze").style.left = "4px";
    document.getElementById("lifes_ze").style.top = "4px";
    document.getElementById("nave_ze").style.position = "absolute";
    document.getElementById("nave_ze").style.top = "475px";
    document.getElementById("nave_ze").style.left = "475px";
    document.getElementById("nave_adolfo").style.position = "absolute";
    document.getElementById("nave_adolfo").style.top = "15px";
    document.getElementById("nave_adolfo").style.left = parseInt(document.getElementById("nave_ze").style.left) + 30 + "px";
    document.getElementById("laser_ze").style.display = "none";
    document.getElementById("laser_ze").style.position = "absolute";
    document.getElementById("laser_ze").style.top = "465px";
    document.getElementById("laser_ze").style.left = "536px";
    document.getElementById("laser_adolfo").style.display = "none";
    document.getElementById("laser_adolfo").style.position = "absolute";
    document.getElementById("laser_adolfo").style.top = "80px";
    document.getElementById("laser_adolfo").style.left = "536px";
    document.onkeydown = function (event) {
        addTecla(event);
    };
    document.onkeyup = function (event) {
        removeTecla(event);
    };
    intTiro = setInterval(function () {
        if (tiroativo)
            moverTiro();
    }, 1000 / 60);
    intteclas = setInterval(processaTecla, 1000 / 60);
    timerJogo = setInterval(function () {
        countTime++;
    }, 1000);
    //som_fundo.play();
    intTiroBoss = setInterval(function () {
        if (tiroativoBoss)
            moverTiroBoss();
    }, 1000 / 60);
    atualiza = setInterval(atualizaJogo, 1000 / 60);
};

function ativaTiro() {
    if (tiroativo == false) {
        laser_gun.play();
        document.getElementById("laser_ze").style.top = parseInt(document.getElementById("nave_ze").style.top) + 20 + "px";
        document.getElementById("laser_ze").style.left = parseInt(document.getElementById("nave_ze").style.left) + 47 + "px";
        document.getElementById("laser_ze").style.display = "none";
        tiroativo = true;
    }
    /*if (tiroativoBoss == false) {
     laser_gun.play();
     document.getElementById("laser_adolfo").style.top = parseInt(document.getElementById("nave_adolfo").style.top) + 20 + "px";
     document.getElementById("laser_adolfo").style.left = parseInt(document.getElementById("nave_adolfo").style.left) + 97 + "px";
     document.getElementById("laser_adolfo").style.display = "none";
     tiroativoBoss = true;
     }*/
}

function moverTiro() {
    var tiroN = document.getElementById("laser_ze");
    var tiroW = 13;
    var tiroH = 45;
    var bossN = document.getElementById("nave_adolfo");
    var bossW = 216;
    var bossH = 185;
    document.getElementById("laser_ze").style.display = "block";
    document.getElementById("laser_ze").style.top = parseInt(document.getElementById("laser_ze").style.top) - 15 + "px";

    if (parseInt(document.getElementById("laser_ze").style.top) + 60 < 50) {
        tiroativo = false;
        document.getElementById("laser_ze").style.display = "none";
    }

    if (verificaColisao(tiroN, tiroH, tiroW, bossN, bossH, bossW)) {
        tiroativo = false;
        iminigo_morte.play();
        vidas_boss--;
        document.getElementById("laser_ze").style.display = "none";
        document.getElementById("lifes_adolfo").src = "images/boss_level/lifes_adolfo/" + vidas_boss + ".png";
        var randomBossX = Math.floor(Math.random() * 531 + 270);
        document.getElementById("nave_adolfo").style.left = randomBossX + "px";
    }
}

function moverTiroBoss() {
    document.getElementById("laser_adolfo").style.display = "block";
    document.getElementById("laser_adolfo").style.top = parseInt(document.getElementById("laser_adolfo").style.top) + 10 + "px";

    if (parseInt(document.getElementById("laser_adolfo").style.top) > 520) {
        tiroativoBoss = false;
        document.getElementById("laser_adolfo").style.display = "none";
    }
}

function processaTecla() {
    var zeLeft = parseInt(document.getElementById("nave_ze").style.left);
    for (var i = 0; i < arrayTeclas.length; i++) {
        switch (arrayTeclas[i]) {
            case teclaDireita:
                if (zeLeft + 105 <= 1100 - 18) {
                    document.getElementById("nave_ze").style.left = zeLeft + 4 + "px";
                    if (parseInt(document.getElementById("nave_adolfo").style.left) + 216 <= 1100 - 18)
                        document.getElementById("nave_adolfo").style.left = parseInt(document.getElementById("nave_adolfo").style.left) + 4 + "px";
                    document.getElementById("boss_background").style.backgroundPositionX = parseInt(document.getElementById("boss_background").style.backgroundPositionX) - 1 + "px";
                }
                break;
            case teclaEsquerda:
                if (zeLeft > 15) {
                    document.getElementById("nave_ze").style.left = zeLeft - 4 + "px";
                    if (parseInt(document.getElementById("nave_adolfo").style.left) > 15)
                        document.getElementById("nave_adolfo").style.left = parseInt(document.getElementById("nave_adolfo").style.left) - 4 + "px";
                    document.getElementById("boss_background").style.backgroundPositionX = parseInt(document.getElementById("boss_background").style.backgroundPositionX) + 1 + "px";
                }
                break;
            case teclaTiro:
                ativaTiro();
                break;
        }
    }
}

function verificaColisao(elemento1, elemento1Altura, elemento1Largura, elemento2, elemento2Altura, elemento2Largura) {
    return (parseInt(elemento1.style.top) <= parseInt(elemento2.style.top) + elemento2Altura &&
    parseInt(elemento1.style.top) + elemento1Altura >= parseInt(elemento2.style.top) &&
    parseInt(elemento1.style.left) <= parseInt(elemento2.style.left) + elemento2Largura &&
    parseInt(elemento1.style.left) + elemento1Largura >= parseInt(elemento2.style.left));
}

function atualizaJogo() {
    var nave_ze = document.getElementById("nave_ze");
    var nave_zeW = 105;
    var nave_zeH = 100;
    var laser_adolfo = document.getElementById("laser_adolfo");
    var laser_adolfoW = 20;
    var laser_adolfoH = 80;
    var tiroN = document.getElementById("laser_ze");
    var tiroW = 13;
    var tiroH = 45;
    var inimigo1 = document.getElementById("nave_inimigo1");
    var inimigo2 = document.getElementById("nave_inimigo2");
    var inimigo3 = document.getElementById("nave_inimigo3");
    var inimigo4 = document.getElementById("nave_inimigo4");
    var inimigoW = 75;
    var inimigoH = 170;
    var inimiga1Y = parseInt(document.getElementById("nave_inimigo1").style.top);
    var inimiga2Y = parseInt(document.getElementById("nave_inimigo2").style.top);
    var inimiga3Y = parseInt(document.getElementById("nave_inimigo3").style.top);
    var inimiga4Y = parseInt(document.getElementById("nave_inimigo4").style.top);

    /*if (verificaColisao(nave_ze, nave_zeH, nave_zeW, laser_adolfo, laser_adolfoH, laser_adolfoW)) {
     tiroativoBoss = false;
     death = true;
     animationEnded = false;
     vidas--;
     ze_morte.play();
     sessionStorage["vidas"] = vidas;
     document.getElementById("laser_adolfo").style.display = "none";
     document.getElementById("lifes_ze").src = "images/lifes/" + vidas + ".png";
     }*/

    if (inimiga1Y > 610 || inimiga1Y == -100) {
        document.getElementById("nave_inimigo1").style.top = "-150px";
        document.getElementById("nave_inimigo1").style.left = Math.floor(Math.random() * 901 + 20) + "px";
    } else
        document.getElementById("nave_inimigo1").style.top = inimiga1Y + 4 + "px";

    if (inimiga2Y > 610 || inimiga2Y == -100) {
        document.getElementById("nave_inimigo2").style.top = "-200px";
        document.getElementById("nave_inimigo2").style.left = Math.floor(Math.random() * 901 + 20) + "px";
    } else
        document.getElementById("nave_inimigo2").style.top = inimiga2Y + 2 + "px";

    if (inimiga3Y > 610 || inimiga3Y == -100) {
        document.getElementById("nave_inimigo3").style.top = "-220px";
        document.getElementById("nave_inimigo3").style.left = Math.floor(Math.random() * 901 + 20) + "px";
    } else
        document.getElementById("nave_inimigo3").style.top = inimiga3Y + 3 + "px";

    if (inimiga4Y > 610 || inimiga4Y == -100) {
        document.getElementById("nave_inimigo4").style.top = "-180px";
        document.getElementById("nave_inimigo4").style.left = Math.floor(Math.random() * 901 + 20) + "px";
    } else
        document.getElementById("nave_inimigo4").style.top = inimiga4Y + 3 + "px";


    //Nave Zé contra as naves inimigas
    if (verificaColisao(nave_ze, nave_zeH, nave_zeW, inimigo1, inimigoH, inimigoW)) {
        death = true;
        animationEnded = false;
        vidas--;
        ze_morte.play();
        inimigo1.style.top = '-100px';
        sessionStorage["vidas"] = vidas;
        document.getElementById("lifes_ze").src = "images/lifes/" + vidas + ".png";
    }

    if (verificaColisao(nave_ze, nave_zeH, nave_zeW, inimigo2, inimigoH, inimigoW)) {
        death = true;
        animationEnded = false;
        vidas--;
        ze_morte.play();
        inimigo2.style.top = '-100px';
        sessionStorage["vidas"] = vidas;
        document.getElementById("lifes_ze").src = "images/lifes/" + vidas + ".png";
    }

    if (verificaColisao(nave_ze, nave_zeH, nave_zeW, inimigo3, inimigoH, inimigoW)) {
        death = true;
        animationEnded = false;
        vidas--;
        ze_morte.play();
        inimigo3.style.top = '-100px';
        sessionStorage["vidas"] = vidas;
        document.getElementById("lifes_ze").src = "images/lifes/" + vidas + ".png";
    }

    if (verificaColisao(nave_ze, nave_zeH, nave_zeW, inimigo4, inimigoH, inimigoW)) {
        death = true;
        animationEnded = false;
        vidas--;
        ze_morte.play();
        inimigo4.style.top = '-100px';
        sessionStorage["vidas"] = vidas;
        document.getElementById("lifes_ze").src = "images/lifes/" + vidas + ".png";
    }


    //Tiro Zé contra as naves inimigas
    if (verificaColisao(tiroN, tiroH, tiroW, inimigo1, inimigoH, inimigoW)) {
        document.getElementById('nave_inimigo1').style.top = '-100px';
        tiroativo = false;
        iminigo_morte.play();
        contKills++;
        document.getElementById("laser_ze").style.display = "none";
    }
    if (verificaColisao(tiroN, tiroH, tiroW, inimigo2, inimigoH, inimigoW)) {
        document.getElementById('nave_inimigo2').style.top = '-100px';
        tiroativo = false;
        iminigo_morte.play();
        contKills++;
        document.getElementById("laser_ze").style.display = "none";
    }
    if (verificaColisao(tiroN, tiroH, tiroW, inimigo3, inimigoH, inimigoW)) {
        document.getElementById('nave_inimigo3').style.top = '-100px';
        tiroativo = false;
        iminigo_morte.play();
        contKills++;
        document.getElementById("laser_ze").style.display = "none";
    }
    if (verificaColisao(tiroN, tiroH, tiroW, inimigo4, inimigoH, inimigoW)) {
        document.getElementById('nave_inimigo4').style.top = '-100px';
        tiroativo = false;
        iminigo_morte.play();
        contKills++;
        document.getElementById("laser_ze").style.display = "none";
    }

    if (vidas <= 0) {
        pontuacaolvlboss = 0;
        pontuacaoTotal = Math.round(((vidas * 5) + parseInt(pontuacaolvl1) + parseInt(pontuacaolvl2) + pontuacaolvlboss) / 4);
        sessionStorage["pontuacao_lvlboss"] = pontuacaolvlboss;
        sessionStorage["pontuacaoTotal"] = pontuacaoTotal;
        fimJogo("lost", pontuacaoTotal);
    }

    if (death == true && animationEnded == false) {
        death = false;
        setTimeout(function () {
            document.getElementById('nave_ze').style.display = "none";
            setTimeout(function () {
                document.getElementById('nave_ze').style.display = "block";
                setTimeout(function () {
                    document.getElementById('nave_ze').style.display = "none";
                    setTimeout(function () {
                        document.getElementById('nave_ze').style.display = "block";
                        setTimeout(function () {
                            document.getElementById('nave_ze').style.display = "none";
                            setTimeout(function () {
                                document.getElementById('nave_ze').style.display = "block"
                            }, 300);
                        }, 300);
                    }, 300);
                }, 300);
            }, 300);
        }, 1);
        animationEnded = true;
    }

    if (vidas_boss <= 0) {
        pontuacaolvlboss = 300 + (contKills * 10) - Math.round(countTime * 0.6);
        pontuacaoTotal = Math.round(((vidas * 5) + parseInt(pontuacaolvl1) + parseInt(pontuacaolvl2) + pontuacaolvlboss) / 4);
        sessionStorage["pontuacao_lvlboss"] = pontuacaolvlboss;
        sessionStorage["pontuacaoTotal"] = pontuacaoTotal;
        fimJogo("win", pontuacaoTotal);
    }
}

function addTecla(evt) {
    var tecla = evt.key;
    var presente = false;

    for (var i = 0; i < arrayTeclas.length; i++) {
        if (arrayTeclas[i] == tecla) {
            presente = true;
        }
        if (arrayTeclas[i] == "ArrowRight" && tecla == "ArrowLeft")
            arrayTeclas.splice(i, 1);
        else if (arrayTeclas[i] == "ArrowLeft" && tecla == "ArrowRight")
            arrayTeclas.splice(i, 1);
    }
    if (presente == false) {
        arrayTeclas.push(tecla);
    }
}

function removeTecla(evt) {
    var tecla = evt.key;
    for (var i = 0; i < arrayTeclas.length; i++) {
        if (arrayTeclas[i] == tecla) {
            arrayTeclas.splice(i, 1);
        }
    }
}

function fimJogo(result, score) {
    clearInterval(intteclas);
    clearInterval(intTiro);
    clearInterval(timerJogo);
    clearInterval(intTiroBoss);
    clearInterval(atualiza);

    document.getElementById("blur").style.display = "block";
    setTimeout("document.getElementById('div_nome').style.display = 'block'", 1500);
    document.getElementById("btn").onclick = function () {
        var nome = document.getElementById("nome").value;
        if (nome != "") {
            sessionStorage["nome"] = nome;
            document.getElementById("div_nome").style.display = "none";
            setTimeout(function () {
                leaderBoard(nome, score);
                if (result == "lost") {
                    document.getElementById("mensagem").innerHTML = "Foste cozido!";
                    document.getElementById("mensagem2").innerHTML = "A salsicha triunfou sobre a batata";
                }
                if (result == "win") {
                    document.getElementById("mensagem").innerHTML = "Vitoria!";
                    document.getElementById("mensagem2").innerHTML = "Já cheira a churrasco!";
                }
                document.getElementById("resultado").innerHTML = score;
                document.getElementById("end").style.display = "block";
                document.getElementById("tableTOP").style.display = "block";
                document.getElementById("voltar").style.display = "block";
                document.getElementById("repetir").style.display = "block";
            }, 500);
        }
    };
    document.getElementById("repetir").onclick = function () {
        window.open("nivel1.html", "_self");
    };
    document.getElementById("voltar").onclick = function () {
        window.open("index.html", "_self");
    }
}

function leaderBoard(nome, score) {

    localStorage[localStorage.length + "_" + nome] = score;

    for (var linha = 0; linha < localStorage.length; linha++) {
        tabela[linha] = [localStorage.key(linha).slice(localStorage.key(linha).indexOf("_") + 1), localStorage[localStorage.key(linha)]];
    }
    tabela.shift();
    tabela.sort(function (a, b) {
        return b[1] - a[1]
    });

    if (tabela.length > 11)
        tabela.splice(10, tabela.length);

    console.log(tabela);

    for (var i = 0; i < tabela.length; i++) {
        document.getElementById("name").innerHTML += tabela[i][0] + "<br/>";
        document.getElementById("score").innerHTML += tabela[i][1] + "<br/>";
    }
    document.getElementById("rank").innerHTML += "1ST" + "<br/>" + "2ND" + "<br/>" + "3RD" + "<br/>" + "4TH" + "<br/>" + "5TH" + "<br/>" + "6TH" + "<br/>" + "7TH" + "<br/>" + "8TH" + "<br/>" + "9TH" + "<br/>" + "10TH" + "<br/>";
}


function escolhaComandos() {
    var comandos = sessionStorage["modelo"];
    if (comandos == "rato") {
        document.onmousemove = mexerRato;
        window.addEventListener("click", ativaTiro);
        intervalo = setInterval(posicaoRato, 1000 / 60);
    }
    document.onkeydown = function (event) {
        addTecla(event);
    };
    document.onkeyup = function (event) {
        removeTecla(event);
    };
    intteclas = setInterval(processaTecla, 1000 / 60);
}

function mexerRato(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event;

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0 );
    }

    mousePos = {
        x: event.pageX,
        y: event.pageY
    };
}

function posicaoRato() {
    var pos = mousePos;
    if (!pos) {
    }
    else {
        moverZeRato(pos);
    }

    if (tiroativo) {
        moverTiro();
    }
}

function moverZeRato(pos) {

    var zeLeft = parseInt(document.getElementById("ze").style.left);

    if (pos.x >= (1100 / 2) + 200 && pos.x < 1100 && zeLeft + 75 < 1100 && tileset.some(colisaoLateralRight) != true) {
        if (zeLeft + 105 <= 1100 - 18) {
            document.getElementById("nave_ze").style.left = zeLeft + 4 + "px";
            if (parseInt(document.getElementById("nave_adolfo").style.left) + 216 <= 1100 - 18)
                document.getElementById("nave_adolfo").style.left = parseInt(document.getElementById("nave_adolfo").style.left) + 4 + "px";
            document.getElementById("boss_background").style.backgroundPositionX = parseInt(document.getElementById("boss_background").style.backgroundPositionX) - 1 + "px";

        }
    }

    if (pos.x <= (1100 / 2) - 200) {
        if (zeLeft > 15) {
            document.getElementById("nave_ze").style.left = zeLeft - 4 + "px";
            if (parseInt(document.getElementById("nave_adolfo").style.left) > 15)
                document.getElementById("nave_adolfo").style.left = parseInt(document.getElementById("nave_adolfo").style.left) - 4 + "px";
            document.getElementById("boss_background").style.backgroundPositionX = parseInt(document.getElementById("boss_background").style.backgroundPositionX) + 1 + "px";
        }
    }
}