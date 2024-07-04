const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/db_fiap';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defina o esquema do seu modelo MongoDB para "Stock"
const Schema = mongoose.Schema;
const stockSchema = new Schema({
    nomeProduto: String,
    nomeNavio: String,
    dataEntrada: Date,
    dataAnalise: Date,
    status: String,
    codigo: String,
});

const StockModel = mongoose.model('Stock', stockSchema);

// Rota para criar um novo registro de análise
app.post('/analise', async (req, res) => {
    try {
        const {
            nomeProduto,
            nomeNavio,
            dataEntrada,
            dataAnalise,
            status,
            codigo
        } = req.body;

        const novoItemAnalise = new StockModel({
            nomeProduto,
            nomeNavio,
            dataEntrada,
            dataAnalise,
            status,
            codigo
        });

        await novoItemAnalise.save();
        res.json({ mensagem: 'Registro de análise criado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar registro de análise' });
    }
});

// Rota para ler todos os registros de análise
app.get('/analise', async (req, res) => {
    try {
        const analiseltens = await StockModel.find();
        res.json(analiseltens);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar registros de análise' });
    }
});

// Rota para atualizar um registro de análise pelo ID
app.put('/analise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nomeProduto,
            nomeNavio,
            dataEntrada,
            dataAnalise,
            status,
            codigo
        } = req.body;

        await StockModel.findByIdAndUpdate(id, {
            nomeProduto,
            nomeNavio,
            dataEntrada,
            dataAnalise,
            status,
            codigo
        });

        res.json({ mensagem: 'Registro de análise atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar registro de análise' });
    }
});

// Rota para buscar um item de análise por ID
app.get('/analise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const itemAnalise = await StockModel.findById(id);

        if (!itemAnalise) {
            return res.status(404).json({ mensagem: 'Item de análise não encontrado' });
        }

        res.json(itemAnalise);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar item de análise por ID' });
    }
});

// Rota para excluir um registro de análise pelo ID
app.delete('/analise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const itemAnalise = await StockModel.findById(id);

        if (!itemAnalise) {
            return res.status(404).json({ mensagem: 'Item de análise não encontrado' });
        }

        await StockModel.findByIdAndDelete(id);
        res.json({ mensagem: 'Registro de análise excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir registro de análise' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
