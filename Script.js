const sendButton = document.getElementById('SendNewTask');
const iconImage = document.getElementById('iconImage');
const taskInput = document.getElementById('taskInput');

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
function addItem() {
    console.log("Funcinoando");
}

// Função para abrir e fechar a sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

