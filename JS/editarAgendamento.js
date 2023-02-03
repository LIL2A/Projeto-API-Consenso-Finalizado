//Declaração de variáveis
const urlParams = new URLSearchParams(window.location.search);
const idAgendamento = urlParams.get('id')
const dia = document.getElementById("dia")
const hora = document.getElementById("hora")

//Método que chama a função sempre que carregar a página
window.onload = function () {
  getAgendamento(idAgendamento);
}


//Função atualiza as informações inseridas no Serviço cadastrado pelo Prestador
form.addEventListener("submit", async (e) => {
    //async, como a resposta do api não é imediata, vai redirecionar para a página e esperar a resposta da API
    e.preventDefault(); 
    //cancela o pedido, para não haver uma requsição desnecessária, verifica erros

  const idUsuario = localStorage.getItem("idUsuario")
console.log()
    await fetch(`http://localhost:8080/agendamento`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idAgendamento: idAgendamento,
        data: dia.value,
        hora: hora.value,
        usuario: {
          idUsuario: idUsuario
        },
        servico: {
          idServico: idServico
        }
      }), 
    }).then((res) => {
        window.location.href = "/Cliente/agendamentosCliente.html"
  }) 
})

//Função para puxar os agendamentos e conseguir atualizar
function getAgendamento(id) {
  fetch(`http://localhost:8080/agendamento/${id}`).then(
    res => {
      res.json().then(
        data => {
          return exibirDados(data)
        }
      )
    
    }
  )
}

//Função de exibir os dados diretos do Banco 
function exibirDados(data = {}) {
    document.getElementById('dataSelect').value = data?.idAgendamento;  
    document.getElementById('dia').value = data?.data;
    document.getElementById('hora').value = data?.hora; 
}
