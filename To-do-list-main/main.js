const typingTarefa = document.querySelector('#task-input');
const addtarefa = document.querySelector('.add-btn');
const tasklist = document.querySelector('.tasklist');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criatarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('click', function() {
        if (checkbox.checked) {
            li.style.textDecoration = 'line-through'; 
        } else {
            li.style.textDecoration = 'none'; 
        }
    });


    li.appendChild(checkbox);
    tasklist.appendChild(li);
}

addtarefa.addEventListener('click', function() {
    if (!typingTarefa.value) return;
    criatarefa(typingTarefa.value);
    typingTarefa.value = ''; 
});

typingTarefa.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && typingTarefa.value) {
        criatarefa(typingTarefa.value);
        typingTarefa.value = ''; 
    }
});