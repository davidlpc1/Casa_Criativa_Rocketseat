const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ws.db');

db.serialize(function(){
    
    //Criar a Tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        ); 
    `);

    /*Inserir Dados Na Tabela
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
        'https://www.flaticon.com/svg/static/icons/svg/2729/2729007.svg',
        'Cursos de Programação',
        'Estudo',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium consectetur alias rerum, eligendi necessitatibus ',
        'https://rocketseat.com.br/'
    ]

    
    db.run(query,values, function(err){
        if (err) return console.log(err)

        console.log(this)
    })
    */

    /* Deletar um dado na Tabela
    db.run(`DELETE FROM ideas WHERE id = ?`,[3], function(err){
        if(err) return console.log(err)

        console.log('Deletei', this)
    })
    */
    
    
    /*Consultar Dados na Tabela
    db.all(`SELECT * FROM ideas`,function(err,rows){
        if (err) return console.log(err)

        console.log(rows)
    })
    */

})

module.exports = db;