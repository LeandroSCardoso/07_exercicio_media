  let cor_amarelo = "#ffd900";
  let cor_verde = "#338b18";
  let cor_vermelha = "#f50a1e";
  let cor_preta = "#1a1919";
  let cor_laranja = "#e25d34";
  let cor_branca = "#fff"
  
//FUNÇÃO PARA EFETUAR A SOMA DE 2 NUMEROS
function somar_ex() {
    // PEGANDO OS VALORES DOS INPUTS
    let total = 0
    const valor1 = document.getElementById("val1")
    const valor2 = document.getElementById("val2")

    // PASSANDO PARA NUMERO - TENDO CERTEZA QUE SÃO NUMEROS E NÃO TEXTO PARA CONCATENAR
    const value1 = Number(valor1.value)
    const value2 = Number(valor2.value)

    // PROCESSAMENTO - CALCULO
    total = value1 + value2

    //VALIDANDO A SAIDA
    if (isNaN(total)) {
       exibe_aviso("aviso","Impossível calcular, informe apenas nûmeros!",cor_vermelha,cor_branca)        
    }
    else {
      const resultado = document.getElementById("total_ex")
      resultado.innerText = total   
    } 
}


//FUNÇÃO PARA PEGAR O POKEMON
async function pega_pokemon() {
    // PEGANDO OS VALORES
    const elementoInput = document.getElementById("id_pokemon")
    const valor = elementoInput.value


    // CHAMANDO A API PARA FAZER A BUSCA
    const url = `https://pokeapi.co/api/v2/pokemon/${valor}`
    const resposta = await fetch(url)

    //CASO A RESPOSTA SEJA 404 EXBIBE MENSAGEM DE POKEMON NÃO ENCONTRADO
    if (resposta.status === 404) {
        exibe_aviso("aviso","Pokemon não encontrado!",cor_vermelha,cor_branca) 
    } else {

      //EXIBE NOME E FOTO DO POKEMON
    const pokemon = await resposta.json()

        const containerImagem = document.getElementById("foto_pokemon")
        containerImagem.innerHTML = `
            <img width: 100%; src="${pokemon.sprites.front_default}">
        `

        const containerNome = document.getElementById("nome_pokemon")
        containerNome.innerHTML = `Nome: ${pokemon.name}`    
    } 
}


function exibe_aviso(elemento,mensagem,cor_fundo,cor_texto) {
    const resultado = document.getElementById(elemento)
    resultado.style.backgroundColor = cor_fundo
    resultado.style.color = cor_texto
    resultado.style.display = "inline-block"
    resultado.innerText = mensagem
    setTimeout(function() {
        // oculta a div após 5 segundos
        resultado.style.display = "none";
      }, 5000);
}


async function EnviaFormulario(){

    // PEGANDO VALORES DOS IMPUTS
    const input_nome = document.querySelector("#nome").value
    const input_sobre_nome = document.querySelector("#sobre_nome").value
    const input_email = document.querySelector("#email").value
    const input_texto = document.querySelector("#texto").value
   
    // CHAMANDO A API
    const url = "https://target-api-simples.cyclic.app/generica"
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        nome: input_nome,
        sobre_nome: input_sobre_nome,        
        email: input_email,
        texto: input_texto
      }),
      // body: `{"title": ${inputTitleValue}, "description": ${inputDescriptionValue}}`,
      headers: {"Content-type": "application/json"}
    }
    const response = await fetch(url, fetchOptions)

    //CASO A RESPOSTA SEJA 404 EXBIBE MENSAGEM ERRO, CASO SUCESSO, MENSAGEM DE SUCESSO
    if (response.status === 404) {
        exibe_aviso("aviso","Erro ao enviar para a api!",cor_vermelha,cor_branca)
    } else {
        exibe_aviso("aviso","Informações enviadas com sucesso!",cor_verde,cor_branca)

        const retornoApi = await response.json()

        // RETORNO DA API
        const nome_resp = document.querySelector("#nome_resp")
        const email_resp = document.querySelector("#email_resp")
        const texto_resp = document.querySelector("#texto_resp")
        const retorno = document.querySelector("#retorno")
        
        //mostando divs de avisos
        retorno.style.display = 'inline-block'

        //pegando a largura da div contato, para o retorno da api ficar com o mesmo tamanho
        //desta forma, a div retorno pode ficar fora da linha e não vai ficar feio ocupando toda a largura da tela
        //ela vai ficar com a largura da div contato como ja disse e vai ficar alinhada ao centro utilizando o margin: 0 auto
        var pega_div_contato = document.querySelector('.contato').offsetWidth;
        retorno.style.width = pega_div_contato + 'px';


        //passando os valores enviados para os campos
        nome_resp.innerHTML = JSON.stringify(`Nome: ${retornoApi.apiRecebeu.nome} ${retornoApi.apiRecebeu.sobre_nome}`)
        email_resp.innerHTML = JSON.stringify(`E-mail: ${retornoApi.apiRecebeu.email}`)
        texto_resp.innerHTML = JSON.stringify(`Mensagem: ${retornoApi.apiRecebeu.texto}`)
    }
}