// Seleciona todos os botões de função
const botoes = document.querySelectorAll(".botoes-funcoes button");
const telaCarregamento = document.getElementById("loading-screen");
const botaoCancelar = document.getElementById("cancelar-processamento");

// Mostra a tela de carregamento
function mostrarLoading() {
  telaCarregamento.classList.remove("hidden");
}

// Esconde a tela de carregamento
function esconderLoading() {
  telaCarregamento.classList.add("hidden");
}

// Adiciona evento de clique a todos os botões
botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    mostrarLoading();

    // Simula um tempo de processamento fake (3 segundos)
    setTimeout(() => {
      esconderLoading();
      alert("Função ainda não disponível!");
    }, 7000);
  });
});

// Botão de cancelar
botaoCancelar.addEventListener("click", () => {
  esconderLoading();
});
