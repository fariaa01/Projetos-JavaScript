const cont = document.querySelector('#container');

cont.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const inputBase = e.target.querySelector('#base');
    const inputAltura = e.target.querySelector('#altura');

    const base = Number(inputBase.value);
    const altura = Number(inputAltura.value);
    const calculo = getCalculo(base, altura); 

    const msg = `O valor da área do triângulo é ${calculo}`;
    setResultado(msg);
});

function getCalculo(base, altura) {
    const calculo = (base * altura) / 2;
    return calculo.toFixed(2);
}

function criaP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(msg) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = criaP();
    p.innerHTML = msg;
    p.classList.add('paragrafo-resultado');
    resultado.appendChild(p);
}