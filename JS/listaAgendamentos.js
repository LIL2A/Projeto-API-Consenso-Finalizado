//Referenciado no arquivo Prestador/agendamentoPrestador.html
//Referenciado no arquivo Cliente/agendamentosCliente.html

//Método que chama a função sempre que carregar a página
window.onload = function () {
  getTodosAgendamentos();
}


//Retorna os dados da tabela
function getTodosAgendamentos() {
  fetch("http://localhost:8080/agendamento").then(
    res => {
      res.json().then(
        data => {
          return exibirDados(data)
        }
      )
    
    }
  )
}

//Criar as tabelas de agendamentos do Cliente e do prestador
function exibirDados(data = []) {
  if (data?.length > 0) {
    var title = ` <div class="row justify-content-md-center">
                    <div class='col'> <h4 style='font-weight: 400;'>Meus Agendamentos:</h4></div>                         
                  </div>  `
    var temp = title;
    data.forEach((item) => {
      temp +=
        `
          <div class='row justify-content-md-center dado'>
          <div class='col-10'>
            <span>${item.servico?.nome}</span>
          </div>
          <div  class='col-2' >
            <a href='/Cliente/editarAgendamento.html?id=${item.idAgendamento}' style='text-decoration: none;'>
              <span class='material-symbols-outlined' id='update'> edit_square </span>
            </a>
            <a><style='text-decoration: none;' id='${item.idAgendamento}' onclick="deleteData(this.id);">
              <span class='material-symbols-outlined' style='cursor: pointer;' id="delete" > delete </span>
            </a> 
          </div>     
          <div  class='col-12 ' ><span>Cliente:</span> ${item.usuario?.nome}</div>
          <div  class='col-12 ' ><span>Prestador:</span> ${item.servico?.usuario?.nome}</div>    
          <div  class='col-12 ' ><span>Dia:</span> ${item.data}</div>       
          <div  class='col-12 ' ><span>Horário:</span> ${item.hora}</div>                       
         </div> 
            </div>
                           
         </div>    
                               
        ` 
    });
    document.getElementById('data').innerHTML = temp;
  } else {
    temp = ` <div class="row justify-content-md-center">
                <div class='col center'> <h4>Não há agendamentos</h4></div>                         
              </div>  `
    document.getElementById('data').innerHTML = temp;
  }  
}

//Função para deletar o agendamento 
function deleteData(id) {
  if (confirm('Certeza que quer deletar?') == true) {
    return fetch(`http://localhost:8080/agendamento/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(data => document.location.reload())
      .catch(err => console.log(err))
  }

}

