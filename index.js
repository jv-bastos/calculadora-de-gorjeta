const valorFinal = document.querySelector(".calculadora__conta__input");
const valorErro = document.querySelector(".calculadora__conta");
const numeroDePessoas = document.querySelector(".calculadora__pessoas__input");
const pessoasErro = document.querySelector(".calculadora__pessoas");
const textoErroConta = document.querySelector(".calculadora__texto-erro-conta");
const textoErroPessoas = document.querySelector(".calculadora__texto-erro-pessoas");
const valorGorjeta = document.getElementById("valor-gorjeta");
const valorConta = document.getElementById("valor-conta");
const botaoPorcentagem = document.querySelectorAll(".calculadora__porcentagem, .calculadora__porcentagem-5");
const custom = document.querySelector(".calculadora__custom");
const botoes = document.querySelectorAll(".calculadora__porcentagem, .calculadora__porcentagem-5");
const reset = document.querySelector(".resultado__reset");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.classList.contains("botao-ativo")) {
      botao.classList.remove("botao-ativo");
    } else {
      botoes.forEach(b => b.classList.remove("botao-ativo"));
      botao.classList.add("botao-ativo");
    }
  });
});

function calcularGorjeta(porcentagem) {
    let valor = Number(valorFinal.value);
    let pessoas = Number(numeroDePessoas.value);
    let erro = false;

    if (valor <= 0 || isNaN(valor)) {
        valorErro.classList.add("calculadora-erro");
        textoErroConta.classList.add("calculadora__texto-erro-ativo");
        erro = true;
    }

    if (pessoas <= 0 || isNaN(pessoas)) {
        pessoasErro.classList.add("calculadora-erro");
        textoErroPessoas.classList.add("calculadora__texto-erro-ativo");
        erro = true;
    }

    if (erro) {
        botoes.forEach(b => b.classList.remove("botao-ativo"));
        return;
    }

    let gorjeta = (((valor * porcentagem) / 100) / pessoas);
    let valorPorPessoa = ((valor / pessoas) + gorjeta);
    valorGorjeta.textContent = `$${gorjeta.toFixed(2)}`;
    valorConta.textContent = `$${valorPorPessoa.toFixed(2)}`;
    reset.classList.add("resultado__reset-ativo");
}

botaoPorcentagem.forEach(botao => {
    botao.addEventListener('click', () => {
        let texto = botao.textContent;
        let porcentagem = parseInt(texto);
        calcularGorjeta(porcentagem);
    });
});

custom.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const porcentagemCustom = Number(custom.value);
        if (!isNaN(porcentagemCustom) && porcentagemCustom > 0) {
            calcularGorjeta(porcentagemCustom);
        } else {
            custom.classList.add("calculadora__custom-erro");
        }
    }
});

function verificarCamposPreenchidos() {
    const temValor = valorFinal.value !== "" && Number(valorFinal.value) >0;
    const temPessoas = numeroDePessoas.value !== "" && Number(numeroDePessoas.value) >0;
    const temCustom = custom.value !== "" && Number(custom.value) >0;

    if (temValor || temPessoas || temCustom) {
        reset.classList.add("resultado__reset-ativo");
        valorErro.classList.remove("calculadora-erro");
        pessoasErro.classList.remove("calculadora-erro");
        custom.classList.remove("calculadora__custom-erro");
        textoErroConta.classList.remove("calculadora__texto-erro-ativo")
        textoErroPessoas.classList.remove("calculadora__texto-erro-ativo")
        botoes.forEach(b => b.classList.remove("botao-ativo"));
    } else {
        reset.classList.remove("resultado__reset-ativo");
    }
}

valorFinal.addEventListener("input", verificarCamposPreenchidos);
numeroDePessoas.addEventListener("input", verificarCamposPreenchidos);
custom.addEventListener("input", verificarCamposPreenchidos);

reset.addEventListener('click', () => {
    valorFinal.value = '';
    numeroDePessoas.value = '';
    custom.value = '';
    valorGorjeta.textContent = '$0.00';
    valorConta.textContent = '$0.00';
    botoes.forEach(b => b.classList.remove("botao-ativo"));
    reset.classList.remove("resultado__reset-ativo");
    valorErro.classList.remove("calculadora-erro");
    pessoasErro.classList.remove("calculadora-erro");
    textoErroConta.classList.remove("calculadora__texto-erro-ativo")
    textoErroPessoas.classList.remove("calculadora__texto-erro-ativo")
    custom.classList.remove("calculadora__custom-erro");
});