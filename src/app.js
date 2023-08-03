import express from "express";
import db from "../config/dbConnect.js";
import routes from "./routes/index.js"

db.on("error",console.log.bind(console,'Erro de conexão'))
db.once("open",() => {

    console.log('Conexão com o banco feita com sucesso!');
})

const app = express();

app.use(express.json())

routes(app);

app.get('/amor',(req,res) => {

    res.status(200).send('<h1>Eu amo a Leticia! SZ</h1>')
});

export default app