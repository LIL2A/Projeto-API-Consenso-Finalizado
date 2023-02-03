//Referenciado no arquivo Cliente/home.html

//Declaração de Constantes
const form = document.getElementById("cadastro")
const data = document.getElementById("data")
const hora = document.getElementById("hora")
const idServico = document.getElementById("dataSelect")


//Realiza um novo agendamento na interface do Cliente
form.addEventListener("submit", async (e) => {
    //async, como a resposta do api não é imediata, vai redirecionar para a página e esperar a resposta da API
  e.preventDefault(); //cancela o pedido, para não haver uma requsição desnecessária, verifica erros
  // validarCadastro();
  // Realizar validação com data em outra função antes de executar o submit
  const idUsuario = localStorage.getItem("idUsuario")

    await fetch("http://localhost:8080/agendamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data.value,
        hora: hora.value,
        usuario: {
           idUsuario: idUsuario 
        },
        servico: {
          idServico: idServico.value 
       }
      }),
    }).then((res) => {
        window.location.href = "/Cliente/agendamentosCliente.html"
  })
})

