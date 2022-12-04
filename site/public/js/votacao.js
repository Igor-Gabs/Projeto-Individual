function votacao(){
    var voto = sel_vot.value

    var fkvoto = sessionStorage.getItem('FK_USUARIO')

    if(fkvoto != 'null'){
        alert('Você ja votou!')
        return false;
    }


    fetch("/usuarios/votacao",{
        
        method: "PUT",

        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            voto
        })
    }).then(function(resposta){
        if(resposta.ok){
            console.log("funciona") 
            atualizarVoto(voto)
            analise()
            sessionStorage.FK_USUARIO = voto
        }
    })
}

name_user.innerHTML = `${sessionStorage.getItem('NOME_USUARIO')}`

function atualizarVoto(id){
    var usuario = sessionStorage.getItem('ID_USUARIO')

    fetch("/usuarios/atualizarVoto",{
        method: "PUT",

        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id,
            usuario
        })
    }).then(function(resposta){
        if(resposta.ok){
            console.log('atualizado')
        }
    })
}

var analysis = []

function analise(){
    fetch("/usuarios/analise").then(function(resposta){
        if(resposta.ok){
            resposta.json().then((response)=>{
                for(var i = 0; i < response.length; i++){
                analysis.push({
                nome:  response[0].nome,
                votos: response[0].qtdVotos
            })
        }
                mais_votado.innerHTML = analysis[0].nome
                qtd_votos.innerHTML = analysis[0].votos
        })
    }
})
}

analise()