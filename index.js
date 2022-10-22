// Forma reduzida usando template string
let id = 0

const tarefa = (id, novaTarefa) => `<div id='${id}'>
<input type="checkbox" />
<p>${novaTarefa}</p>
</div>`

function exibirLista() {
    id++
    const tarefas = JSON.parse(localStorage.getItem('lista-tarefas'))
    if(tarefas){
        tarefas.forEach(tarefaListada => {
            document.querySelector('#lista-tarefas').innerHTML += tarefa(id, tarefaListada)
        })
    }
}

function adicionarTarefa(){
    id++
    const novaTarefa = document.getElementById('nome-tarefa').value
    document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa)
    const listaTarefas = localStorage.getItem('lista-tarefas')
    if(listaTarefas){
        const novaLista = JSON.parse(listaTarefas)
        novaLista.push(novaTarefa)
        localStorage.setItem('lista-tarefas', JSON.stringify(novaLista))
    } else {
        localStorage.setItem('lista-tarefas', JSON.stringify([novaTarefa]))
    }
}

exibirLista()

// Forma extensiva
/* function addTarefa () {
    id ++ // vai adicionando mais ids

    const tarefa = document.createElement('div') // cria um elemento div
    const nomeTarefa = document.createElement('p') // cria um elemento p
    const checkbox = document.createElement('input') // cria um elemento input
    nomeTarefa.innerHTML = 'Tarefa' // Vai escrever o texto tarefa
    checkbox.type = 'checkbox' // define o input checkbox como checkbox
    tarefa.id = id //cria um id para o elemento div
    nomeTarefa.innerHTML = newTask.value
    tarefa.appendChild(nomeTarefa) // adiciona o paragrafo com a id nomeTarefa na div tarefa
    tarefa.appendChild(checkbox) //adiciona o checkbox como filha de tarefa 
    document.querySelector('#listaTarefas').appendChild(tarefa) //seleciona a div com id "listaTarefas" e adiciona como filha de tarefa (idTarefa)
} */