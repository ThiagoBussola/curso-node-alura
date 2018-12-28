
// delegado ao livro-dao o acesso ao banco de dados onde haverá um método chamado listaLivros
class LivroDao{

    constructor(db){
        this._db = db;
    }

    // lista quando executado vai fazer a seleção de livros do banco de dados
    lista(){
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                // e ao termino da seleção vai delegar ao calback passado pro lista livros
                // o tratamento dos erros ou do resultado
                (erro,resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');
                    
                    return resolve(resultados);
                }
            )
        });
    }
}
//exportando a classe para as outras partes da aplicação
module.exports = LivroDao;