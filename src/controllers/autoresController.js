import autores from "../models/autor.js";

class livroController{

    static listarAutores = async (req, res) => {

        const colecaoAutores = await autores.find(); 

        res.status(200).json(colecaoAutores);
    }

    static listarAutorPorId = async (req, res) => {

        try{
    
            const id = req.params.id;

            const livroEncontrado = await autores.findById(id);

            res.status(200).send(livroEncontrado);

        } catch(error){

            res.status(400).send({message: `${error.message} - id do livro não localizado`});
        }
    }

    static cadastrarAutor = async (req, res) => {

        try {

            let autor = new autores(req.body);

            await autor.save();

            res.status(201).send(autor.toJSON());

        } catch (error) {

            res.status(500).send({message: `${error.message} - erro ao cadastrar autor`})
        }
        
    }

    static atualizarAutor= async (req, res) => {

        try {

            const id = req.params.id;

            await autores.findByIdAndUpdate(id, {$set: req.body})

            res.status(200).send({message: 'Autor Atualizado com sucesso!'})

        } catch (error) {

            res.status(500).send({message: `${error.message} - erro ao atualizar autor`})
        }
        
    }


    static excluirAutor = async (req, res) => {

        try {

            const id = req.params.id;

            await autores.findByIdAndDelete(id)

            res.status(200).send({message: 'Autor deletado com sucesso!'});

        } catch (error) {

            res.status(500).send({message: `${error.message} - erro ao deletar autor`});
        }
        
    }
}

export default livroController