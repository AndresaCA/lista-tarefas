/* Aplicar tema*/
const corTemas = document.querySelectorAll('[name="tema"]')

// Guarda o tema no localStorage
const guardarTema = function(tema) {
    localStorage.setItem('tema', tema)
}

const retirarTema = function() {
    const temaAtual = localStorage.getItem('tema')
    corTemas.forEach((opçaoTema) => {
        if (opçaoTema.id === temaAtual) {
            opçaoTema.checked = true
        }
    })
}

corTemas.forEach(opçaoTema => {
    opçaoTema.addEventListener('click', () => {
        guardarTema(opçaoTema.id)
    })
})

document.onload = retirarTema()

/* Adicionar e remover tarefas*/
let id = 0
const tarefa = (id, novaTarefa) => `<div>
<span>
<input type="checkbox" onchange="marcarTarefa(${id})"/>
<p id='${id}'>${novaTarefa}</p>
</span>
<button onclick="removerTarefa(${id})">x</button>
</div>`

const marcarTarefa = (id) => {
    const strike = document.getElementById(`strike${id}`)
    if(strike){
        document.getElementById(id).innerHTML = strike.innerHTML
    } else {
        const tarefaConcluida = document.getElementById(id).innerHTML
        document.getElementById(id).innerHTML = `<strike id='strike${id}'>${tarefaConcluida}</strike`
    }
}

function exibirLista() {
    const tarefas = JSON.parse(localStorage.getItem('lista-tarefas'))
    if(tarefas){
        tarefas.forEach(tarefaListada => {
            id++
            document.querySelector('#lista-tarefas').innerHTML += tarefa(id, tarefaListada)
        })
    }
}

const validarTarefa = (novaTarefa) => {
    let tarefaExistente = false
    const listaTarefas = JSON.parse(localStorage.getItem('lista-tarefas'))

    if(listaTarefas){
        listaTarefas.map(tarefa => {
            if(tarefa === novaTarefa){
                tarefaExistente = true
                alert('Essa tarefa já existe.')
            }
        })
        return tarefaExistente
    }
}

function adicionarTarefa(){
    id++
    const novaTarefa = document.getElementById('nome-tarefa').value
    const listaTarefas = localStorage.getItem('lista-tarefas')
    if(validarTarefa(novaTarefa)){
        return
    }
    document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa)
    if(listaTarefas){
        const novaLista = JSON.parse(listaTarefas)
        novaLista.push(novaTarefa)
        localStorage.setItem('lista-tarefas', JSON.stringify(novaLista))
    } else {
        localStorage.setItem('lista-tarefas', JSON.stringify([novaTarefa]))
    }
}

function adicionarTarefaEnter(event) {
    if (event.keyCode == 13) {
        adicionarTarefa()
        limparInput()
    }
}

function limparInput() {
    document.getElementById("nome-tarefa").value="";
}

const removerTarefa = (id) => {
    const tarefaDeletada = document.getElementById(id).innerHTML
    const listaTarefas = JSON.parse(localStorage.getItem('lista-tarefas'))
    const novaListaTarefa = listaTarefas.filter(tarefa => tarefa !== tarefaDeletada)
    localStorage.setItem('lista-tarefas', JSON.stringify(novaListaTarefa))
    document.querySelector('#lista-tarefas').innerHTML = ''
    exibirLista()
}
exibirLista()