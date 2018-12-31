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
    });

    app.get('/livros/form', function(req,resp){
        resp.marko(require('../views/livros/formulario/form.marko'), { livro: {}});
    });

    app.get('/livros/form/:id', function(req, resp){
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
                .then(livro =>
                    resp.marko(
                        require('../views/livros/formulario/form.marko'),
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
    });


    app.post('/livros',function(req,resp){
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    // atualizar livros
    app.put('/livros', function (req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
    });
};