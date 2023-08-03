import livros from "../models/livro.js";

class livroController{

    static listarLivros = async (req, res) => {

        const colecaoLivros = await livros.find().populate('autor').exec(); 

        res.status(200).json(colecaoLivros);
    }

    static listarLivrosPorId = async (req, res) => {

        try{
    
        const id = req.params.id;

        const livroEncontrado = await livros.findById(id).populate('autor','nome').exec();

        res.status(200).send(livroEncontrado);

        } catch(error){

            res.status(400).send({message: `${error.message} - id do livro não localizado`});
        }
    }

    static cadastrarLivro = async (req, res) => {

        try {

            let livro = new livros(req.body);

            await livro.save();

            res.status(201).send(livro.toJSON());

        } catch (error) {

            res.status(500).send({message: `${error.message} - erro ao cadastrar livro`})
        }
        
    }

    static atualizarLivro = async (req, res) => {

        try {

            const id = req.params.id;

            await livros.findByIdAndUpdate(id, {$set: req.body})

            res.status(200).send({message: 'Livro Atualizado com sucesso!'})

        } catch (error) {

            res.status(500).send({message: `${error.message} - erro ao atualizar livro`})
        }
        
    }

    static excluirLivro = async (req, res) => {

        try {

            const id = req.params.id;

            await livros.findByIdAndDelete(id)

            res.status(200).send({message: 'Livro deletado com sucesso!'});

        } catch (error) {

            res.status(500).send({message: `${error.message} - erro ao deletar livro`});
        }
        
    }

    static listarLivroPorEditora = async (req, res) => {

        try {

            const editora = req.query.editora;
            const regex = new RegExp(editora, 'i');

            const livroResultado = await livros.find({"editora": regex})

            res.status(200).json(livroResultado);

        } catch (error) {

            res.status(500).send({message: `${error.message} - erro ao buscar editora`});
        }
        
    }
}

export default livroController