//Referenciado no arquivo loginPrincipal.html

//Declaração de constantes
const form = document.getElementById("form-action");
const login = document.getElementById("inputLogin");
const senha = document.getElementById("inputSenha");
const divLogin = document.getElementById("div-login");
const divSenha = document.getElementById("div-senha");


//Função que está ouvindo a evento submit 
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Conexão com o BD, puxando os dados cadastrados pelos usuários 
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: login.value,
      senha: senha.value,
    }),
  })
    .then(async (response) => {
      const resposta = await response.json();
      const idUsuario = await response.idUsuario;
      const email = await response.email;
      const tipoUsuario = await response.idTipoUsuario;

      //Dados sendo guardados no LocalStorage 
      localStorage.setItem("idTipoUsuario", resposta.tipoUsuario.idTipoUsuario);
      localStorage.setItem("email", resposta.email);
      localStorage.setItem("idUsuario", resposta.idUsuario);
      
      const idTipoUsuario = localStorage.getItem("idTipoUsuario");

      console.log(idTipoUsuario);
      
      //Função de direcionamento de usuário 
     if (idTipoUsuario == 1) {
        window.location.href = "/Cliente/home.html";
      } else if (idTipoUsuario == 2) {
        window.location.href = "/Prestador/meusServicosP.html";
      }
    })
    .catch((erro) => {
      console.error(erro);
    });
});

//Função de validar os dados inseridos no form de login
function validarLogin() {
  const loginValue = login.value;
  const senhaValue = senha.value;

  if (loginValue === "" || loginValue === null) {
    console.log("E-mail é um campo obrigatório");
    login.className = "form-control is-invalid";
  } else {
    console.log("Login realizado com sucesso");
  }

  if (senhaValue === "" || senhaValue === null) {
    senha.className = "form-control is-invalid";
    console.log("Senha é um campo obrigatório");
  } else {
    window.alert("Login realizado com sucesso!");
  }
}

//Expressão regular de validação de e-mail
function validarEmail(ev) {
  let re =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(ev);
}

