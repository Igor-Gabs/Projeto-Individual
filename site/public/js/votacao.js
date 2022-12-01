function votacao(){
    var voto = sel_vot.value

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
        }
    })
}

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

function analise(){
    fetch("/usuarios/analise").then(function(resposta){
        if(resposta.ok){
            resposta.json().then((response)=>{
                mais_votado.innerHTML = response[0].nome
                qtd_votos.innerHTML = response[0].qtdVotos
            })
        }
    })

}

analise()