const form = document.getElementById("chat-form");
const promptInput = document.getElementById("prompt");
const messages = document.getElementById("messages");

// Carregar histórico
let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

// Exibir mensagens salvas
history.forEach(msg => {
    addMessage(msg.text, msg.sender);
});

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const text = promptInput.value.trim();

    if(text === "") return;

    addMessage(text, "user");

    saveMessage(text, "user");

    promptInput.value = "";

    setTimeout(() => {

        const resposta = "Olá! Esta é uma resposta simulada da IA.";

        addMessage(resposta, "bot");

        saveMessage(resposta, "bot");

    }, 1000);

});

function addMessage(text, sender) {

    const div = document.createElement("div");

    div.classList.add(sender);

    div.innerHTML = `<p>${text}</p>`;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

function saveMessage(text, sender) {

    history.push({
        text,
        sender
    });

    localStorage.setItem(
        "chatHistory",
        JSON.stringify(history)
    );
}
promptInput.addEventListener("keydown", function(e){

    if(e.key === "Enter" && !e.shiftKey){

        e.preventDefault();

        form.requestSubmit();

    }

});
