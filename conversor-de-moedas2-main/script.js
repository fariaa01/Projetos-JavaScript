const form = document.querySelector('#form-moedas');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputValor = e.target.querySelector('#valor');
    const valor = Number(inputValor.value);

    const moedaOrigem = getMoeda();
    const moedaDestino = getMoeda2();
    const nomeMoedaDestino = getNomeMoeda(moedaDestino);

    if (moedaOrigem === moedaDestino) {
        const msg = "Selecione moedas diferentes para conversão!";
        setResultado(msg, false);
    } else {
        const msg = `O valor convertido é ${calculoMoeda(moedaOrigem, valor, moedaDestino).toFixed(2)} ${nomeMoedaDestino}`;
        setResultado(msg, true);
    }
});

function getMoeda() {
    let select = document.getElementById('moeda');
    return select.value;
}

function getMoeda2() {
    let select2 = document.getElementById('moeda-destino');
    return select2.value;
}

function getNomeMoeda(moeda) {
    switch (moeda) {
        case "BRL": return "reais";
        case "USD": return "dólares";
        case "EUR": return "euros";
        case "GBP": return "libras";
        default: return moeda;
    }
}

function calculoMoeda(getMoeda, valor, getMoeda2) { 
    const dolaEreal = valor / 5.73;
    const dolaEeuro = valor / 1.09;
    const dolarElibra = valor / 1.29;

    const realEdolar = valor * 5.73;
    const realEeuro= valor * 6.14;
    const realElibra = valor * 7.33;

    const euroEdolar = valor / 1.09;
    const euroElibra= valor * 0.84;
    const euroEreal = valor / 6.14;

    const libraEdolar = valor * 1.29;
    const libraEuro = valor / 0.84;
    const libraEreal = valor / 7.33;


    if (getMoeda === "USD" && getMoeda2 === "BRL") {
        return dolaEreal;
    } else if (getMoeda === "USD" && getMoeda2 === "EUR") {
        return dolaEeuro;
    } else if (getMoeda === "USD" && getMoeda2 === "GBP") {
        return dolarElibra;

    } else if (getMoeda === "BRL" && getMoeda2 === "USD") {
        return realEdolar;
    } else if (getMoeda === "BRL" && getMoeda2 === "EUR") {
        return realEeuro;
    } else if (getMoeda === "BRL" && getMoeda2 === "GBP") {
        return realElibra;
    }

    else if (getMoeda === "EUR" && getMoeda2 === "USD") {
    return euroEdolar;
    } else if (getMoeda === "EUR" && getMoeda2 === "GBP") {
    return euroElibra; 
    } else if (getMoeda === "EUR" && getMoeda2 === "BRL") {
    return euroEreal;
    }

    else if (getMoeda === "GBP" && getMoeda2 === "USD") {
    return libraEdolar;
    } else if (getMoeda === "GBP" && getMoeda2 === "EUR") {
    return libraEuro;
    } else if (getMoeda === "GBP" && getMoeda2 === "BRL") {
    return libraEreal;
    }
}

function criaP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(msg, sucesso) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    const p = criaP();
    p.innerHTML = msg;
    p.classList.add('paragrafo-resultado');

    if (!sucesso) {
        p.classList.add('erro');
    }

    resultado.appendChild(p);
}
