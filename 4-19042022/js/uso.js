//Verificar qual a página que irá abrir esse arquivo
//javascript
//Pega a url completa do navegador
var pagina = window.location;
console.log(pagina);
//Vamos quebrar a url aonde houver barra
pagina = pagina.href.split("/");
console.log(pagina);
//Pegar o ultimo elemento do array pagina criado
//acima
pagina = pagina[pagina.length - 1];
console.log(pagina);

if(pagina == "home.html"){

    document.body.style.backgroundColor="rgb(150,150,150)";
    /*
    Acessar a caixa(input) chamada numeros, capturar
    esses numeros e utilizar a função maior para
    encontrar o maior valor entre eles. 
    */

    //Referenciar um elemento de input da tela home
    const txtN = document.getElementById("txtN")
    //Aplicar um evento chamado onblur, ou seja,
    //quando a caixa perder o foco
    txtN.onblur = function(){
        //Vamos capturar esse valor contido em
        //txtN, ou seja, os numeros dentro
        //desta caixa e alocar em um array
        var valores = txtN.value.split(",");
        alert(maior(valores));
    }
}
if(pagina=="formulario.html"){
    document.body.style.backgroundColor="rgb(2,2,2)";
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");

    nome.onblur = ()=> {
        verificaVazio(nome);
    };
    email.onblur = ()=> {
        verificaVazio(email);
    };
    cpf.onblur = ()=> {
        verificaVazio(cpf);
    };
    telefone.onblur = ()=> {
        verificaVazio(telefone);
    };
}