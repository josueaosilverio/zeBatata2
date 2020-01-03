var jumping = false, facing = "right", arrayTeclas = [], intteclas, spritesMov;
var tiroativo = false, tirofacing, intTiro, timerJogo, salto, estadoCheck = false;
var zeX = 50, vidas = 5, contKills = 0, pontuacao = 0, countTime = 0, tabela = [];
var time = false, arrayInimigos = [];
var tileset = new Array;
var intervalo;
var mousePos;

arrayInimigos[1] = false;
arrayInimigos[2] = false;
arrayInimigos[3] = false;
arrayInimigos[4] = false;

//Sprites & colision variables
var ze_running_right = 0, ze_running_left = 0, ze_shoot_right = 1, ze_shoot_left = 1;
var ze_jump_right = 0, ze_jump_left = 0;
var up, height, grav = 5, chao;

//Sound variables
var arraySounds = [];
var laser_gun = new Audio("sounds/laser_gun.mp3");
var ze_morte = new Audio("sounds/ze_morte.mp3");
var iminigo1_morte = new Audio("sounds/morte_inimigo1.mp3");
var ze_walk = new Audio("sounds/walk_metal.mp3");
var som_fundo = new Audio("sounds/som_fundo_nave.mp3");
som_fundo.loop = true;
var som_pausa = new Audio("sounds/som_pausa.mp3");
som_pausa.loop = true;
var slider_som_fundo, slider_som_efeitos;

arraySounds[0] = laser_gun;
arraySounds[1] = ze_morte;
arraySounds[2] = iminigo1_morte;
arraySounds[3] = ze_walk;

//Keyboard variables
var intteclas_pausa, arrayTeclas_pausa = [], facing_pausa = "right", zePausaMov, button, estadoPremir = false, menuEstado = 0;
var teclaCima = sessionStorage["result_saltar"];
var teclaDireita = sessionStorage["result_frente"];
var teclaEsquerda = sessionStorage["result_tras"];
var teclaBaixo = sessionStorage["result_baixo"];
var teclaTiro = sessionStorage["result_shoot"];
var teclaPausa = sessionStorage["result_pausa"];

som_fundo.volume = sessionStorage["volumeFundo"];
som_pausa.volume = sessionStorage["volumeFundo"];
slider_som_efeitos = parseInt(sessionStorage["volumeSliderEfeitos"]);
slider_som_fundo = parseInt(sessionStorage["volumeSliderFundo"]);

/*************************************************** MAPS *************************************************************/
var escala = 50, z = 0, x = 0;
var seed = [], maps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var map_0 = [], map_1 = [], map_2 = [], map_3 = [], map_4 = [], map_5 = [], map_6 = [], map_7 = [], map_8 = [], map_9 = []; //todas as partes
var maps2 = [map_0, map_1, map_2, map_3, map_4, map_5, map_6, map_7, map_8, map_9];
/**********************************************************************************************************************/

map_0[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0];
map_0[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0];
map_0[9] = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_0[11] = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];


map_1[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_1[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_1[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_1[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_1[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_1[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_1[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_1[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
map_1[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0, 0];
map_1[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
map_1[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
map_1[11] = [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1];


map_2[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[9] = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
map_2[10] = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_2[11] = [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];


map_3[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
map_3[10] = [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_3[11] = [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];


map_4[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0];
map_4[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_4[10] = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0];
map_4[11] = [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];


map_5[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0];
map_5[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0];
map_5[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_5[11] = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];


map_6[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0];
map_6[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[9] = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0];
map_6[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_6[11] = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];


map_7[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0];
map_7[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0];
map_7[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_7[11] = [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];


map_8[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[7] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_8[10] = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0];
map_8[11] = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];


map_9[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
map_9[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0];
map_9[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
map_9[10] = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
map_9[11] = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1];


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

/***********************************************************************************************************************************************/
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
    z = 0; //Trata da sobreposição das partes
    x = 0; //Trata da sobreposição dos spaces, walls e plat_designs
    localStorage["0_Nome"] = "Pontuação";
    document.getElementById("volumeslider_ambiente").value = slider_som_fundo;
    document.getElementById("volumeslider_efeitos").value = slider_som_efeitos;
    document.getElementById("main").style.position = "absolute";
    document.getElementById("main").style.left = Math.round((innerWidth - 1100) / 2) + "px";
    document.getElementById("main").style.top = Math.round((innerHeight - 600) / 2) + "px";
    document.getElementById("tempo").style.display = "block";
    document.getElementById("end").style.display = "none";
    document.getElementById("tableTOP").style.display = "none";
    document.getElementById("voltar").style.display = "none";
    document.getElementById("repetir").style.display = "none";

    intTiro = setInterval(function () {
        if (tiroativo) {
            moverTiro();
        }
    }, 1000 / 60);

    spritesMov = setInterval(sprites, 1000 / 60);

    /****************** ONDE A SEED É GERADA ******************/
    for (var i = 0; i < 10; i++) {
        seed[i] = i;
    }
    seed.sort(function (a, b) {
        return 0.5 - Math.random()
    });
    seed.splice(0, 5);
    console.log(seed);
    chamarMapa();
    /***********************************************************/
    escolhaComandos();
};

function chamarMapa() {
    for (var a = 0; a < seed.length; a++) {
        for (var i = 0; i < maps.length; i++) {
            if (maps[i] == seed[a]) {
                document.getElementById("background").innerHTML += "<img id='background_" + seed[a] + "' src='images/background/lvl1/" + seed[a] + ".png'>";
                document.getElementById("background_" + seed[a]).style.left = (x * 2200) + "px";
                document.getElementById("background_" + seed[a]).style.top = 0;
                document.getElementById("space").innerHTML += "<img id='space_" + seed[a] + "' src='images/space/lvl1/" + seed[a] + ".png'>";
                document.getElementById("space_" + seed[a]).style.left = (x * 2200) + "px";
                document.getElementById("space_" + seed[a]).style.top = 0;
                document.getElementById("plat_design").innerHTML += "<img id='plat_design_" + seed[a] + "' src='images/plataformas/lvl1/" + seed[a] + ".png'>";
                document.getElementById("plat_design_" + seed[a]).style.left = (x * 2200) + "px";
                document.getElementById("plat_design_" + seed[a]).style.top = 0;
                construirMapa(seed[a]);
                if (x <= 4) //Isto serve para desfazer a sobreposição dos spaces, walls e plat_designs
                    x++;
            }
        }
    }

    document.getElementById("space").style.left = 0;
    document.getElementById("plat_design").style.left = 0;
    document.getElementById("background").style.left = 0;
    document.getElementById("plataformas").style.left = 0;
    document.getElementById("ze").style.position = "absolute";
    document.getElementById("ze").style.top = "400px";
    document.getElementById("ze").style.left = zeX - 25 + "px";
    document.getElementById("inimigo1").style.position = "absolute";
    document.getElementById("inimigo1").style.top = "400px";
    document.getElementById("inimigo1").style.left = parseInt(document.getElementById("background_" + seed[1]).style.left) - 25 + "px";
    document.getElementById("inimigo2").style.position = "absolute";
    document.getElementById("inimigo2").style.top = "400px";
    document.getElementById("inimigo2").style.left = parseInt(document.getElementById("background_" + seed[2]).style.left) - 25 + "px";
    document.getElementById("inimigo3").style.position = "absolute";
    document.getElementById("inimigo3").style.top = "400px";
    document.getElementById("inimigo3").style.left = parseInt(document.getElementById("background_" + seed[3]).style.left) - 25 + "px";
    document.getElementById("inimigo4").style.position = "absolute";
    document.getElementById("inimigo4").style.top = "400px";
    document.getElementById("inimigo4").style.left = parseInt(document.getElementById("background_" + seed[4]).style.left) - 25 + "px";
    document.getElementById("tiro").style.display = "none";
    document.getElementById("tiro").style.position = "absolute";
    document.getElementById("tiro").style.top = "460px";
    document.getElementById("tiro").style.left = "100px";
    document.getElementById("check").style.position = "absolute";
    document.getElementById("check").style.top = 150 + "px";
    document.getElementById("check").style.left = parseInt(document.getElementById("background_" + seed[2]).style.left) + 50 + "px";
    setTimeout("document.getElementById('tempo').style.display = 'none'", 700);
    timerJogo = setInterval(function () {
        countTime++;
    }, 1000);
    som_fundo.play();
}

function startTime() {

    //Dia da semana
    var week = new Date();
    var arrayWeekday = [];
    arrayWeekday[0] = "Sunday";
    arrayWeekday[1] = "Monday";
    arrayWeekday[2] = "Tuesday";
    arrayWeekday[3] = "Wednesday";
    arrayWeekday[4] = "Thursday";
    arrayWeekday[5] = "Friday";
    arrayWeekday[6] = "Saturday";
    var weekDay = arrayWeekday[week.getDay()];

    //Mês
    var month = new Date();
    var arrayMonth = [];
    arrayMonth[0] = "January";
    arrayMonth[1] = "February";
    arrayMonth[2] = "March";
    arrayMonth[3] = "April";
    arrayMonth[4] = "May";
    arrayMonth[5] = "June";
    arrayMonth[6] = "July";
    arrayMonth[7] = "August";
    arrayMonth[8] = "September";
    arrayMonth[9] = "October";
    arrayMonth[10] = "November";
    arrayMonth[11] = "December";
    var dateMonth = arrayMonth[month.getMonth()];


    //Dia do mês
    var d = new Date();
    var dayMonth = d.getDate();


    //Ano
    var year = new Date();
    var fullYear = year.getFullYear();


    //Horas:Minutos:Segundos
    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    //var seconds = today.getSeconds();
    minute = checkTime(minute);
    //seconds = checkTime(seconds);


    document.getElementById("horas").innerHTML = hour + ":" + minute;
    document.getElementById("data").innerHTML = weekDay + ", " + dateMonth + " " + dayMonth + ", " + fullYear;

    setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10)
        i = "0" + i; // add zero in front of numbers < 10
    return i;
}

function construirMapa(num) {
    console.log(num);

    for (var linhas = 0; linhas < maps2[num].length; linhas++) {
        for (var colunas = 0; colunas < maps2[num][linhas].length; colunas++) {
            switch (maps2[num][linhas][colunas]) {
                case 1:
                    document.getElementById("plataformas").innerHTML += "<div id='tile_" + num + "_" + linhas + "_" + colunas + "' class='tile black'></div>";
                    document.getElementById("tile_" + num + "_" + linhas + "_" + colunas).style.left = (z * 2200) + colunas * escala + "px";
                    document.getElementById("tile_" + num + "_" + linhas + "_" + colunas).style.top = linhas * escala + "px";
                    document.getElementById("tile_" + num + "_" + linhas + "_" + colunas).style.position = "absolute";
                    tileset.push("tile_" + num + "_" + linhas + "_" + colunas);
                    break;
                case 3:
                    document.getElementById("plataformas").innerHTML += "<div id='tile_" + num + "_" + linhas + "_" + colunas + "' class='tile purple'></div>";
                    document.getElementById("tile_" + num + "_" + linhas + "_" + colunas).style.left = (z * 2200) + colunas * escala + "px";
                    document.getElementById("tile_" + num + "_" + linhas + "_" + colunas).style.top = linhas * escala + "px";
                    document.getElementById("tile_" + num + "_" + linhas + "_" + colunas).style.position = "absolute";
                    tileset.push("tile_" + num + "_" + linhas + "_" + colunas);
                    break;
            }
        }
    }
    if (num == 8 && time == false) {
        time = true;
        startTime();
        document.getElementById("time").style.position = "absolute";
        document.getElementById("time").style.left = parseInt(document.getElementById("background_8").style.left) + 1016 + "px";
        document.getElementById("time").style.top = 180 + "px";
        document.getElementById("time").style.visibility = "visible";
    }
    if (z <= 4) //Isto serve para desfazer a sobreposição das partes
        z++;
}

function processaTecla() {
    var inimigo1X = parseInt(document.getElementById("inimigo1").style.left);
    var inimigo2X = parseInt(document.getElementById("inimigo2").style.left);
    var inimigo3X = parseInt(document.getElementById("inimigo3").style.left);
    var inimigo4X = parseInt(document.getElementById("inimigo4").style.left);
    var zeLeft = parseInt(document.getElementById("ze").style.left);
    var checkpointX = parseInt(document.getElementById("check").style.left);

    for (var i = 0; i < arrayTeclas.length; i++) {
        switch (arrayTeclas[i]) {
            case teclaDireita:
                if (tileset.some(colisaoLateralRight) != true) {
                    document.getElementById("ze").style.left = zeLeft + 5 + "px";
                    zeX += 5;
                    if (facing != "right") {
                        facing = "right";
                        //document.getElementById("ze").src = "images/ze.png";
                    }
                    if (zeX >= 10270) { //Quando está perto do limite da última parte, o background e as plataformas param
                        if (time == true)
                            document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + "px";
                        document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) + "px";
                        document.getElementById("inimigo1").style.left = parseInt(document.getElementById("inimigo1").style.left) + "px";
                        document.getElementById("inimigo2").style.left = parseInt(document.getElementById("inimigo2").style.left) + "px";
                        document.getElementById("inimigo3").style.left = parseInt(document.getElementById("inimigo3").style.left) + "px";
                        document.getElementById("inimigo4").style.left = parseInt(document.getElementById("inimigo4").style.left) + "px";
                        document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) + "px";
                        document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) + "px";
                        document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) + "px";
                    } else if (zeLeft + 100 >= 1100 * 0.4) {
                        document.getElementById("ze").style.left = zeLeft + "px";
                        document.getElementById("check").style.left = checkpointX - 5 + "px";
                        document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) - 2 + "px";
                        document.getElementById("inimigo1").style.left = inimigo1X - 5 + "px";
                        document.getElementById("inimigo2").style.left = inimigo2X - 5 + "px";
                        document.getElementById("inimigo3").style.left = inimigo3X - 5 + "px";
                        document.getElementById("inimigo4").style.left = inimigo4X - 5 + "px";
                        document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) - 5 + "px";
                        document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) - 5 + "px";
                        document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) - 5 + "px";
                        if (time == true)
                            document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) - 5 + "px";
                    }
                }
                break;

            case teclaEsquerda:
                if (tileset.some(colisaoLateralLeft) != true) {
                    document.getElementById("ze").style.left = zeLeft - 5 + "px";
                    zeX -= 5;
                    if (facing != "left") {
                        facing = "left";
                        //document.getElementById("ze").src = "images/ze_esquerda.png";
                    }
                    if (parseInt(document.getElementById("background").style.left) <= 0 && zeLeft <= 20) {
                        zeX = 45;
                        document.getElementById("space").style.left = 0;
                        document.getElementById("plat_design").style.left = 0;
                        document.getElementById("background").style.left = 0;
                        document.getElementById("plataformas").style.left = 0;
                        document.getElementById("inimigo1").style.left = parseInt(document.getElementById("inimigo1").style.left) + "px";
                        document.getElementById("inimigo2").style.left = parseInt(document.getElementById("inimigo2").style.left) + "px";
                        document.getElementById("inimigo3").style.left = parseInt(document.getElementById("inimigo3").style.left) + "px";
                        document.getElementById("inimigo4").style.left = parseInt(document.getElementById("inimigo4").style.left) + "px";
                        if (time == true)
                            document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + "px";
                        document.getElementById("ze").style.left = zeLeft + "px";
                    } else if (zeX + 75 >= 10300 && zeX <= 11000) {
                        document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) + "px";
                        document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) + "px";
                        document.getElementById("inimigo1").style.left = parseInt(document.getElementById("inimigo1").style.left) + "px";
                        document.getElementById("inimigo2").style.left = parseInt(document.getElementById("inimigo2").style.left) + "px";
                        document.getElementById("inimigo3").style.left = parseInt(document.getElementById("inimigo3").style.left) + "px";
                        document.getElementById("inimigo4").style.left = parseInt(document.getElementById("inimigo4").style.left) + "px";
                        document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) + "px";
                        document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) + "px";
                        if (time == true)
                            document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + "px";
                    } else if (parseInt(document.getElementById("background").style.left) + zeLeft < zeLeft) {
                        document.getElementById("ze").style.left = zeLeft + "px";
                        document.getElementById("check").style.left = checkpointX + 5 + "px";
                        document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) + 2 + "px";
                        document.getElementById("inimigo1").style.left = inimigo1X + 5 + "px";
                        document.getElementById("inimigo2").style.left = inimigo2X + 5 + "px";
                        document.getElementById("inimigo3").style.left = inimigo3X + 5 + "px";
                        document.getElementById("inimigo4").style.left = inimigo4X + 5 + "px";
                        document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) + 5 + "px";
                        document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) + 5 + "px";
                        document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) + 5 + "px";
                        if (time == true)
                            document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + 5 + "px";
                    }
                }
                break;

            case teclaCima:
                if (!jumping && tileset.some(colisaoBaixo) == true) {
                    jump();
                }
                break;

            case teclaTiro:
                ativaTiro();
                break;

            case teclaPausa:
                clearInterval(timerJogo);
                clearInterval(intteclas);
                clearInterval(intTiro);
                clearInterval(spritesMov);
                clearInterval(intervalo);
                document.getElementById("main_pausa").style.display = "block";
                pausa();
                break;
        }
    }
    console.log(zeX);
    fall();
    atualizaJogo();

    if (zeX + 100 >= 10920) {
        pontuacao = (contKills * 10) - Math.round(countTime * 0.6);
        fimJogo("win", pontuacao, vidas);
    }
}

function jump() {
    var zeV = parseInt(document.getElementById("ze").style.top);
    height = 0;
    up = true;
    jumping = true;
    salto = setInterval(function () {
        if (height == 150 || parseInt(document.getElementById("ze").style.top) <= 5)
            up = false;
        if (up)
            height += 5;
        else {
            if (tileset.some(colisaoBaixo)) {
                jumping = false;
                clearInterval(salto);
            }
        }
        if (up)
            document.getElementById("ze").style.top = zeV - height + "px";
    }, 1000 / 60);
}

function ativaTiro() {
    if (tiroativo == false) {
        laser_gun.play();
        document.getElementById("tiro").style.top = parseInt(document.getElementById("ze").style.top) + 70 + "px";
        if (facing == "right") {
            document.getElementById("tiro").style.left = parseInt(document.getElementById("ze").style.left) + 103 + "px";
        } else if (facing == "left") {
            document.getElementById("tiro").style.left = parseInt(document.getElementById("ze").style.left) - 28 + "px";
        }
        document.getElementById("tiro").style.display = "";
        tiroativo = true;
        tirofacing = facing;
    }
}

function moverTiro() {
    var tiroN = document.getElementById("tiro");
    var tiroW = 30;
    var tiroH = 10;
    var inimigo1N = document.getElementById("inimigo1");
    var inimigo2N = document.getElementById("inimigo2");
    var inimigo3N = document.getElementById("inimigo3");
    var inimigo4N = document.getElementById("inimigo4");
    var inimigoW = 150;
    var inimigoH = 150;
    if (tirofacing == "right") {
        document.getElementById("tiro").style.left = parseInt(document.getElementById("tiro").style.left) + 15 + "px";
    } else if (tirofacing == "left") {
        document.getElementById("tiro").style.left = parseInt(document.getElementById("tiro").style.left) - 15 + "px";
    }
    if (parseInt(document.getElementById("tiro").style.left) + 30 >= 1100 || parseInt(document.getElementById("tiro").style.left) <= 0) {
        tiroativo = false;
        document.getElementById("tiro").style.display = "none";
    }

    if (verificaColisao(tiroN, tiroH, tiroW, inimigo1N, inimigoH, inimigoW)) {
        tiroativo = false;
        iminigo1_morte.play();
        contKills++;
        document.getElementById("tiro").style.display = "none";
        document.getElementById("inimigo1").style.top = "-200px";
    }
    if (verificaColisao(tiroN, tiroH, tiroW, inimigo2N, inimigoH, inimigoW)) {
        tiroativo = false;
        iminigo1_morte.play();
        contKills++;
        document.getElementById("tiro").style.display = "none";
        document.getElementById("inimigo2").style.top = "-200px";
    }
    if (verificaColisao(tiroN, tiroH, tiroW, inimigo3N, inimigoH, inimigoW)) {
        tiroativo = false;
        iminigo1_morte.play();
        contKills++;
        document.getElementById("tiro").style.display = "none";
        document.getElementById("inimigo3").style.top = "-200px";
    }
    if (verificaColisao(tiroN, tiroH, tiroW, inimigo4N, inimigoH, inimigoW)) {
        tiroativo = false;
        iminigo1_morte.play();
        contKills++;
        document.getElementById("tiro").style.display = "none";
        document.getElementById("inimigo4").style.top = "-200px";
    }


}

function verificaColisao(elemento1, elemento1Altura, elemento1Largura, elemento2, elemento2Altura, elemento2Largura) {
    return (parseInt(elemento1.style.top) <= parseInt(elemento2.style.top) + elemento2Altura &&
    parseInt(elemento1.style.top) + elemento1Altura >= parseInt(elemento2.style.top) &&
    parseInt(elemento1.style.left) <= parseInt(elemento2.style.left) + elemento2Largura &&
    parseInt(elemento1.style.left) + elemento1Largura >= parseInt(elemento2.style.left));
}

function atualizaJogo() {
    var ze = document.getElementById("ze");
    var zeW = 100;
    var zeH = 150;
    var zeY = parseInt(document.getElementById("ze").style.top);
    var inimigo1 = document.getElementById("inimigo1");
    var inimigo2 = document.getElementById("inimigo2");
    var inimigo3 = document.getElementById("inimigo3");
    var inimigo4 = document.getElementById("inimigo4");
    var inimigoW = 150;
    var inimigoH = 150;


    if (zeX + 100 >= (parseInt(document.getElementById("background_" + seed[2]).style.left) + 50) && estadoCheck == false) {
        estadoCheck = true;
        setTimeout("document.getElementById('check').style.display = 'block'", 100);
    }

    if (estadoCheck == true) {
        setTimeout("document.getElementById('check').style.display = 'none'", 3000);
    }

    if ((verificaColisao(ze, zeH, zeW, inimigo1, inimigoH, inimigoW) || verificaColisao(ze, zeH, zeW, inimigo2, inimigoH, inimigoW) ||
        verificaColisao(ze, zeH, zeW, inimigo3, inimigoH, inimigoW || verificaColisao(ze, zeH, zeW, inimigo4, inimigoH, inimigoW))) || zeY > 570) {
        vidas--;
        ze_morte.play();
        sessionStorage["vidas"] = vidas;
        document.getElementById("lifes").src = "images/lifes/" + vidas + ".png";

        if (vidas <= 0) {
            pontuacao = 0;
            fimJogo("lost", pontuacao);
        } else {
            if (estadoCheck) { //verifica se já passou o checkpoint
                zeX = parseInt(document.getElementById("background_" + seed[2]).style.left);
                document.getElementById("space").style.left = "-4010px";
                document.getElementById("plat_design").style.left = "-4010px";
                document.getElementById("background").style.left = "-4010px"; //valor quando o checkpoint é passado
                document.getElementById("plataformas").style.left = "-4010px";
                document.getElementById("check").style.left = "465px";
                document.getElementById("ze").style.left = parseInt(document.getElementById("check").style.left) - 100 + "px";
                document.getElementById("ze").style.top = "400px";
                if (arrayInimigos[1] == false)
                    document.getElementById("inimigo1").style.left = parseInt(document.getElementById("background_" + seed[1]).style.left) + parseInt(document.getElementById("space").style.left) - 25 + "px";
                if (arrayInimigos[2] == false)
                    document.getElementById("inimigo2").style.left = parseInt(document.getElementById("background_" + seed[2]).style.left) + parseInt(document.getElementById("space").style.left) - 25 + "px";
                if (arrayInimigos[3] == false)
                    document.getElementById("inimigo3").style.left = parseInt(document.getElementById("background_" + seed[3]).style.left) + parseInt(document.getElementById("space").style.left) - 25 + "px";
                if (arrayInimigos[4] == false)
                    document.getElementById("inimigo4").style.left = parseInt(document.getElementById("background_" + seed[4]).style.left) + parseInt(document.getElementById("space").style.left) - 25 + "px";
            }
            else {
                zeX = 50;
                document.getElementById("space").style.left = 0;
                document.getElementById("plat_design").style.left = 0;
                document.getElementById("background").style.left = 0;
                document.getElementById("plataformas").style.left = 0;
                document.getElementById("ze").style.top = "400px";
                document.getElementById("ze").style.left = zeX - 25 + "px";
                document.getElementById("check").style.left = parseInt(document.getElementById("background_" + seed[2]).style.left) + 50 + "px";
                if (arrayInimigos[1] == false)
                    document.getElementById("inimigo1").style.left = parseInt(document.getElementById("background_" + seed[1]).style.left) - 25 + "px";
                if (arrayInimigos[2] == false)
                    document.getElementById("inimigo2").style.left = parseInt(document.getElementById("background_" + seed[2]).style.left) - 25 + "px";
                if (arrayInimigos[3] == false)
                    document.getElementById("inimigo3").style.left = parseInt(document.getElementById("background_" + seed[3]).style.left) - 25 + "px";
                if (arrayInimigos[4] == false)
                    document.getElementById("inimigo4").style.left = parseInt(document.getElementById("background_" + seed[4]).style.left) - 25 + "px";
            }
            if (time == true)
                document.getElementById("time").style.left = parseInt(document.getElementById("background_8").style.left) + 1001 + parseInt(document.getElementById("space").style.left) + 23 + "px";
        }
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

function fall() {
    var player = parseInt(document.getElementById("ze").style.top);
    if (tileset.some(colisaoBaixo) == false)
        document.getElementById("ze").style.top = player + grav + "px";
}

function colisaoBaixo(itiles) {
    if (parseInt(document.getElementById(itiles).style.top) == parseInt(document.getElementById("ze").style.top) + 150 &&
        ((zeX + 20 >= parseInt(document.getElementById(itiles).style.left) &&
        zeX + 20 < parseInt(document.getElementById(itiles).style.left) + 50 && facing == "left") ||
        (zeX + 20 >= parseInt(document.getElementById(itiles).style.left) &&
        zeX + 20 < parseInt(document.getElementById(itiles).style.left) + 50 && facing == "right"))) {
        chao = true;
    } else {
        chao = false;
    }
    return (chao);
}

function colisaoLateralLeft(iitiles) {
    if ((parseInt(document.getElementById(iitiles).style.top) <= parseInt(document.getElementById("ze").style.top) + 149 &&
        parseInt(document.getElementById(iitiles).style.top) + 49 >= parseInt(document.getElementById("ze").style.top) + 149 &&
        zeX >= parseInt(document.getElementById(iitiles).style.left) &&
        zeX <= parseInt(document.getElementById(iitiles).style.left) + 50 && facing == "left")) {
        return (true);
    } else {
        return (false);
    }
}

function colisaoLateralRight(iitiles) {
    if (parseInt(document.getElementById(iitiles).style.top) <= parseInt(document.getElementById("ze").style.top) + 149 &&
        parseInt(document.getElementById(iitiles).style.top) + 49 >= parseInt(document.getElementById("ze").style.top) + 149 &&
        zeX + 45 >= parseInt(document.getElementById(iitiles).style.left) &&
        zeX + 45 <= parseInt(document.getElementById(iitiles).style.left) + 50 && facing == "right") {
        return (true);
    } else {
        return (false);
    }
}

function sprites() {
    if (facing == "right") {

        //Sprite Running
        if ((arrayTeclas[0] == teclaDireita || arrayTeclas[1] == teclaDireita || arrayTeclas[2] == teclaDireita) && jumping == false) {
            if (ze_running_right < 5) {
                ze_running_right++;
                ze_walk.play();
                document.getElementById("ze").src = "images/sprite_running/" + ze_running_right + "_dir.png";
            } else
                ze_running_right = 0;
        } else
            document.getElementById("ze").src = "images/ze.png";

        //Sprite Shooting
        if (tiroativo == true && tirofacing == "right" && ze_shoot_right <= 6) {
            document.getElementById("ze").src = "images/sprite_shooting/" + ze_shoot_right + "_dir.png";
            if (ze_shoot_right < 6)
                ze_shoot_right++;
            else
                document.getElementById("ze").src = "images/ze.png";
        }
        if (tiroativo == false)
            ze_shoot_right = 1;

        //Sprite Jumping
        if (jumping == true && ze_jump_right <= 4) {
            if (height == 0 && up == true) {
                ze_jump_right++;
                ze_jump_left++;
            }
            if (height == 70 && up == true) {
                ze_jump_right++;
                ze_jump_left++;
            }
            if (height == 145 && up == false) {
                ze_jump_right++;
                ze_jump_left++;
            }
            if (height == 60 && up == false) {
                ze_running_right++;
                ze_jump_left++;
            }
            document.getElementById("ze").src = "images/sprite_jumping/" + ze_jump_right + "_dir.png";
        }

    }

    if (facing == "left") {

        //Sprite Running
        if ((arrayTeclas[0] == teclaEsquerda || arrayTeclas[1] == teclaEsquerda || arrayTeclas[2] == teclaEsquerda) && jumping == false) {
            if (ze_running_left < 5) {
                ze_running_left++;
                ze_walk.play();
                document.getElementById("ze").src = "images/sprite_running/" + ze_running_left + "_esq.png";
            } else
                ze_running_left = 0;
        } else
            document.getElementById("ze").src = "images/ze_esquerda.png";

        //Sprite Shooting
        if (tiroativo == true && tirofacing == "left" && ze_shoot_left <= 6) {
            document.getElementById("ze").src = "images/sprite_shooting/" + ze_shoot_left + "_esq.png";
            if (ze_shoot_left < 6)
                ze_shoot_left++;
            else
                document.getElementById("ze").src = "images/ze_esquerda.png";
        }
        if (tiroativo == false)
            ze_shoot_left = 1;

        //Sprite Jumping
        if (jumping == true && ze_jump_left <= 4) {
            if (height == 0 && up == true) {
                ze_jump_left++;
                ze_jump_right++;
            }
            if (height == 70 && up == true) {
                ze_jump_left++;
                ze_jump_right++;
            }
            if (height == 145 && up == false) {
                ze_jump_left++;
                ze_jump_right++;
            }
            if (height == 60 && up == false) {
                ze_jump_left++;
                ze_jump_right++;
            }
            document.getElementById("ze").src = "images/sprite_jumping/" + ze_jump_left + "_esq.png";
        }
    }


    if (jumping == false) {
        ze_jump_right = 0;
        ze_jump_left = 0;
    }
}

function fimJogo(result, score, vidas) {
    clearInterval(intteclas);
    clearInterval(intTiro);
    clearInterval(timerJogo);
    clearInterval(salto);
    clearInterval(spritesMov);
    clearInterval(intervalo);

    sessionStorage["vidas"] = vidas;
    sessionStorage["pontuacao_lvl1"] = score;

    if (result == "lost") {
        document.getElementById("blur").style.display = "block";
        setTimeout("document.getElementById('div_nome').style.display = 'block'", 1200);
        document.getElementById("btn").onclick = function () {
            var nome = document.getElementById("nome").value;
            if (nome != "") {
                sessionStorage["nome"] = nome;
                document.getElementById("div_nome").style.display = "none";
                setTimeout(function () {
                    leaderBoard(nome, score);
                    document.getElementById("resultado").innerHTML = score;
                    document.getElementById("mensagem").innerHTML = "Foste cozido!";
                    document.getElementById("mensagem2").innerHTML = "A salsicha triunfou sobre a batata";
                    document.getElementById("voltar").style.display = "block";
                    document.getElementById("repetir").style.display = "block";
                    document.getElementById("end").style.display = "block";
                    document.getElementById("tableTOP").style.display = "block";
                }, 500);
            }
        };
    }

    document.getElementById("repetir").onclick = function () {
        location.reload();
    };
    document.getElementById("voltar").onclick = function () {
        window.open("index.html", "_self");
    };

    if (result == "win")
        window.open("nivel2.html", "_self");
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


/************************************************** MENU PAUSA ********************************************************/

function pausa() {
    arrayTeclas = [];
    zePausaMov = 1;
    som_pausa.play();
    som_fundo.pause();
    if (teclaCima == " ")
        document.getElementById("result_saltar").innerHTML = "space";
    else
        document.getElementById("result_saltar").innerHTML = teclaCima;
    if (teclaDireita == " ")
        document.getElementById("result_frente").innerHTML = "space";
    else
        document.getElementById("result_frente").innerHTML = teclaDireita;
    if (teclaEsquerda == " ")
        document.getElementById("result_tras").innerHTML = "space";
    else
        document.getElementById("result_tras").innerHTML = teclaEsquerda;
    if (teclaTiro == " ")
        document.getElementById("result_shoot").innerHTML = "space";
    else
        document.getElementById("result_shoot").innerHTML = teclaTiro;
    if (teclaPausa == " ")
        document.getElementById("result_pausa").innerHTML = "space";
    else
        document.getElementById("result_pausa").innerHTML = teclaPausa;
    if (teclaBaixo == " ")
        document.getElementById("result_baixo").innerHTML = "space";
    else
        document.getElementById("result_baixo").innerHTML = teclaBaixo;
    document.getElementById("menu1").style.left = 250 + "px";
    document.getElementById("menu1").style.top = 0 + "px";
    document.getElementById("menu2").style.left = 650 + "px";
    document.getElementById("menu2").style.top = 100 + "px";
    document.getElementById("menu3").style.left = 250 + "px";
    document.getElementById("menu3").style.top = 350 + "px";
    document.getElementById("menu4").style.left = 0 + "px";
    document.getElementById("menu4").style.top = 100 + "px";
    document.getElementById("ze_pausa").style.position = "absolute";
    document.getElementById("ze_pausa").style.left = Math.round((700 - 66) / 2) + "px";
    document.getElementById("ze_pausa").style.top = Math.round((400 - 100) / 2) + "px";

    document.onkeydown = function (event) {
        addTecla_pausa(event);
    };

    document.onkeyup = function (event) {
        removeTecla_pausa(event);
    };
    intteclas_pausa = setInterval(processaTecla_pausa, 1000 / 60);
    intervalo = setInterval(posicaoRatoPausa, 1000 / 60);


    document.getElementById("img_voltar").onclick = function () {
        arrayTeclas_pausa = [];
        zePausaMov = 0;
        som_fundo.play();
        som_pausa.pause();
        document.getElementById("main_pausa").style.display = "none";
        clearInterval(intteclas_pausa);
        clearInterval(intervalo);
        timerJogo = setInterval(function () {
            countTime++;
        }, 1000);
        intTiro = setInterval(function () {
            if (tiroativo)
                moverTiro();
        }, 1000 / 60);
        spritesMov = setInterval(sprites, 1000 / 60);
        document.onkeydown = function (event) {
            addTecla(event);
        };
        document.onkeyup = function (event) {
            removeTecla(event);
        };
        intteclas = setInterval(processaTecla, 1000 / 60);
        if (sessionStorage["modelo"] == "rato")
            intervalo = setInterval(posicaoRato, 1000 / 60);

    };
    document.getElementById("img_definicoes").onclick = function () {
        definicoes();
    };
    document.getElementById("img_sair").onclick = function () {
        window.open("index.html", "_self");
    };
    document.getElementById("img_banco").onclick = function () {
        banco();
    };
}

function definicoes() {
    slider_som_fundo = document.getElementById("volumeslider_ambiente");
    slider_som_efeitos = document.getElementById("volumeslider_efeitos");

    //Mostrar de maneira correta as teclas nos input's
    if (document.getElementById("result_saltar").innerHTML == "space")
        teclaCima = " ";
    else
        teclaCima = document.getElementById("result_saltar").innerHTML;

    if (document.getElementById("result_frente").innerHTML == "space")
        teclaDireita = " ";
    else
        teclaDireita = document.getElementById("result_frente").innerHTML;

    if (document.getElementById("result_tras").innerHTML == "space")
        teclaEsquerda = " ";
    else
        teclaEsquerda = document.getElementById("result_tras").innerHTML;

    if (document.getElementById("result_shoot").innerHTML == "space")
        teclaTiro = " ";
    else
        teclaTiro = document.getElementById("result_shoot").innerHTML;

    if (document.getElementById("result_pausa").innerHTML == "space")
        teclaPausa = " ";
    else
        teclaPausa = document.getElementById("result_pausa").innerHTML;

    if (document.getElementById("result_baixo").innerHTML == "space")
        teclaBaixo = " ";
    else
        teclaBaixo = document.getElementById("result_baixo").innerHTML;
    document.getElementById("definicoes").style.position = "absolute";
    document.getElementById("definicoes").style.left = Math.round((innerWidth - 1100) / 2) + "px";
    document.getElementById("definicoes").style.top = Math.round((innerHeight - 600) / 2) + "px";
    document.getElementById("definicoes").style.display = "block";
    document.getElementById("hover").onmouseover = function () {
        document.getElementById("img_hover").style.display = "block";
    };
    document.getElementById("hover").onmouseout = function () {
        document.getElementById("img_hover").style.display = "none";
    };
    document.getElementById("hover").onclick = function () {
        teclaCima = sessionStorage["result_saltar"];
        teclaDireita = sessionStorage["result_frente"];
        teclaEsquerda = sessionStorage["result_tras"];
        teclaBaixo = sessionStorage["result_baixo"];
        teclaTiro = sessionStorage["result_shoot"];
        teclaPausa = sessionStorage["result_pausa"];
        sessionStorage["volumeSliderFundo"] = parseInt(document.getElementById("volumeslider_ambiente").value);
        sessionStorage["volumeSliderEfeitos"] = parseInt(document.getElementById("volumeslider_efeitos").value);
        document.getElementById("definicoes").style.display = "none";
    };

    document.getElementById("saltar").onclick = function () {
        estadoPremir = true;
        document.getElementById("blur_menu").style.display = "block";
        document.getElementById("divs_def").style.display = "block";
        document.getElementById("divs_def").src = "images/menu_pausa/divs_definir/defin_saltar.png";
        button = "result_saltar";
    };
    document.getElementById("frente").onclick = function () {
        estadoPremir = true;
        document.getElementById("blur_menu").style.display = "block";
        document.getElementById("divs_def").style.display = "block";
        document.getElementById("divs_def").src = "images/menu_pausa/divs_definir/defin_frente.png";
        button = "result_frente";
    };
    document.getElementById("tras").onclick = function () {
        estadoPremir = true;
        document.getElementById("blur_menu").style.display = "block";
        document.getElementById("divs_def").style.display = "block";
        document.getElementById("divs_def").src = "images/menu_pausa/divs_definir/defin_tras.png";
        button = "result_tras";
    };
    document.getElementById("shoot").onclick = function () {
        estadoPremir = true;
        document.getElementById("blur_menu").style.display = "block";
        document.getElementById("divs_def").style.display = "block";
        document.getElementById("divs_def").src = "images/menu_pausa/divs_definir/defin_disparar.png";
        button = "result_shoot";
    };
    document.getElementById("pausa").onclick = function () {
        estadoPremir = true;
        document.getElementById("blur_menu").style.display = "block";
        document.getElementById("divs_def").style.display = "block";
        document.getElementById("divs_def").src = "images/menu_pausa/divs_definir/defin_pausa.png";
        button = "result_pausa";
    };
    document.getElementById("baixo").onclick = function () {
        estadoPremir = true;
        document.getElementById("blur_menu").style.display = "block";
        document.getElementById("divs_def").style.display = "block";
        document.getElementById("divs_def").src = "images/menu_pausa/divs_definir/defin_baixo.png";
        button = "result_baixo";
    };

    window.onkeydown = function (event) {
        if (estadoPremir == true)
            comandos(event, button);
    };


    slider_som_efeitos.addEventListener("change", setvolumeEfeitos, false);

    slider_som_fundo.addEventListener("change", setvolumeFundo, false);

    function setvolumeEfeitos() {
        for (var b = 0; b < arraySounds.length; b++) {
            arraySounds[b].volume = slider_som_efeitos.value / 100;
            sessionStorage["volumeEfeitos"] = arraySounds[b].volume;
        }
    }

    function setvolumeFundo() {
        som_fundo.volume = slider_som_fundo.value / 100;
        som_pausa.volume = slider_som_fundo.value / 100;
        sessionStorage["volumeFundo"] = som_fundo.volume;
    }
}

function banco() {
    document.getElementById("banco").style.position = "absolute";
    document.getElementById("banco").style.left = Math.round((innerWidth - 1100) / 2) + "px";
    document.getElementById("banco").style.top = Math.round((innerHeight - 600) / 2) + "px";
    document.getElementById("banco").style.display = "block";

    document.getElementById("tina_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "block";
        document.getElementById("ketchup_txt").style.display = "none";
        document.getElementById("vodka_txt").style.display = "none";
        document.getElementById("adolfo_txt").style.display = "none";
        document.getElementById("membro_txt").style.display = "none";
        document.getElementById("vegetalia_txt").style.display = "none";
        document.getElementById("arma_txt").style.display = "none";
        document.getElementById("alien_txt").style.display = "none";
    };
    document.getElementById("ketchup_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "none";
        document.getElementById("ketchup_txt").style.display = "block";
        document.getElementById("vodka_txt").style.display = "none";
        document.getElementById("adolfo_txt").style.display = "none";
        document.getElementById("membro_txt").style.display = "none";
        document.getElementById("vegetalia_txt").style.display = "none";
        document.getElementById("arma_txt").style.display = "none";
        document.getElementById("alien_txt").style.display = "none";
    };
    document.getElementById("vodka_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "none";
        document.getElementById("ketchup_txt").style.display = "none";
        document.getElementById("vodka_txt").style.display = "block";
        document.getElementById("adolfo_txt").style.display = "none";
        document.getElementById("membro_txt").style.display = "none";
        document.getElementById("vegetalia_txt").style.display = "none";
        document.getElementById("arma_txt").style.display = "none";
        document.getElementById("alien_txt").style.display = "none";
    };
    document.getElementById("adolfo_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "none";
        document.getElementById("ketchup_txt").style.display = "none";
        document.getElementById("vodka_txt").style.display = "none";
        document.getElementById("adolfo_txt").style.display = "block";
        document.getElementById("membro_txt").style.display = "none";
        document.getElementById("vegetalia_txt").style.display = "none";
        document.getElementById("arma_txt").style.display = "none";
        document.getElementById("alien_txt").style.display = "none";
    };
    document.getElementById("membro_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "none";
        document.getElementById("ketchup_txt").style.display = "none";
        document.getElementById("vodka_txt").style.display = "none";
        document.getElementById("adolfo_txt").style.display = "none";
        document.getElementById("membro_txt").style.display = "block";
        document.getElementById("vegetalia_txt").style.display = "none";
        document.getElementById("arma_txt").style.display = "none";
        document.getElementById("alien_txt").style.display = "none";
    };
    document.getElementById("vegetalia_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "none";
        document.getElementById("ketchup_txt").style.display = "none";
        document.getElementById("vodka_txt").style.display = "none";
        document.getElementById("adolfo_txt").style.display = "none";
        document.getElementById("membro_txt").style.display = "none";
        document.getElementById("vegetalia_txt").style.display = "block";
        document.getElementById("arma_txt").style.display = "none";
        document.getElementById("alien_txt").style.display = "none";
    };
    document.getElementById("arma_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "none";
        document.getElementById("ketchup_txt").style.display = "none";
        document.getElementById("vodka_txt").style.display = "none";
        document.getElementById("adolfo_txt").style.display = "none";
        document.getElementById("membro_txt").style.display = "none";
        document.getElementById("vegetalia_txt").style.display = "none";
        document.getElementById("arma_txt").style.display = "block";
        document.getElementById("alien_txt").style.display = "none";
    };
    document.getElementById("alien_btn").onclick = function() {
        document.getElementById("tina_txt").style.display = "none";
        document.getElementById("ketchup_txt").style.display = "none";
        document.getElementById("vodka_txt").style.display = "none";
        document.getElementById("adolfo_txt").style.display = "none";
        document.getElementById("membro_txt").style.display = "none";
        document.getElementById("vegetalia_txt").style.display = "none";
        document.getElementById("arma_txt").style.display = "none";
        document.getElementById("alien_txt").style.display = "block";
    };
    document.getElementById("banco_voltar").onclick = function() {
        document.getElementById("banco").style.display = "none";
    };
};

function comandos(evt, button) {
    var tecla_menu = evt.key;
    if (tecla_menu == " ")
        document.getElementById(button).innerHTML = "space";
    else
        document.getElementById(button).innerHTML = tecla_menu;
    sessionStorage[button] = tecla_menu;
    document.getElementById("blur_menu").style.display = "none";
    document.getElementById("divs_def").style.display = "none";
    estadoPremir = false;
}

function processaTecla_pausa() {
    var zeLeft = parseInt(document.getElementById("ze_pausa").style.left);
    var zeTop = parseInt(document.getElementById("ze_pausa").style.top);

    if (zePausaMov == 1) {
        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            switch (arrayTeclas_pausa[i]) {
                case teclaDireita:
                    if (zeLeft + 65 <= 700) {
                        if (facing_pausa != "right") {
                            facing_pausa = "right";
                            document.getElementById("ze_pausa").src = "images/menu_pausa/ze_pequeno.png"
                        }
                        document.getElementById("ze_pausa").style.left = zeLeft + 5 + "px";
                    }
                    break;

                case teclaEsquerda:
                    if (zeLeft >= 5) {
                        if (facing_pausa != "left") {
                            facing_pausa = "left";
                            document.getElementById("ze_pausa").src = "images/menu_pausa/ze_pequeno_esq.png"
                        }
                        document.getElementById("ze_pausa").style.left = zeLeft - 5 + "px";
                    }
                    break;
                case teclaCima:
                    if (zeTop >= 5) {
                        document.getElementById("ze_pausa").style.top = zeTop - 5 + "px";
                    }
                    break;
                case teclaBaixo:
                    if (zeTop + 105 <= 400) {
                        document.getElementById("ze_pausa").style.top = zeTop + 5 + "px";
                    }
                    break;
                case "Enter":
                    switch (menuEstado) {
                        case 1:
                            window.open("index.html", "_self");
                            break;
                        case 2:
                            arrayTeclas_pausa = [];
                            zePausaMov = 0;
                            som_fundo.play();
                            som_pausa.pause();
                            document.getElementById("main_pausa").style.display = "none";
                            clearInterval(intteclas_pausa);
                            timerJogo = setInterval(function () {
                                countTime++;
                            }, 1000);
                            intTiro = setInterval(function () {
                                if (tiroativo)
                                    moverTiro();
                            }, 1000 / 60);
                            spritesMov = setInterval(sprites, 1000 / 60);
                            document.onkeydown = function (event) {
                                addTecla(event);
                            };
                            document.onkeyup = function (event) {
                                removeTecla(event);
                            };
                            intteclas = setInterval(processaTecla, 1000 / 60);
                            if (sessionStorage["modelo"] == "rato")
                                intervalo = setInterval(posicaoRato, 1000 / 60);

                            break;
                        case 3:
                            definicoes();
                            break;
                        case 4:
                            banco();
                            break;
                    }
                    break;
            }
        }
        detetaColisao_pausa();
    }
}

function detetaColisao_pausa() {
    var zeLeft = parseInt(document.getElementById("ze_pausa").style.left);
    var zeTop = parseInt(document.getElementById("ze_pausa").style.top);
    menu1Left = parseInt(document.getElementById("menu1").style.left);
    menu1Top = parseInt(document.getElementById("menu1").style.top);
    menu2Left = parseInt(document.getElementById("menu2").style.left);
    menu2Top = parseInt(document.getElementById("menu2").style.top);
    menu3Left = parseInt(document.getElementById("menu3").style.left);
    menu3Top = parseInt(document.getElementById("menu3").style.top);
    menu4Left = parseInt(document.getElementById("menu4").style.left);
    menu4Top = parseInt(document.getElementById("menu4").style.top);

    if ((facing == "right" && zeTop <= menu1Top + 20 && zeTop + 5 >= menu1Top && zeLeft + 30 >= menu1Left && zeLeft <= menu1Left + 160) ||
        (facing == "left" && zeTop <= menu1Top + 20 && zeTop + 5 >= menu1Top && zeLeft >= menu1Left && zeLeft <= menu1Left + 160)) {
        menuEstado = 1;
        document.getElementById("img_sair").style.visibility = "visible";
    }
    else
        document.getElementById("img_sair").style.visibility = "hidden";

    if ((facing == "right" && zeTop + 90 >= menu3Top && zeTop + 100 <= menu3Top + 50 && zeLeft + 20 >= menu3Left && zeLeft <= menu3Left + 160) ||
        (facing == "left" && zeTop + 90 >= menu3Top && zeTop + 100 <= menu3Top + 50 && zeLeft >= menu3Left && zeLeft <= menu3Left + 160)) {
        menuEstado = 2;
        document.getElementById("img_voltar").style.visibility = "visible";
    }
    else
        document.getElementById("img_voltar").style.visibility = "hidden";

    if ((facing == "right" && zeTop + 75 >= menu2Top && zeTop <= menu2Top + 180 && zeLeft + 60 >= menu2Left) ||
        (facing == "left" && zeTop + 75 >= menu2Top && zeTop <= menu2Top + 180 && zeLeft >= menu2Left)) {
        menuEstado = 3;
        document.getElementById("img_definicoes").style.visibility = "visible";
    }
    else
        document.getElementById("img_definicoes").style.visibility = "hidden";

    if ((facing == "right" && zeTop + 80 >= menu4Top && zeTop <= menu4Top + 180 && zeLeft <= menu4Left + 40) ||
        (facing == "left" && zeTop + 80 >= menu4Top && zeTop <= menu4Top + 180 && zeLeft <= menu4Left + 40)) {
        menuEstado = 4;
        document.getElementById("img_banco").style.visibility = "visible";
    }
    else
        document.getElementById("img_banco").style.visibility = "hidden";
}

function addTecla_pausa(evt) {
    var tecla = evt.key;
    var presente = false;

    for (var i = 0; i < arrayTeclas_pausa.length; i++) {
        if (arrayTeclas_pausa[i] == tecla) {
            presente = true;
        }
    }
    if (presente == false) {
        arrayTeclas_pausa.push(tecla);
    }
}

function removeTecla_pausa(evt) {
    var tecla = evt.key;
    for (var i = 0; i < arrayTeclas_pausa.length; i++) {
        if (arrayTeclas_pausa[i] == tecla) {
            arrayTeclas_pausa.splice(i, 1);
        }
    }
}

/**********************************************************************************************************************/

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

    var inimigo1X = parseInt(document.getElementById("inimigo1").style.left);
    var inimigo2X = parseInt(document.getElementById("inimigo2").style.left);
    var inimigo3X = parseInt(document.getElementById("inimigo3").style.left);
    var inimigo4X = parseInt(document.getElementById("inimigo4").style.left);
    var zeLeft = parseInt(document.getElementById("ze").style.left);
    var checkpointX = parseInt(document.getElementById("check").style.left);

    if (pos.x >= (1100 / 2) + 200 && pos.x < 1100 && zeLeft + 75 < 1100 && tileset.some(colisaoLateralRight) != true) {
        document.getElementById("ze").style.left = zeLeft + 5 + "px";
        zeX += 5;
        if (facing != "right") {
            facing = "right";
            //document.getElementById("ze").src = "images/ze.png";
        }
        if (zeX >= 10270) { //Quando está perto do limite da última parte, o background e as plataformas param
            if (time == true)
                document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + "px";
            document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) + "px";
            document.getElementById("inimigo1").style.left = parseInt(document.getElementById("inimigo1").style.left) + "px";
            document.getElementById("inimigo2").style.left = parseInt(document.getElementById("inimigo2").style.left) + "px";
            document.getElementById("inimigo3").style.left = parseInt(document.getElementById("inimigo3").style.left) + "px";
            document.getElementById("inimigo4").style.left = parseInt(document.getElementById("inimigo4").style.left) + "px";
            document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) + "px";
            document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) + "px";
            document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) + "px";
        } else if (zeLeft + 100 >= 1100 * 0.4) {
            document.getElementById("ze").style.left = zeLeft + "px";
            document.getElementById("check").style.left = checkpointX - 5 + "px";
            document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) - 2 + "px";
            document.getElementById("inimigo1").style.left = inimigo1X - 5 + "px";
            document.getElementById("inimigo2").style.left = inimigo2X - 5 + "px";
            document.getElementById("inimigo3").style.left = inimigo3X - 5 + "px";
            document.getElementById("inimigo4").style.left = inimigo4X - 5 + "px";
            document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) - 5 + "px";
            document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) - 5 + "px";
            document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) - 5 + "px";
            if (time == true)
                document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) - 5 + "px";
        }

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaDireita) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaDireita) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaDireita);
        }

    }

    if (pos.x <= (1100 / 2) - 200 && tileset.some(colisaoLateralLeft) != true) {
        document.getElementById("ze").style.left = zeLeft - 5 + "px";
        zeX -= 5;
        if (facing != "left") {
            facing = "left";
            //document.getElementById("ze").src = "images/ze_esquerda.png";
        }
        if (parseInt(document.getElementById("background").style.left) <= 0 && zeLeft <= 20) {
            zeX = 45;
            document.getElementById("space").style.left = 0;
            document.getElementById("plat_design").style.left = 0;
            document.getElementById("background").style.left = 0;
            document.getElementById("plataformas").style.left = 0;
            document.getElementById("inimigo1").style.left = parseInt(document.getElementById("inimigo1").style.left) + "px";
            document.getElementById("inimigo2").style.left = parseInt(document.getElementById("inimigo2").style.left) + "px";
            document.getElementById("inimigo3").style.left = parseInt(document.getElementById("inimigo3").style.left) + "px";
            document.getElementById("inimigo4").style.left = parseInt(document.getElementById("inimigo4").style.left) + "px";
            if (time == true)
                document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + "px";
            document.getElementById("ze").style.left = zeLeft + "px";
        } else if (zeX + 75 >= 10300 && zeX <= 11000) {
            document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) + "px";
            document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) + "px";
            document.getElementById("inimigo1").style.left = parseInt(document.getElementById("inimigo1").style.left) + "px";
            document.getElementById("inimigo2").style.left = parseInt(document.getElementById("inimigo2").style.left) + "px";
            document.getElementById("inimigo3").style.left = parseInt(document.getElementById("inimigo3").style.left) + "px";
            document.getElementById("inimigo4").style.left = parseInt(document.getElementById("inimigo4").style.left) + "px";
            document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) + "px";
            document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) + "px";
            if (time == true)
                document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + "px";
        } else if (parseInt(document.getElementById("background").style.left) + zeLeft < zeLeft) {
            document.getElementById("ze").style.left = zeLeft + "px";
            document.getElementById("check").style.left = checkpointX + 5 + "px";
            document.getElementById("space").style.left = parseInt(document.getElementById("space").style.left) + 2 + "px";
            document.getElementById("inimigo1").style.left = inimigo1X + 5 + "px";
            document.getElementById("inimigo2").style.left = inimigo2X + 5 + "px";
            document.getElementById("inimigo3").style.left = inimigo3X + 5 + "px";
            document.getElementById("inimigo4").style.left = inimigo4X + 5 + "px";
            document.getElementById("plat_design").style.left = parseInt(document.getElementById("plat_design").style.left) + 5 + "px";
            document.getElementById("background").style.left = parseInt(document.getElementById("background").style.left) + 5 + "px";
            document.getElementById("plataformas").style.left = parseInt(document.getElementById("plataformas").style.left) + 5 + "px";
            if (time == true)
                document.getElementById("time").style.left = parseInt(document.getElementById("time").style.left) + 5 + "px";
        }

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaEsquerda) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaEsquerda) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaEsquerda);
        }


    }


    if (pos.y >= 0 && pos.y <= 200 && pos.x < 1100 && !jumping && tileset.some(colisaoBaixo) == true) {
        jump();


        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaCima) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaCima) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaCima);
        }
    }

    if (pos.y >= 400 && pos.y <= 600 && pos.x < 1100) {

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaBaixo) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaBaixo) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaBaixo);
        }
    }
    console.log(pos.y);
}

function posicaoRatoPausa() {
    var pos = mousePos;
    if (!pos) {
    }
    else {
        moverZeRatoPausa(pos);
    }

    if (tiroativo) {
        moverTiro();
    }
}

function moverZeRatoPausa(pos) {
    if (pos.x >= (1100 / 2) + 200 && pos.x < 1100) {

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaDireita) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaDireita) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaDireita);
        }

    }

    if (pos.x <= (1100 / 2) - 200) {

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaEsquerda) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaEsquerda) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaEsquerda);
        }


    }


    if (pos.y >= 0 && pos.y <= 200 && pos.x < 1100 && !jumping && tileset.some(colisaoBaixo) == true) {

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaCima) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaCima) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaCima);
        }
    }

    if (pos.y >= 400 && pos.y <= 600 && pos.x < 1100) {

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] != teclaBaixo) {
                arrayTeclas_pausa.splice(i, 1);
            }
        }
        var presente = false;

        for (var i = 0; i < arrayTeclas_pausa.length; i++) {
            if (arrayTeclas_pausa[i] == teclaBaixo) {
                presente = true;
            }
        }
        if (presente == false) {
            arrayTeclas_pausa.push(teclaBaixo);
        }
    }
    if (pos.y >= 200 && pos.y <= 400 && pos.x < 1100 -200 && pos.x > 200) {
        arrayTeclas_pausa = [];
    }

}