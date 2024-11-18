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
                    <input type="checkbox" id="progress" class="progress" onchange="moveTask(this)">
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

    attachEventListeners()
}

function attachEventListeners() {
    // Reassociando eventos de edição
    const editButtons = document.querySelectorAll('.editTask');
    editButtons.forEach(button => {
        button.addEventListener('click', () => editTask(button.dataset.name));
    });

    // Reassociando eventos de exclusão
    const deleteButtons = document.querySelectorAll('.deletTask');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => deletTask(button.dataset.name));
    });
}

showValues()

function validateIfExistNewTask(){

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('taskInput').value
    let exist = values.find(x => x.name == inputValue)
    return !exist ? false : true

}

//função para deletar task

function deletTask(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Encontre o índice da tarefa a ser excluída com base no nome único
    let index = values.findIndex(x => x.name === data);
    
    if (index !== -1) {
        values.splice(index, 1); // Remove a tarefa da lista
        localStorage.setItem(localStorageKey, JSON.stringify(values)); // Atualiza o localStorage
        showValues(); // Atualiza a lista de tarefas
    }
    showValues();
}


/*function editTask(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === data);

    if (index === -1) {
        popupAviso2(); // Mostra aviso se a tarefa não for encontrada
        return;
    }

    document.getElementById('PopUpAviso3').style.display = 'block';
    const inputEdit = document.getElementById('promptEditTask');
    inputEdit.value = data; // Preenche o input com o valor atual da tarefa
    inputEdit.setAttribute('data-old-name', data); // Armazena o nome antigo no atributo `data`
}
*/

// Função chamada ao confirmar a edição
function editTaskFromPopup() {
    const inputEdit = document.getElementById('promptEditTask');
    const newName = inputEdit.value.trim();
    const oldName = inputEdit.getAttribute('data-old-name'); // Recupera o nome antigo

    if (!newName) {
        popupAviso2(); // Mostra aviso se o nome estiver vazio
        return;
    }

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Verifica se o novo nome já existe, excluindo o nome antigo
    if (values.some(x => x.name === newName && x.name !== oldName)) {
        popupAviso(); // Mostra aviso se a tarefa já existir
        return;
    }

    // Atualiza a tarefa no localStorage
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
    document.getElementById('PopUpAviso4').style.display = 'none';
}


function popupAviso() {
    body.innerHTML+=
    `<div id="PopUpAviso">
        
        <button id="closePopup" onclick="closePopup('PopUpAviso')">
            X
        </button>
        
        <p id="msgErro">Essa task já existe</p>
    </div>
    `

    document.getElementById('PopUpAviso').style.display = 'block';
}

function popupAviso2(){
    body.innerHTML+=
    `<div id="PopUpAviso2">
        
        <button id="closePopup" onclick="closePopup('PopUpAviso2')">
            X
        </button>
        
        <p id="msgErro2">Digite uma task valida</p>
    </div>
    `

    document.getElementById('PopUpAviso2').style.display = 'block';

}

function popupAviso3(){
    body.innerHTML+=
    `<div id="PopUpAviso3">
        <button id="closePopup" onclick="closePopup('PopUpAviso3')">
            X
        </button>
        <input type="text" id="promptEditTask" class="promptEditTask" placeholder="Editar nome da Task:">
        <button id="EditTaskButton" class="EditTaskButton" onclick="editTaskFromPopup()">🖉</button>
    </div>
    `
    
    document.getElementById('PopUpAviso3').style.display = 'block';

    let newPrompt = document.getElementById('promptEditTask')

    return newPrompt

}

// Elementos do Timer
const display = document.getElementById("display");
const icon = document.getElementById("start");
const button = document.getElementById("StartBtn");

let comecoTimer = 0;
let timer = 0;
let TempoGasto = 0;
let Funcionando = false;

// Funções do Timer
function toggleTimer() {
    if (!Funcionando) { // Se não está funcionando, começa o timer
        comecoTimer = Date.now() - TempoGasto; // Inicializa o timer
        timer = setInterval(update, 10); // Atualiza a cada 10ms
        Funcionando = true;

        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        button.style.backgroundColor = "#d8771c";
    } else { // Pausa o timer
        clearInterval(timer);
        TempoGasto = Date.now() - comecoTimer; // Salva o tempo gasto
        Funcionando = false;

        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        button.style.backgroundColor = "#e4b080";
    }
}

function reset() {
    clearInterval(timer); // Para o timer
    TempoGasto = 0; // Zera o tempo
    Funcionando = false;
    display.textContent = "00:00";

    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    button.style.backgroundColor = "#e4b080";
}

function update() {
    const currentime = Date.now();
    TempoGasto = currentime - comecoTimer;

    let minutes = Math.floor(TempoGasto / (1000 * 60));
    let seconds = Math.floor((TempoGasto / 1000) % 60);

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}`;
}

// Funções do Popup
function popupAviso4() {
    body.innerHTML+=
    `<div id="Time-container">
            <div id="items">
                <div id="display">
                    00:00
                </div>
                <button id="StartBtn" onclick="toggleTimer()">
                    <i class="fa-solid fa-play" style="color: #ffffff;" id="start"></i>
                </button>
                <button id="resetBtn" onclick="reset()">
                    <i class="fa-solid fa-arrow-rotate-left" style="color: #ffffff;"></i>
                </button>
            </div>
        </div>
    </div>
    `

    document.getElementById('PopUpAviso4').style.display = 'block'; // Mostra o popup
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none'; // Oculta o popup
}

function changeTheme(theme) {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const search = document.getElementById('search');
    
    // Remove todas as classes de temas
    body.className = '';
    sidebar.className = 'sidebar';
    search.className = 'search';

    // Adiciona as novas classes de tema
    body.classList.add(`${theme}-theme`);
    sidebar.classList.add(`${theme}-theme`);
    search.classList.add(`${theme}-theme`);
}


//função para mover task prontas para #uldone
function moveTask(checkbox){

    const taskMarked = checkbox.closest('li')
    const editButton = taskMarked.querySelector('.editTask')

    if(checkbox.checked) {

        if(editButton){

            editButton.style.display = 'none'
        }
        document.querySelector('#uldone').appendChild(taskMarked)
    }else{

        if(editButton){

            editButton.style.display = 'block'
        }
        document.querySelector('#to-do-list').appendChild(taskMarked)
    }
}