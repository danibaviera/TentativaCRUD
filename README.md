# TentativaCRUD

CRUD (Create, Read, Update, Delete) para um modelo de "Stock" utilizando Express e Mongoose

**Create**
A rota POST /analise cria um novo registro de análise no banco de dados.

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

       ...

**Read:**

A rota GET /analise busca todos os registros de análise no banco de dados.

app.get('/analise', async (req, res) => {
    try {
        const analiseltens = await StockModel.find();
        res.json(analiseltens);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar registros de análise' });
    }
    
      ...

      

**Update:**

A rota PUT /analise/:id atualiza um registro de análise específico pelo seu ID.

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

       ...

**Delete:**

A rota DELETE /analise/:id exclui um registro de análise específico pelo seu ID.

app.delete('/analise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const itemAnalise = await StockModel.findById(id);

      ...

        
