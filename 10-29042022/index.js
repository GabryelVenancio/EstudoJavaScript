const express = require(`express`);

const mongoose = require("mongoose");

const app = express();

app.use(express.json());


const urldb = "mongodb+srv://Gabryel:123senac@cluster0.xp0yb.mongodb.net/bancodedados?retryWrites=true&w=majority";
mongoose.connect(urldb,{useNewUrlParser:true,useUnifiedTopology:true});


const tabela = mongoose.Schema({
    Nomeproduto:{type:String,require},
    Descricao:{type:String,require},
    Categoria:{type:String},
    Quantidade:{type:Number},
    Preco:{type:Number}
});


const Cliente = mongoose.model("tbprodutos",tabela);

const default_route = "/api/produto";


app.post(`${default_route}/cadastrar` ,(req, res)=>{
    
    const cli = new Cliente(req.body)
    cli.save().then((dados)=>{
        res.status(201).send({output:`Produto Cadastrado` ,payload:dados});
    })
    .catch((erro) => console.error(`Erro ao tentar cadastrar ${erro}`));
});


app.put(`${default_route}/atualizar/:id` ,(req, res)=>{
    
    Cliente.findByIdAndUpdate(req.params.id,req.body,{new:true},(erro,dados) =>{
        if(erro){
            return res.status(500).
            send({output:`Não atualizaou -> ${erro}`});
        }
        res.status(200).send({ output:"Produtos atualizados"});
    })
});

app.listen(3000, ()=> 
console.log("Servidor on-line em http://localhost:3000"))