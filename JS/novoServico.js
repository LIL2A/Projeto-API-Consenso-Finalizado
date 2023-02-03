//Referenciado no arquivo Prestador/cadastroServico.html

//Declaração das constantes 
const form = document.getElementById("cadastro")
const servico = document.getElementById("nome-servico")
const descricao = document.getElementById("descricao-servico")

//Realiza a criação de um novo serviço, na interface do Prestador 
form.addEventListener("submit", async (e) => {
    //async, como a resposta do api não é imediata, vai redirecionar para a página e esperar a resposta da API
    //cancela o pedido, para não haver uma requsição desnecessária, verifica erros
    e.preventDefault(); 
    // Realizar validação com data em outra função antes de executar o submit
    const idUsuario = localStorage.getItem("idUsuario")

    await fetch("http://localhost:8080/servico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: servico.value,
        descricao: descricao.value,
        usuario: {
           idUsuario: idUsuario 
        }
      }),
    }).then((res) => {
        window.location.href = "/Prestador/meusServicosP.html"
  })
})

