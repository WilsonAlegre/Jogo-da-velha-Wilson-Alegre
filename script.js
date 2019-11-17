/**
 * VARIAVEIS
 */
var jogador = 1;
var jogadas = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var jogadasVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var venceu = false;
var deuVelha = false;
var jogadores = [];
var corAtual = 'verde';
var temaDeCores = {
    verde : {
        backgroundColor : 'rgb(39, 56, 50)',
        btnRecomecar : 'rgb(0, 82, 75)',
        tdBackGround : 'rgb(62, 117, 108)',
        tdBorder : 'rgb(30, 190, 190)',
        trFontColor : 'rgb(238, 215, 8)',
        fontColor : 'rgb(255, 255, 255)',
        overPosit : 'rgb(62, 200, 108)',
        textColor : 'rgb(255, 255, 255)',
        bordaBtn : '1px solid rgb(255, 255, 255)'
    },

    roxo : {
        backgroundColor : 'rgb(130, 10, 150)',
        btnRecomecar : 'rgb(90, 7, 90)',
        tdBackGround : 'rgb(255, 0, 255)',
        tdBorder : 'rgb(255, 175, 240)',
        trFontColor : 'rgb(65, 0, 100)',
        fontColor : 'rgb(255, 255, 255)',
        overPosit : 'rgb(255, 175, 255)',
        textColor : 'rgb(255, 255, 255)',
        bordaBtnCores : '1px solid rgb(255, 255, 255)'
    },

    azul : {
        backgroundColor : 'rgb(30, 25, 150)',
        btnRecomecar : 'rgb(12, 4, 90)',
        tdBackGround : 'rgb(0, 140, 255)',
        tdBorder : 'rgb(80, 180, 220)',
        trFontColor : 'rgb(0, 255, 255)',
        fontColor : 'rgb(255, 255, 255)',
        overPosit : 'rgb(30, 10, 220)',
        textColor : 'rgb(255, 255, 255)',
        bordaBtn : '1px solid rgb(255, 255, 255)'
    },

    vermelho : {
        backgroundColor : 'rgb(95, 0, 0)',
        btnRecomecar : 'rgb(255, 0, 0)',
        tdBackGround : 'rgb(170, 0, 0)',
        tdBorder : 'rgb(100, 0, 0)',
        trFontColor : 'rgb(255, 255, 255)',
        fontColor : 'rgb(255, 255, 255)',
        overPosit : 'rgb(255, 100, 100)',
        textColor : 'rgb(255, 255, 255)',
        bordaBtn : '1px solid rgb(255, 255, 255)'
    },

    branco : {
        backgroundColor : 'rgb(225, 225, 225)',
        btnRecomecar : 'rgb(150, 150, 150)',
        tdBackGround : 'rgb(200, 200, 200)',
        tdBorder : 'rgb(130, 130, 130)',
        trFontColor : 'rgb(0, 0, 0)',
        fontColor : 'rgb(255, 255, 255)',
        overPosit : 'rgb(255, 255, 255)',
        textColor : 'rgb(0, 0, 0)',
        bordaBtn : '1px solid rgb(0, 0, 0)'
    }
};

// FUNCOES 

/**
 * FUNCAO QUE ATRIBUI NOME  AOS JOGADORES
 */
function geraNomes(){
    jogadores[0] = prompt('Digite o nome do jogador 1');
    jogadores[1] = prompt('Digite o nome do jogador 2');
    
    setTimeout(function(){
        for(let i = 0; i < jogadores.length; i++){
            if (jogadores[i] == undefined || jogadores[i].length == 0 || jogadores[i] === ''){
                jogadores[i] = i+1;
            }
        }
        document.getElementById('infoJogo').innerText = `Jogador da vez: ${jogadores[jogador-1]}`;
    }, 150);
}

/**
 * FUNCAO EXECUTADA QUANDO UMA POSICAO É SELECIONADA
 * @param {id do campo}
 */
function clicou(campo){
    var pos = parseInt(campo) -1;
    if(!venceu && !deuVelha){
        if(jogadas[pos] == '0'){
            if(jogador == 1){
                document.getElementById(campo).innerText = 'X'
                jogadas.splice(pos, 1, 1)
            } else {
                document.getElementById(campo).innerText = 'O'
                jogadas.splice(pos, 1, 2)
            }
            setTimeout(function() { verificaVencedor(); }, 150); 
        } else {
            alert('Esse campo já foi escolhido! Tente outro.')
        } 
    } else {
        if (venceu){
            alert(`${jogadores[jogador-1]} venceu! Clique em Recomeçar para iniciar um novo jogo.`);
        } else {
            alert('Deu velha! Clique em Recomeçar para iniciar um novo jogo.')
        }
    }
}

/**
 * FUNCAO QUE VERIFICA E NOTIFICA SE HA VENCEDOR
 */
function verificaVencedor(){
    var camposAcertados = 0;
    var jogada = 0
    if (jogador != undefined){
        for (jogada; jogada < jogadasVencedoras.length; jogada++){
            for (var posicao = 0; posicao < 3; posicao++){
                index = jogadasVencedoras[jogada][posicao]
                if (jogadas[index] == jogador){
                    camposAcertados++
                }
            }
            if (camposAcertados == 3){
                venceu = true;
                break;
            }
            camposAcertados =  0;
        }
    } 

    if (venceu){
        document.getElementById('infoJogo').innerText = `Fim de jogo. ${jogadores[jogador-1]} venceu a partida.`;
        corInicialPosicoes();
        for(let i = 0; i < 3; i++){
           idPosicao = jogadasVencedoras[jogada][i];
           document.getElementById((parseInt(idPosicao) + 1).toString()).style.backgroundColor = temaDeCores[corAtual].overPosit;
        }
    } else {
        if (jogador == 1){
            jogador = 2;
        } else {
            jogador = 1;
        }
        document.getElementById('infoJogo').innerText = `Jogador da vez: ${jogadores[jogador-1]}`;
        verificaVelha();
    }
}

/**
 * FUNCAO QUE VERIFICA E NOTIFICA SE DEU VELHA
 */
function verificaVelha(){
    var contador = 0;
    for(let pos in jogadas){
        if(jogadas[pos] != 0){
            contador++;
        }
    }
    if (contador == 9){
        deuVelha = true;
        document.getElementById('infoJogo').innerText = 'Fim de jogo. Deu velha.';
        corInicialPosicoes();
        setTimeout(function(){
            alert('Deu velha! Clique em Recomeçar para iniciar um novo jogo.')
        }, 100);
    }
}

/**
 * FUNCAO QUE LIMPA AS POSICOES
 */
function limparTextoPosicoes(){
    let id;
    for(var i = 0; i < 9; i++){
        jogadas.splice(i, 1, 0);
        id = (i+1).toString();
        document.getElementById(id).innerText = '';
    }
}

/**
 * FUNCAO QUE VOLTA A COR DAS POSICOES 
 */
function corInicialPosicoes(){
    let id;
    for(var i = 0; i < 9; i++){
        jogadas.splice(i, 1, 0);
        id = (i+1).toString();
        document.getElementById(id).style.backgroundColor = temaDeCores[corAtual].tdBackGround;
    }
}

/**
 * FUNCAO QUE MUDA A COR DO BOTAO "RECOMECAR" QUANDO O MOUSE PASSA POR CIMA
 */
function overButton(){
    document.getElementById('btnRestart').style.backgroundColor = temaDeCores[corAtual].overPosit;
}

/**
 * FUNCAO QUE VOLTA A COR DO BOTÃO AO NORMAL
 */
function outButton(){
    document.getElementById('btnRestart').style.backgroundColor = temaDeCores[corAtual].btnRecomecar;
}

/**
 * FUNCAO QUE MUDA A COR DA POSIÇÃO QUANDO O MOUSE PASSA POR CIMA
 */
function overPosition(id){
    if (!venceu && !deuVelha){
        document.getElementById(id).style.backgroundColor = temaDeCores[corAtual].overPosit;
    }
}

/**
 * FUNCAO QUE VOLTA  A COR DA POSICAO AO NORMAL
 */
function outPosition(id){
    if (!venceu && !deuVelha){
        document.getElementById(id).style.backgroundColor = temaDeCores[corAtual].tdBackGround;
    }
}

/**
 * FUNCAO QUE ALTERA AS CORES DO JOGO
 * @param id 
 */
function alteraTema(id) {
    if (!venceu && !deuVelha){
        corAtual = id;
        document.getElementById('body').style.backgroundColor = temaDeCores[id].backgroundColor;
        posicoes = document.getElementsByClassName('posicao');
        for (let i = 0; i < posicoes.length; i++){
            posicoes[i].style.backgroundColor = temaDeCores[id].tdBackGround;
            posicoes[i].style.borderColor = temaDeCores[id].tdBorder;
        }
        posicoesTr = document.getElementsByTagName('tr');
        for (let i = 0; i < 3; i++){
            posicoesTr[i].style.color = temaDeCores[id].trFontColor;
        }
        textos = document.getElementsByClassName('texto');
        for (let i = 0; i < textos.length; i++){
            textos[i].style.color = temaDeCores[id].textColor;
        }
        bordas = document.getElementsByClassName('borderColor');
        for (let i = 0; i < bordas.length; i++){
            bordas[i].style.border = temaDeCores[id].bordaBtn;
        }
        document.getElementById('btnRestart').style.backgroundColor = temaDeCores[id].btnRecomecar;
    }
}

/**
 * FUNCAO QUE MUDA A COR DO BOTAO DE TEMA QUANDO O MOUSE PASSA POR CIMA
 */
function overCor(id){
    if (!venceu && !deuVelha){
        switch (id) {
            case 'verde':
                document.getElementById(id).style.backgroundColor = 'rgb(62, 200, 108)';
                break;
            case 'roxo':
                document.getElementById(id).style.backgroundColor = 'rgb(180, 70, 255)';
                break;
            case 'azul':
                document.getElementById(id).style.backgroundColor = 'rgb(30, 10, 220)';
                break;
            case 'vermelho':
                document.getElementById(id).style.backgroundColor = 'rgb(255, 120, 120)';
                break;
            case 'branco':
                document.getElementById(id).style.backgroundColor = 'rgb(150, 150, 150)';
                break;
        }
    }
}

/**
 * FUNCAO QUE VOLTA  A COR DO BOTAO DE TEMA AO NORMAL
 */
function outCor(id){
    if (!venceu && !deuVelha){
        switch (id) {
            case 'verde':
                document.getElementById(id).style.backgroundColor = 'rgb(0, 82, 75)';
                break;
            case 'roxo':
                document.getElementById(id).style.backgroundColor = 'rgb(90, 7, 90)';
                break;
            case 'azul':
                document.getElementById(id).style.backgroundColor = 'rgb(12, 4, 90)';
                break;
            case 'vermelho':
                document.getElementById(id).style.backgroundColor = 'rgb(190, 5, 5)';
                break;
            case 'branco':
                document.getElementById(id).style.backgroundColor = 'rgb(255, 255, 255)';
                break;
        }
    }
}

/**
 * FUNCAO QUE RESETA O JOGO PARA UMA NOVA PARTIDA
 */ 
function restart(){
    venceu = false;
    deuVelha = false;
    jogador = 1;
    document.getElementById('infoJogo').innerText = `Jogador da vez: ${jogadores[jogador-1]}`;
    geraNomes();
    limparTextoPosicoes();
    corInicialPosicoes();
} 

geraNomes();