var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function votacao(req, res) {
    var voto = req.body.voto;

    usuarioModel.votacao(voto)
        .then(function (resultado) {
                res.status(200).json(resultado);
            
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarVoto(req, res) {
    var voto = req.body.id;
    var usuario = req.body.usuario;

    usuarioModel.atualizarVoto(voto, usuario)
        .then(function (resultado) {
                res.status(200).json(resultado);
            
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function analise(req, res) {
    
    usuarioModel.analise()
        .then(function (resultado) {
                res.status(200).json(resultado);
            
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha est?? indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inv??lido(s)");
                    } else {
                        res.status(403).send("Mais de um usu??rio com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var senha = req.body.senhaServer;

    // Fa??a as valida????es dos valores
    if (email == undefined) {
        res.status(400).send("Seu email est?? undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome est?? undefined!");
    }else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome est?? undefined!");
    }
     else if (senha == undefined) {
        res.status(400).send("Sua senha est?? undefined!");
    } else {
        
        // Passe os valores como par??metro e v?? para o arquivo usuarioModel.js
        usuarioModel.cadastrar(email,nome,sobrenome , senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    votacao,
    atualizarVoto,
    analise
}