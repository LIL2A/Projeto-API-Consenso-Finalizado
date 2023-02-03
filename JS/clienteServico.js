//Referenciado no arquivo Cliente/home.html
//Referenciado no arquivo Cliente/editarAgendamento.html

//Método que chama a função sempre que carregar a página
window.onload = function () {
  getTodosServicos();
}

//Retorna todos os serviços disponíveis no home do cliente 
function getTodosServicos() {
  fetch("http://localhost:8080/servico").then(
    res => {
      res.json().then(
        data => {
          return exibirDados(data)
        }
      )
    
    }
  )
}


//Exibir os serviços disponíveis no home do Cliente
function exibirDados(data = []) {
  if (data?.length > 0) {
    temp = "<option value='' disabled selected>Selecione um serviço</option>";
    data.forEach((item) => {
      temp +=`<option value="${item.idServico}">${item.nome}</option>`
    });
    document.getElementById('dataSelect').innerHTML = temp;
  }
}


/*//Declaração de variáveis 
const idAgendamento = urlParams.get('id')
const dia = document.getElementById("dia")
const hora = document.getElementById("hora")
//Constantes declaradas para a função de update, mas ainda não foi criada


/Função criada para editar o agendamento realizado pelo cliente
function updateData(data = []) {
const idUsuario = localStorage.getItem("idAgendamento")

  fetch(`http://localhost:8080/agendamento`, {
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
      window.location.href = "/Cliente/editarAgendamento.html"
})
}*/

