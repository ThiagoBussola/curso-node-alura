// o require serve para importar dados, modulos....
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(
            `
            <html>
                <head>
                    <meta charset = "utf-8">
                </head>
                <body>
                    <h1> Casa do Código</h1>
                </body>
            </html>
        `
        );
    });

    app.get('/livros', function (req, resp) {

        //criando uma instancia de livroDao, passando o db que é o que o construtor precisa
        const livroDao = new LivroDao(db);
        
        //função que recebe as informações do banco e as agrega no template de livros
        livroDao.lista()
            .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));


       /*  livroDao.lista(function (erro, resultados) {
            resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: resultados
                }
            );
        }); */
    });
};