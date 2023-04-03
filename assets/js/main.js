class ValidaFormulario{

  constructor(){

    this.formulario = document.querySelector('.formulario ');
    this.eventos();
  }

  eventos(){
    
    this.formulario.addEventListener('submit', e => {

      this.handleSubmit(e);
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if(camposValidos && senhasValidas){
      alert("Formulário enviado.");
      this.formulario.submit();
    }
  }

  senhasSaoValidas(){

    let valid = true;
    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value){

      valid = false;
      this.criaErro(senha, "Campos senha e repetir senha precisam se iguais.")
      this.criaErro(repetirSenha, "Campos senha e repetir senha precisam se iguais.")
    }

    if(senha.value.length < 6 || senha.value.length > 12){

      valid = false;
      this.criaErro(senha, "Senha precisa estar entre 6 12 caracteres.")
    }

    return valid;
  }

  camposSaoValidos(){
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')){
      errorText.remove();
    }

    for(let campo of this.formulario.querySelectorAll('.validar')){
      
      const label = campo.previousElementSibling.innerText; //"irmão" anterior do campo input na pagina, no caso é o elemento HTML <label>

      if(!campo.value){ //se o campo está vazio
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if(campo.classList.contains('cpf')){
        
        if(!this.validaCPF(campo))
          valid = false;
      }

      if(campo.classList.contains('usuario')){

        if(!this.validaUsuario(campo))
          valid = false;
      }
    }

    return valid;
  }

  validaCPF(campo){
    const cpf = new ValidaCPF(campo.value); //381.104.430-36

    if(!cpf.valida()){

      this.criaErro(campo, 'CPF inválido.');
      return false;
    }

    return true;
  }

  validaUsuario(campo){

    const usuario = campo.value;
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12){

      this.criaErro(campo, "Nome de usuário precisa ter entre 3 e 12 caracteres.");
      valid = false;
    }

    if(!usuario.match(/[a-zA-Z0-9]+/g)){

      this.criaErro(campo, "Nome de usuário precisa conter apenas letras e/ou números.");
      valid = false;
    }

    return true;
  }

  criaErro(campo, msg){
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div); //vai colocar a DIV ao final do elemento que disparou o erro. "After end" implica no final do elemento HTML.
  }
}

const valida = new ValidaFormulario();