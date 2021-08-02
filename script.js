var add_tarefa = function () {
    let tarefas_pendentes = document.getElementById("tarefas-pendentes");
    
    let tarefa = document.getElementById("tarefa");
    let responsavel = document.getElementById("responsavel");
    let prazo = document.getElementById("prazo");

    let list_item = document.createElement('li');

    let text = document.createElement("label");
    text.innerHTML = tarefa.value + " | " + responsavel.value + " | " + prazo.value + " ";

    let btn_remover = document.createElement("button");
    btn_remover.innerHTML = "X";
    btn_remover.className = "remover";
    btn_remover.onclick = remover_tarefa;

    let btn_editar = document.createElement("button");
    btn_editar.innerHTML = "Editar";
    btn_editar.className = "editar";
    btn_editar.onclick = editar_tarefa;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", mover_tarefa);

    list_item.appendChild(checkbox);
    list_item.appendChild(text);
    list_item.appendChild(btn_editar);
    list_item.appendChild(btn_remover);

    tarefas_pendentes.appendChild(list_item);
    
};

var editar_tarefa = function () {
    console.log("Editar tarefa...");
    let listItem = this.parentNode;
    let label = listItem.querySelector("label");

    var edit_text = document.createElement("input");
    listItem.insertBefore(edit_text, this);
    edit_text.type = "text";
    edit_text.name = "edit-tarefa";	
    edit_text.value = label.innerHTML;

    this.innerHTML = "Salvar";
    this.onclick = salvar_tarefa; 
};

var salvar_tarefa = function () {
    console.log("Salvando tarefa...");
    let listItem = this.parentNode;
    let label = listItem.querySelector("label");
    let text_input = listItem.querySelector('input[type=text]');

    label.innerHTML = text_input.value;

    let btn_salvar = listItem.querySelector("button[class=editar]");

    btn_salvar.innerHTML = "Editar";
    btn_salvar.onclick = editar_tarefa;

    listItem.removeChild(text_input);

};

var mover_tarefa = function () {
    console.log("Movendo tarefa...");
    let listItem = this.parentNode;
    if (this.checked == true) {
        lista_de_tarefas_pendentes.removeChild(listItem);
        lista_de_tarefas_concluidas.appendChild(listItem);
    } else {
        lista_de_tarefas_concluidas.removeChild(listItem);
        lista_de_tarefas_pendentes.appendChild(listItem);   
    }
};

var remover_tarefa = function () {
    console.log("Removendo tarefa...");
    let listItem = this.parentNode;
    let ul=listItem.parentNode;
    ul.removeChild(listItem);
};

var save_lists = () => {
    let tarefas_pendentes = gerar_json(lista_de_tarefas_pendentes);
    let tarefas_concluidas = gerar_json(lista_de_tarefas_concluidas);

    tarefas_pendentes.unshift('Tarefas Pendentes');
    tarefas_concluidas.unshift('Tarefas Concluidas');

    console.log(tarefas_pendentes);
    console.log(tarefas_concluidas);

    let tarefas = new Array();

    tarefas.push(tarefas_pendentes);
    tarefas.push(tarefas_concluidas);

    console.log(tarefas);

    let tarefas_json = JSON.stringify(tarefas);

    console.log(tarefas_json);

    var jsonArray = JSON.parse(JSON.stringify(tarefas));

    console.log(jsonArray);

};

function  gerar_json(lista) {
    let tarefas = new Array();
    
    let lista_de_tarefas = lista.getElementsByTagName('label');

    for (let i = 0; i < lista_de_tarefas.length; i++) {

        let tarefa = lista_de_tarefas[i].innerText.split(" | ");

        let nome_tarefa = tarefa[0];
        let responsavel = tarefa[1];
        let prazo =       tarefa[2];

        tarefas.push({
            tarefa : nome_tarefa,
            responsavel : responsavel,
            prazo : prazo
        });
    }

    return tarefas;
}

let lista_de_tarefas_pendentes = document.getElementById("tarefas-pendentes");
let lista_de_tarefas_concluidas = document.getElementById("tarefas-realizadas");