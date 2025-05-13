import { aplicarPretoBranco } from './funcao-preto-branco.js';
import { aplicarBaixaQualidade } from './funcao-piorar-imagem.js';
import { aplicarInverterCores } from './funcao-inverter-cores.js';

// Seleciona elementos
const botoes = document.querySelectorAll(".botoes-funcoes button");
const telaCarregamento = document.getElementById("loading-screen");
const botaoCancelar = document.getElementById("cancelar-processamento");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Funções de loading
function mostrarLoading() {
  telaCarregamento.classList.remove("hidden");
}

function esconderLoading() {
  telaCarregamento.classList.add("hidden");
}

// Processar a imagem com a função escolhida
function processarImagem(funcao) {
  funcao(canvas, ctx);
}

// Carregar imagem do localStorage no canvas
window.addEventListener("DOMContentLoaded", () => {
  const imageData = localStorage.getItem("imagemOriginal");
  if (!imageData) {
    alert("Nenhuma imagem foi carregada. Redirecionando para upload.");
    window.location.href = "../pages/upload.html";
    return;
  }

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Habilita os botões depois da imagem carregar
    botoes.forEach(botao => botao.disabled = false);
  };

  img.onerror = () => {
    console.error("Erro ao carregar a imagem.");
  };

  img.src = imageData;
});

botoes.forEach(botao => {
  botao.addEventListener("click", async () => {
    mostrarLoading();

    let funcaoEscolhida;

    switch (botao.id) {
      case "btn-inverter-cores":
        funcaoEscolhida = aplicarInverterCores;
        break;
      case "btn-preto-branco":
        funcaoEscolhida = aplicarPretoBranco;
        break;
      case "btn-piorar-imagem":
        funcaoEscolhida = aplicarBaixaQualidade;
        break;
      default:
        alert("Função não disponível!");
        esconderLoading();
        return;
    }

    // Dá um pequeno delay antes de começar (só visual mesmo)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Processa a imagem
    processarImagem(funcaoEscolhida);

    // Salva no localStorage a nova imagem
    localStorage.setItem("imagemOriginal", canvas.toDataURL());

    // Esconde o loading
    esconderLoading();
  });
});

// Cancelar processamento
botaoCancelar.addEventListener("click", () => {
  esconderLoading();
});
