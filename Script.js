const sendButton = document.getElementById('SendNewTask');
const iconImage = document.getElementById('iconImage');
const taskInput = document.getElementById('taskInput');
const localStorageKey = 'to-do-list-gn'

sendButton.addEventListener('click', () => {
    // Esconde o texto
    taskInput.classList.add('hidden');

    // Move o bot�o para a esquerda e troca o �cone
    sendButton.classList.add('active');
    iconImage.src = 'assets/check-lg.svg'; // Troca para o �cone de check

    // Ap�s 1000ms, retorna o bot�o e o �cone ao estado inicial
    setTimeout(() => {
        sendButton.classList.remove('active');
        iconImage.src = 'assets/chevron-left.svg'; // Troca de volta para o �cone de seta
        taskInput.classList.remove('hidden'); // Mostra o texto
    }, 1000);
});

//botando a to do list pra funcionar:
function addItem() {
    
    let input = document.getElementById("taskInput")

    if(!input.value){

        alert("digite uma task valida.")
    }
    else if(validateIfExistNewTask()){

        alert('j� existe essa task.')
    }
    else{
        //adicionar no localStorage:

        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({

            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()

    }
    input.value = ''
}

function showValues(){

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i <values.length; i++){

        list.innerHTML += `<li>${values[i] ['name']} <button id='editTask' onclick='editTask("${values [i] ['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/></svg></button><button id='deletTask' onclick='deletTask("${values [i] ['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg></button></li>`
    }

}

showValues()

function validateIfExistNewTask(){

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('taskInput').value
    let exist = values.find(x => x.name == inputValue)
    return !exist ? false : true

}

function deletTask(data){

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()

}

// Função para abrir e fechar a sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

