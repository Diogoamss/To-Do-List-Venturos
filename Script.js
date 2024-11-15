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

        popupAviso2()
    }
    else if(validateIfExistNewTask()){

        popupAviso()
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

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `
            <li>
                <div id="divCheckbox">
                    <input type="checkbox" id="progress" class="progress">
                </div>

                <div id="taskString">
                    ${values[i]['name']}
                </div>

                <div id="buttonEdit">
                    <button id='editTask' class='editTask' onclick='editTask("${values[i]['name']}")'>
                        <img src="assets/pen.svg" alt="Editar">
                    </button>
                </div>

                <div id="buttonDelet">
                    <button id='deletTask' class='deletTask' onclick='deletTask("${values[i]['name']}")'>
                        <img src="assets/trash3.svg" alt="Deletar">
                    </button>
                </div>
            </li>`;
    }
}

showValues()

function validateIfExistNewTask(){

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('taskInput').value
    let exist = values.find(x => x.name == inputValue)
    return !exist ? false : true

}

//função para deletar task

function deletTask(data){

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()

}

// Função para editar a tarefa
function editTask(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === data);

    if (index === -1) {
        popupAviso2();
        return;
    }

    document.getElementById('PopUpAviso3').style.display = 'block';
    const inputEdit = document.getElementById('promptEditTask');
    inputEdit.value = data; // Preenche o input com o valor atual da tarefa
}

// Função chamada ao confirmar a edição
function editTaskFromPopup() {
    const inputEdit = document.getElementById('promptEditTask');
    const newName = inputEdit.value.trim();

    if (!newName) {
        popupAviso2();
        return;
    }

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === newName);

    if (index !== -1) {
        popupAviso(); // Tarefa já existe
        return;
    }

    // Atualiza a tarefa no localStorage
    const oldName = document.getElementById('promptEditTask').value;
    let taskIndex = values.findIndex(x => x.name === oldName);
    values[taskIndex].name = newName;
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
    closePopup('PopUpAviso3'); // Fecha o popup
}


// Função para abrir e fechar a sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

//funções para abrir e fchar pop-ups

function closePopup() {
    document.getElementById('PopUpAviso').style.display = 'none';
    document.getElementById('PopUpAviso2').style.display = 'none';
    document.getElementById('PopUpAviso3').style.display = 'none';
}


function popupAviso() {
    document.getElementById('PopUpAviso').style.display = 'block';

}

function popupAviso2(){
    document.getElementById('PopUpAviso2').style.display = 'block';

}

function popupAviso3(){
    document.getElementById('PopUpAviso2').style.display = 'block';

    let newPrompt = document.getElementById('promptEditTask')

    return newPrompt

}