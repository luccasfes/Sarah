confirm("Você está preparda meu amor, fiz isso para você espero que goste, iniciar?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "12/6": titulo = "12 de junho de 2022"; mensagem = "<p>Dia dos namorados, um dos meus dias favoritos com certeza, fomos em um restaurante, vinho na varanda, café da manhã, passeio no shopping sorvete, jogos, você estava extremamente linda, como sempre é.</p>";break;
            case "5/7": titulo = "05 de Julho de 2022"; mensagem = "<p>Fomos na torre de Tv ter um pique-nique e você estava tão fofinha, estava com aquele macacão e um dos meus vídeos favoritos e você girando e sorrindo, já falei que sou apaixonado no seu sorriso ?!</p>";break;
            case "10/2": titulo = "10 de Fevereiro de 2021"; mensagem = "<p>Primeira vez que dormimos juntos, que eu achei a coisa mais fofa do mundo do meu lado quando acordei, é mds como eu queria dormir todos os dias do seu lado, um dia chegamos lá.</p>";break;
            case "22/2": titulo = "22 de Fevereiro de 2021"; mensagem = "<p>O início, o dia que eu quis te ter ao meu lado todos os dias, o dia que eu olhei nos seus olhos la pras umas 21h ou 22h e falei quase gaguejando, mas feliz se queria namorar comigo. A partir dai, esse dia virou um dos mais importantes da minha vida.</p>";break;
            case "22/22": titulo = "22 de Fevereiro de vários meses mas principalmente de 1 ano e de 2 anos"; mensagem = "<p>pra mim, esse é o meu dia favorito de todos os meses, mas quando completamos mais um ano juntos ele se torna mais que único eu não sei dizer mas são tantos momentos a gente junto de noite em uma picina, a gente junto em um ap, eu adoro estar só eu e você pra mim é tão gostosinho, enfim, meu dia favorito.</p>";break;
            case "10/7": titulo = "10 de Julho de 2022"; mensagem = "<p>Fomos em uam festá Junina juntos, depois fomos pra casa, você dormiu em casa, tava só nos dois, pra mim foi um dia sensacional, a melhor parte quando tava só nos dois.</p>";break;
            case "15/8": titulo = "15 de Agosto de 2022"; mensagem = "<p>O dia que eu tentei fazer algo surpresa pra você, mas você acertou oq eu ia fazer, nunca mais quis te dar pista nenhuma, foi o dia da ponte dos cadeados, fomos ver patinhos, mas eu brigava pra não alimentar os pássaros e você me desobedecia, isso só me faz me apaixonar cada vez mais por vc bb</p>";break;
            case "11/9": titulo = "11 de Setembro de 2022"; mensagem = "<p>Fomso para o festival de morango, andamos muito para achar suas plantinhas, você parecia tão feliz, foi divertido, iremos de novo.</p>";break;

            case "12/23": titulo = "12 de Junho de 2022"; mensagem = "<section class='text-center'><p class='letra-vermelha'>Mais um momento pra lista<strong>Obrigado por mais um momento incrível</strong></p></section>";break;
            case "dia-dos-namorados": titulo = "12 de Junho de 2023"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>Dia em que fomos ou se eu for ancioso verá isso antes, corrigindo iremos a um concerto<br><span class='letra2 letra-vermelha'>Minha bb disse siim</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}