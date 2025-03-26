const cont = document.querySelector('#container');
const slider = document.querySelector('#slider');
const inputTamanho = document.querySelector('#length');
const generateButton = document.querySelector('#generate');
const copyButton = document.querySelector('#copy');
const resultado = document.querySelector('#resultado');

generateButton.addEventListener('click', function(e) {
    e.preventDefault();

    const tamanho = Number(inputTamanho.value);
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const senha = generatePassword(tamanho, charset);

    setResultado(senha);
    copyButton.style.display = 'block';
});

slider.oninput = function() {
    inputTamanho.value = this.value;
}

function generatePassword(tamanho, charset) {
    let pass = '';
    for (let i = 0, n = charset.length; i < tamanho; i++) {
        pass += charset.charAt(Math.floor(Math.random() * n));
    }
    return pass;
}

function setResultado(msg) {
    resultado.innerHTML = '';
    const p = document.createElement('p');
    p.innerHTML = msg;
    p.classList.add('password');
    resultado.appendChild(p);
}

copyButton.addEventListener('click', function() {
    const senhaGerada = resultado.querySelector('p').textContent;
    
    navigator.clipboard.writeText(senhaGerada).then(() => {
        alert("Senha copiada com sucesso!");
    }).catch(err => {
        alert("Erro ao copiar a senha: " + err);
    });
});
