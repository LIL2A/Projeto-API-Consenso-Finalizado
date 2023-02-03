//Referenciado no arquivo cadastroUsuario.html

//Declaração de constantes 
const form = document.getElementById("form-cad");
const nome = document.getElementById("nome");
const sobrenome = document.getElementById("sobrenome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senha2 = document.getElementById("senha2");
const tipoUsuario = document.getElementById("tipo-usuario");

//Fetch aqui, levando as informações ao banco de dados, e realizando o cadastro do usuário
form.addEventListener("submit", async (e) => {
  //async, como a resposta do api não é imediata, vai redirecionar para a página e esperar a resposta da API
  //cancela o pedido, para não haver uma requsição desnecessária, verifica erros
  e.preventDefault(); 
  //chamando a função validarCadastro
  validarCadastro();

  await fetch("http://localhost:8080/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      sobrenome: sobrenome.value,
      email: email.value,
      senha: senha.value,
      tipoUsuario: {
        idTipoUsuario: tipoUsuario.value,
      },
    }),
  });
});

//Função de Validação de cadastro, onde valida - nome, sobrenome, email, senha, senha2, tipoUsuario
function validarCadastro() {
  const nomeValue = nome.value;
  const sobrenomeValue = sobrenome.value;
  const emailValue = email.value;
  const senhaValue = senha.value;
  const senha2Value = senha2.value;
  const tipoUsuarioValue = tipoUsuario.value;

  if (nomeValue === "" || nomeValue === null) {
    nome.className = "form-control is-invalid required";
    console.log("Nome é um campo obrigatório");
  } else {
    console.log("Cadastro realizado com sucesso");
  }

  if (sobrenomeValue === "" || sobrenomeValue === null) {
    sobrenome.className = "form-control is-invalid required";
    console.log("Sobrenome é um campo obrigatório");
  } else {
    console.log("Cadastro realizado com sucesso");
  }

  if (tipoUsuarioValue === "" || tipoUsuarioValue === null) {
    tipoUsuario.className = "form-control is-invalid required";
    console.log("Confirmação da senha é um campo obrigatório");
  } else if (tipoUsuarioValue.length < 8) {
    console.log("Cadastro realizado com sucesso");
    if (tipoUsuarioValue == 1){
        window.location.href= "/loginPrincipal.html"
    }
    else if (tipoUsuarioValue == 2){
        window.location.href= "/loginPrincipal.html"
    }
  }

  if (emailValue === "" || emailValue === null) {
    email.className = "form-control is-invalid required";
    console.log("E-mail é um campo obrigatório");
  } else {
    console.log("Cadastro realizado com sucesso");
  }

  if (senhaValue === "" || senhaValue === null) {
    senha.className = "form-control is-invalid required";
    console.log("Senha é um campo obrigatório");
  } else {
    console.log("Cadastro realizado com sucesso");
  }

  if (senha2Value === "" || senha2Value === null) {
    senha2.className = "form-control is-invalid required";
    console.log("Confirmação da senha é um campo obrigatório");
  } else if (senhaValue.length < 8) {
    console.log("Cadastro realizado com sucesso");
  }

  if(validarCadastro === true) {
    window.location.href= "/loginPrincipal.html"
  }

  //Expressão regular de validação de email
  function validarEmail(cv) {
    let re =
      /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/; //só aceita 8 digitos, onde devem ser de 0 a 9
    return re.test(cv);
  }
}

