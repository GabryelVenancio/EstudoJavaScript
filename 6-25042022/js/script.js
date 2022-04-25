function carregarFilmes(){
    //fazer o carregamento da url com filmes
    //vamos usar o comando fetch paa localizar e
    //carregar os filmes e exibir em pagina html
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=e8ee1b7136ab091a2fb872089bf3c840&language=pt-BR-US&page=1")
    .then((response)=>response.json())
    .then((dados)=>{
        console.log(dados);
    })
    .catch((erro)=>console.error(`Erro ao tentar executar a api -> ${erro}`));
}

