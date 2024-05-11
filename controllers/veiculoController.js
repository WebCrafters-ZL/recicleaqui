// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Função assíncrona para cadastrar um novo veículo
const cadastrarVeiculo = async function (req, res, next) {
    try {
        // Extrai os dados do corpo da requisição
        const { marca, modelo, placa, capacidadeKg } = req.body;

        // Verifica se já existe um veículo com a placa fornecida
        const existeVeiculo = await db.Veiculo.findOne({ where: { placa } });

        // Se já existe um veículo com a mesma placa, lança um erro
        if (existeVeiculo) {
            const error = new Error("Placa já cadastrada");
            error.statusCode = 400;
            throw error;
        } else {
            // Cria um novo veículo com os dados fornecidos
            await db.Veiculo.create({ marca, modelo, placa, capacidadeKg });
            // Redireciona para a página de administração de veículos
            return res.redirect("/admin/veiculo");
        }
    } catch (error) {
        // Passa o erro para o próximo middleware de erro
        next(error);
    }
}

// Função assíncrona para atualizar os dados de um veículo existente
const atualizarVeiculo = async function (req, res, next) {
    try {
        // Extrai os dados do corpo da requisição
        const { id, marca, modelo, placa, capacidadeKg } = req.body;

        // Verifica se já existe outro veículo com a mesma placa, excluindo o veículo atual pela ID
        const existeVeiculo = await db.Veiculo.findOne({ where: { id: !id, placa } });

        // Se já existe outro veículo com a mesma placa, lança um erro
        if (existeVeiculo) {
            const error = new Error("Placa já cadastrada");
            error.statusCode = 400;
            throw error;
        } else {
            // Atualiza os dados do veículo com a ID fornecida
            await db.Veiculo.update({ marca, modelo, placa, capacidadeKg }, { where: { id } });
            // Redireciona para a página de administração de veículos
            return res.redirect("/admin/veiculo");
        }
    } catch (error) {
        // Passa o erro para o próximo middleware de erro
        next(error);
    }
}

// Função assíncrona para excluir um veículo existente
const excluirVeiculo = async function (req, res, next) {
    try {
        // Exclui o veículo com a placa fornecida
        await db.Veiculo.destroy({ where: { placa: req.params.placa } });
        // Redireciona para a página de administração de veículos
        return res.redirect("/admin/veiculo");
    } catch (error) {
        // Passa o erro para o próximo middleware de erro
        next(error);
    }
}

// Exporta as funções para serem utilizadas por outros arquivos
module.exports = {
    cadastrarVeiculo,
    atualizarVeiculo,
    excluirVeiculo
}
