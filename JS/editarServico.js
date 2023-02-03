//Declaração de variáveis
const urlParams = new URLSearchParams(window.location.search);
const idServico = urlParams.get('id')
const nome = document.getElementById("nome-servico")
const descricao = document.getElementById("descricao-servico")

//Método que chama a função sempre que carregar a página
window.onload = function () {
  getAgendamento(idServico);
}


//Função atualiza as informações inseridas no Serviço cadastrado pelo Prestador
form.addEventListener("submit", async (e) => {
    //async, como a resposta do api não é imediata, vai redirecionar para a página e esperar a resposta da API
    e.preventDefault(); 
    //cancela o pedido, para não haver uma requsição desnecessária, verifica erros

  const idUsuario = localStorage.getItem("idUsuario")

    await fetch(`http://localhost:8080/servico`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idServico: idServico,
        nome: nome.value,
        descricao: descricao.value,
        usuario: {
           idUsuario: idUsuario 
        },
      }),
    }).then((res) => {
        window.location.href = "/Prestador/meusServicosP.html"
  })
})
//Referenciado no arquivo Prestador/editarServicoP.html

//Função para puxar os agendamentos e conseguir atualizar
function getAgendamento(id) {
  fetch(`http://localhost:8080/servico/${id}`).then(
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
  document.getElementById('nome-servico').value = data?.nome;
  document.getElementById('descricao-servico').value = data?.descricao; 
}

