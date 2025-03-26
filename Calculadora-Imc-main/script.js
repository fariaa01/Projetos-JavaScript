const form = document.querySelector('#form');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);
    const imc = getImc(peso,altura);
    const nivelImc = getNivel(imc);

    const msg = `Seu imc é ${imc} (${nivelImc}).`;
    setResultado(msg, true);
});

const imc = getImc(peso,altura);
const nivelImc = getNivel(imc);

function getNivel(imc){
    const nivel = ['Abaixo do peso', 'Peso normal', 'sobrepeso' , 'obesidade grau1','obesidade grau2','obesidade grau3' ];

    if(imc >= 39.9){
        return nivel [5];
    }
    else if(imc >= 34.9){
        return nivel [4];
    }
    else if(imc >= 29.9){
        return nivel [3];
    }
    else if(imc >= 24.9){
        return nivel [2];
    }
    else if(imc >= 18.5){
        return nivel [1]
    }
    else if(imc < 18.5){
        return nivel [0];
    }
}

function getImc (peso,altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function criaP(className){
    const p = document.createElement('p');
    return p;
}

function setResultado (msg) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = ``;
    
    const p = criaP();
    p.innerHTML = msg;
    p.classList.add('paragrafo-resultado');
    resultado.appendChild(p);
}


