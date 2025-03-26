const form = document.querySelector('#form-comprimento')

form.addEventListener('submit', function(e){
    e.preventDefault();

    const inputValor = e.target.querySelector('#valor');
    const valor = Number(inputValor.value);

    const valorDeorigem = getValor();
    const valorDedestino = getValor2();

    if(valorDeorigem === valorDedestino){
        const msg = "Selecione outra medida para conversão!";
        setResultado(msg, false);
    } else {
        const msg = `O valor da medida convertida é: ${getCalculo(valor,valorDeorigem,valorDedestino).toFixed(2)}`;
        setResultado(msg, true);
    }
});

function getValor() {
    let select = document.getElementById('unidade');
    return select.value;
}

function getValor2() {
    let select2 = document.getElementById('unidade-destino');
    return select2.value;
}

function getCalculo(valor, getValor, getValor2) {
    const metro1 = valor * 0.001;
    const metro2 = valor * 0.000621371;
    const metro3 = valor * 3.28084;
    const metro4 = valor * 39.3701;

    const quilometro1 = valor * 1000;
    const quilometro2 = valor * 0.621371;
    const quilometro3 = valor * 3280.84;
    const quilometro4 = valor * 39370.1;

    const milhas1 = valor * 1609.34;
    const milhas2 = valor * 1.60934;
    const milhas3 = valor * 5.280;
    const milhas4 = valor * 63.360;

    const pes1 = valor * 0.3048;
    const pes2 = valor * 0.0003048;
    const pes3 = valor * 0.000189394;
    const pes4 = valor * 12;

    const polegadas1 = valor * 0.0254;
    const polegadas2 = valor * 0.0000254;
    const polegadas3 = valor * 0.0000157828;
    const polegadas4 = valor * 0.0833333;

    if (getValor === "metro" && getValor2 === "quilometro") {
        return metro1;
    } else if (getValor === "metro" && getValor2 === "milha") {
        return metro2;
    } else if (getValor === "metro" && getValor2 === "pe") {
        return metro3;
    } else if (getValor === "metro" && getValor2 === "polegada") {
        return metro4;

    } else if (getValor === "quilometro" && getValor2 === "metro") {
        return quilometro1;
    } else if (getValor === "quilometro" && getValor2 === "milha") {
        return quilometro2;
    } else if (getValor === "quilometro" && getValor2 === "pe") {
        return quilometro3;
    } else if (getValor === "quilometro" && getValor2 === "polegada") {
        return quilometro4;
    } 
    
    else if (getValor === "milha" && getValor2 === "metro") {
        return milhas1;
    } else if (getValor === "milha" && getValor2 === "quilometro") {
        return milhas2;
    } else if (getValor === "milha" && getValor2 === "pe") {
        return milhas3;
    } else if (getValor === "milha" && getValor2 === "polegada") {
        return milhas4;
    }
    
    else if (getValor === "pe" && getValor2 === "metro") {
        return pes1;
    }
    else if (getValor === "pe" && getValor2 === "quilometro") {
        return pes2;
    } else if (getValor === "pe" && getValor2 === "milha") {
        return pes3;
    } else if (getValor === "pe" && getValor2 === "polegada") {
        return pes4;
    } 
    
    else if (getValor === "polegada" && getValor2 === "metro") {
        return polegadas1;
    } 
    else if (getValor === "polegada" && getValor2 === "quilometro") {
        return polegadas2;
    } else if (getValor === "polegada" && getValor2 === "milha") {
        return polegadas3;
    } else if (getValor === "polegada" && getValor2 === "pe") {
        return polegadas4;
    }
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
