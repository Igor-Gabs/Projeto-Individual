var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.put("/votacao", function (req, res) {
    usuarioController.votacao(req, res);
});

router.put("/atualizarVoto", function (req, res) {
    usuarioController.atualizarVoto(req, res);
});

router.get("/analise", function (req, res) {
    usuarioController.analise(req, res);
});


module.exports = router;