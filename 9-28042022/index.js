/*
Estrutura de backend onde iremos selecionar,
 cadastrar, atualiza e deletar dados sobre os
 clientes, ou seja, criaremos um crud
 CRUD
    C -> Create:Quando cria-se dados no banco
    R -> Read:Quando lemos dados no banco
    U -> Update:Quando atualizamos dados no banco
    D -> Delete:Quando apagamos dados no banco

Vamos usar os verbos:GET, POST, PUT, DELETE, onde:
GET -> Read
POST -> Create
PUT -> Update
DELETE -> Delete



*/
// importação no modulo express
const express = require(`express`);

//importação no modulo mongoose
const mongoose = require("mongoose");

//importação no modulo do cors
const cors = require("cors");

//criação do app referente ao express
const app = express();

//preparar o servidor para receber json
app.use(express.json());

//Uso do cors para desbloqueio de acesso
app.use(cors());


/*
caminho do banco de dado mongodb
mongodb+srv://Gabryel:<password>@cluster0.xp0yb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/

const urldb = "mongodb+srv://Gabryel:123senac@cluster0.xp0yb.mongodb.net/bancodedados?retryWrites=true&w=majority";
mongoose.connect(urldb,{useNewUrlParser:true,useUnifiedTopology:true});
/*
Definição do esquema de dados da tabela
Schema
*/

const tabela = mongoose.Schema({
    nome:{type:String,require},
    email:{type:String,require},
    telefone:{type:String},
    cidades:{type:String}
});

const Cliente = mongoose.model("tbcliente",tabela);

//definição de uma rota padrão
const default_route = "/api/cliente";

//rota para listar os clientes com endpoint listar
app.get(`${default_route}/listar` ,(req, res)=>{
    Cliente.find().then((dados)=>{
        
        res.status(200).send({ output:dados});
    })
  .catch((erro)=>res
    .status(500)
    .send({ output:`Erro interno
    ao processar consulta -> ${erro}`})
  );
    
});

//rota para cadastrar os clientes com endpoint cadastrar
app.post(`${default_route}/cadastrar` ,(req, res)=>{
    
    const cli = new Cliente(req.body)
    cli.save().then((dados)=>{
        res.status(201).send({output:`Cadastro realizado` ,payload:dados});
    })
    .catch((erro) => console.error(`Erro ao tentar cadastrar ${erro}`));
});

//rota para atualizar com endpoint atualizar
//passagem de argumentos pela url com o id do cliente
app.put(`${default_route}/atualizar/:id` ,(req, res)=>{
    
    Cliente.findByIdAndUpdate(req.params.id,req.body,{new:true},(erro,dados) =>{
        if(erro){
            return res.status(500).
            send({output:`Não atualizaou -> ${erro}`});
        }
        res.status(200).send({ output:"Dados atualizados"});
    })
});
//rota para apagar cliente com endpoint deletar
app.delete(`${default_route}/apagar/:id` , (req, res)=>{
    Cliente.findByIdAndDelete(req.params.id, (erro,dados) =>{
        if(erro){
            return res
            .status(500)
            .send({ output: `Erro ao tentar apagar -> ${erro}`});
        }
        res.status(204).send({ output: `Excluido` });
    });
});

//definir a porta de comunicação do servidor
app.listen(5000, ()=> 
console.log("Servidor on-line em http://localhost:5000"))