// Importações
const express = require("express")
const nunjucks = require("nunjucks")
const server = express()

const db = require("./db")

//Configurar arquivos estáticos na pasta public
server.use(express.static("public"))

//Habilitar o req.body para requisições POST
server.use(express.urlencoded({extended: true}))

// Configuração do Nunjucks
nunjucks.configure("views",{
    express: server,
    noCache: true, //Retirar na produção
})

//Rotas
server.get('/',  (req, res) => {

    db.all(`SELECT * FROM ideas`,function(err,rows){
        if (err) return console.log(err)

        const reversedIdeas = [ ...rows ].reverse()
        let lastIdeas = [];
    
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
    
        return res.render('index.html', { ideas: lastIdeas })

    })

})

server.get('/ideias', (req, res) => {

    db.all(`SELECT * FROM ideas`,function(err,rows){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        const reversedIdeas = [ ...rows ].reverse()
        return res.render('ideias.html', { ideas: reversedIdeas })
    })
})

server.post('/', (req,res) => {
    //Inserir Dados na Tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        )
        VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    
    db.run(query,values, function(err){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        return res.redirect('/ideias')
    })
})


server.get('/ideias/:id', (req,res) => {
    const id = req.params.id

    db.run(`DELETE FROM ideas WHERE id = ?`,id, function(err){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        return res.redirect('/ideias')
    })

})

server.get('/ideias/atualize/:id',(req,res) => {
    db.all(`
        SELECT image,title,category,description,link FROM ideas
        WHERE id = ${req.params.id};
    `,function(err,rows){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        return res.render('oneIdea.html', { ideas: rows })
    }) 

})

// Ligando server na porta 3000
server.listen(3000)
