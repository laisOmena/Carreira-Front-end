var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(){
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");

    // Extraindo informações do paciente do form
    var paciente = obtemPacienteDoFormulario(form);
    var erros = validaPaciente(paciente);
    
    if(erros.length > 0){
        exibeMensagensDeErros(erros);
        return;
    }
    
    //Adicionado o paciente na tabela
    AdicionadaPacienteNaTabela(paciente);
    
    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erros");
    mensagensErro.innerHTML = "";
    
});

function AdicionadaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

}

function exibeMensagensDeErros(erros){
    var ul = document.querySelector("#mensagens-erros");
    ul.innerHTML = "";
    
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form){
    var paciente = {
        
        nome:form.nome.value,
        peso:form.peso.value,
        altura:form.altura.value,
        gordura:form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
        
    }
    return paciente;
}

function montaTr(paciente){
    
    //Cria tr do paciente
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    
    //Cria td do paciente
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    
    return pacienteTr;
}

function montaTd(dado, classe){
    
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("Nome inválido");
    }

    if(!validaPeso(paciente.peso) || paciente.peso.length == 0){
        erros.push("Peso é inválido");
    }    

    if(!validaAltura(paciente.altura) || paciente.altura.length == 0){
        erros.push("Altura é inválida");    
    }

    if(paciente.gordura.length == 0){
        erros.push("Gordura inválida");
    }
    
    return erros;
}
