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

    const toDoList = document.getElementById('to-do-list');
    const doneList = document.getElementById('uldone');

    toDoList.innerHTML = '';
    doneList.innerHTML = '';

    values.forEach(task => {
        const taskElement = `
            <li data-name="${task.name}">
                <div id="divCheckbox">
                    <input type="checkbox" class="progress" onchange="moveTask(this)" ${task.done ? 'checked' : ''}>
                </div>
                <div id="taskString">${task.name}</div>
                <div id="buttonEdit">
                    <button class="editTask" id="editTask" onclick='editTask("${task.name}")'>
                        <img src="assets/pen.svg" alt="Editar">
                    </button>
                </div>
                <div id="buttonDelet">
                    <button class="deletTask" id="deletTask" onclick='deletTask("${task.name}")'>
                        <img src="assets/trash3.svg" alt="Deletar">
                    </button>
                </div>
            </li>`;

        if (task.done) {
            doneList.innerHTML += taskElement;
        } else {
            toDoList.innerHTML += taskElement;
        }
    });
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

function deletTask(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Filtra para excluir a tarefa correspondente
    values = values.filter(task => task.name !== taskName);

    // Atualiza o localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(values));

    // Remove a tarefa do DOM
    const taskElement = document.querySelector(`li[data-name="${taskName}"]`);
    if (taskElement) {
        taskElement.remove();
    }
    showValues()
}


function editTask(data) {
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


function popupAviso() {
    document.getElementById('PopUpAviso').style.display = 'block';
}

function popupAviso2(){
    document.getElementById('PopUpAviso2').style.display = 'block';

}

function popupAviso3(){
    document.getElementById('PopUpAviso3').style.display = 'block';

    let newPrompt = document.getElementById('promptEditTask')

    return newPrompt

}
function popupAviso4() {
    document.getElementById('PopUpAviso4').style.display = 'block'; // Mostra o popup
}
function popupAviso5() {
    document.getElementById('PopUpAviso5').style.display = 'block'; // Mostra o popup
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



function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none' // Oculta o popup
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
function moveTask(checkbox) {
    const taskElement = checkbox.closest('li'); // Encontra o elemento pai do checkbox
    const taskName = taskElement.getAttribute('data-name'); // Obt�m o nome da tarefa

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Atualiza o campo "done" da tarefa
    const task = values.find(task => task.name === taskName);
    if (task) {
        task.done = checkbox.checked;
    }

    // Atualiza o localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(values));

    // Esconde o bot�o de edi��o para a tarefa atual
    const editButton = taskElement.querySelector('.editTask'); // Seleciona o bot�o de edi��o dentro do taskElement
    if (editButton) {
        editButton.style.display = 'none'; // Oculta o bot�o
    }else{

        editButton.style.display = 'block'
    }

    showValues(); // Atualiza a interface
}





const currentTime = document.querySelector("h1"),
    content = document.querySelector('.alarm-content'),
    selectMenu = document.querySelectorAll('select'),
    btnSetAlarm = document.querySelector('.Alarmbtn');


setInterval(() => {
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        ampm = "AM";

    if (hours >= 12) {
        hours = hours - 12;
        ampm = "PM";
    }

    hours = hours == 0 ? hours = 12 : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    currentTime.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;

    if (alarmTime === `${hours}:${minutes} ${ampm}`) {
        ringTone.play();
        ringTone.loop = true;
    }

});

let alarmTime, isAlarmSet, ringTone = new Audio("/assets/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}


for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringTone.pause();
        content.classList.remove("disable");
        btnSetAlarm.innerHTML = "Ativar Alarme";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Insira horas e minutos válidos para ativar o alarme, por favor!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    btnSetAlarm.innerHTML = "Desativar Alarme";
}
btnSetAlarm.addEventListener("click", setAlarm);