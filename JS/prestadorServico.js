//Referenciado no arquivo Prestador/meusServicosP.html

//Método que chama a função sempre que carregar a página, e traz os dados referentes aos serviços
window.onload = function () {
  getTodosServicos();
}


//Retorna os serviços cadastrados do Prestador 
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


//Deleta os serviços do Prestador 
function deleteData(id) {
  if (confirm('Certeza que quer deletar?') == true) {
    return fetch(`http://localhost:8080/servico/${id}`, {
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

//Função que "monta" dinamicamente as div's no HTML, mostrando as tabelas prontas
function exibirDados(data = []) {

//Função que chama o dados dos serviço cadastrado do Prestador
  if (data?.length > 0) {
    var title = ` <div class="row justify-content-md-center">
                    <div class='col'> <h4>Meus Serviços:</h4></div>                         
                  </div>  `
    var temp = title;
    data.forEach((item) => {
  //Variável temporária
      temp +=
        `
        <div class='row justify-content-md-center dado'>
            <div class='col-10 '>
              <span>${item.nome}</span>
            </div>
            <div  class='col-2' >
              <a href='./editarServicoP.html?id=${item.idServico}' style='text-decoration: none;'>
                <span class='material-symbols-outlined' id='update'> edit_square </span>
              
              <style='text-decoration: none;' id='${item.idServico}' onclick="deleteData(this.id);">
                <span class='material-symbols-outlined' style='cursor: pointer;'> delete </span></a>
            </div>            
          </div>            
        `
    });
    document.getElementById('data').innerHTML = temp;
  } 

//Se não estiver existindo as div's acima, aparece a mensagem não há serviços cadastrados 
  else {
    temp = ` <div class="row justify-content-md-center">
                <div class='col'> <h4>Não há serviços cadastrados</h4></div>                         
              </div>  `
    document.getElementById('data').innerHTML = temp;
  }  
}

