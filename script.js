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
       exibe_aviso("aviso","Impossível calcular, informe apenas nûmeros!")        
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
        exibe_aviso("aviso","Pokemon não encontrado!") 
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


function exibe_aviso(elemento,mensagem) {
    const resultado = document.getElementById(elemento)
    resultado.style.display = "block"
    resultado.innerText = mensagem
    setTimeout(function() {
        // oculta a div após 5 segundos
        resultado.style.display = "none";
      }, 5000);
}