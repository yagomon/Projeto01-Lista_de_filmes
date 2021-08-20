const express = require('express');
const app = express();

const port = 3001;

app.use(express.json()); //falar para os reqs do express trabalahr com json

const filmes = [
    'Capitão America: O preimeiro vingador',
    'Capitã Marvel',
    'O Incrível Hulk',
    'Homem de Ferro',
    'Homem de Ferro 2',
]

app.get('/', (req,res)=>{
    res.send('Hello Bluemers');
});

app.get('/filmes', (req,res)=>{
    res.send(filmes)
});

app.get('/filmes/:id', (req,res) => {
    const id = req.params.id -1;

    const filme = filmes[id];

    if(!filme) {
        res.send('Filme não encontrado!')
    };

    res.send(filme)
});

// ROTA QUE CADASTRA UM NOVO FILME:
// read => get
// criar => post
// update => put
// delete => delete

app.post('/filmes', (req,res) => {
    const filme = req.body.filme;
    const id = filmes.length;
    filmes.push(filme);

    res.send(`Filme ${filme}adicionado com sucesso no ID ${id}.`)
});


// Utilizando o put (update)
app.put('/filmes/:id', (req,res) => {
    const id = req.params.id -1;
    const filmeAntigo = filmes[id];
    const filme = req.body.filme;
    filmes[id]= filme;
    res.send(`Filme ${filmeAntigo} foi atualizado para ${filme} com sucesso!`)
})

//Fazendo um delete
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filmeAexcluir = filmes[id]

    if(!filmeAexcluir) {
        res.send('Filme não encontrado!')
    }
    
    delete filmes[id];
    res.send(`O filme ${filmeAexcluir} foi apagado da lista.`)

});

//sugestao da galera SPLICE (remove da lista sem deixar o null)
app.delete('/filmesSplice/:id', (req,res)=>{
    const id = req.params.id-1;
    const filmeAexcluir = filmes[id]
    filmes.splice(id,1) // deleta a partir de qual, quantos vai deletar

    if(!filmeAexcluir) {
        res.send('Filme não encontrado!')
    }    
    res.send("Filme excluido com sucesso.");
  });
  



app.listen(port, () => {
    console.info(`O app esta rodando na porta http://localhost:${port}`)
})


