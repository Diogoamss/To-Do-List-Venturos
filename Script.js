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

        popupAviso()
        alert('já existe essa task.')
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

        list.innerHTML += `<li>${values[i] ['name']} <button id='editTask' class='editTask' onclick='editTask("${values [i] ['name']}")'><img src="assets/pen.svg" alt="caneta"></button><button id='deletTask' class='deletTask' onclick='deletTask("${values [i] ['name']}")'><img src="assets/trash3.svg" alt="lixo/delete"></button></li>`
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

function closePopup() {
    document.getElementById('PopUpAviso').style.display = 'none';
}


function popupAviso() {
    document.getElementById('PopUpAviso').style.display = 'block';
}
