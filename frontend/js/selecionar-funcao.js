// frontend/js/selecionar-funcao.js
import { aplicarPretoBranco } from './funcao-preto-branco.js';
import { aplicarBaixaQualidade } from './funcao-piorar-imagem.js';
import { aplicarInverterCores } from './funcao-inverter-cores.js';

const botoes = document.querySelectorAll(".botoes-funcoes button");
const telaCarregamento = document.getElementById("loading-screen");
const botaoCancelar = document.getElementById("cancelar-processamento");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let currentImageUrl = null; // Para guardar a URL da imagem atual (processada ou original)
let originalImageForReset = null; // Para guardar a imagem original e resetar efeitos

// Funções de loading
function mostrarLoading() {
  telaCarregamento.classList.remove("hidden");
}

function esconderLoading() {
  telaCarregamento.classList.add("hidden");
}

// Processar a imagem com a função escolhida (CLIENT-SIDE)
function processarImagem(funcao) {
  funcao(canvas, ctx); // As funções operam no canvas local
  // Não há salvamento no localStorage ou atualização de currentImageUrl aqui
  // pois a imagem processada está apenas no canvas do cliente.
}

// Função para recarregar a imagem original no canvas
function resetarParaOriginal() {
    if (originalImageForReset) {
        canvas.width = originalImageForReset.width;
        canvas.height = originalImageForReset.height;
        ctx.drawImage(originalImageForReset, 0, 0);
        console.log("Canvas resetado para a imagem original.");
    } else if (currentImageUrl) {
        // Fallback se originalImageForReset não estiver carregado, tenta recarregar da URL
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Para evitar problemas de CORS com o canvas
        img.onload = () => {
            originalImageForReset = img; // Armazena para futuros resets
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            console.log("Canvas resetado para a imagem original (recarregada da URL).");
        };
        img.onerror = (e) => {
            console.error("Falha ao recarregar imagem original para reset. URL:", currentImageUrl, "Erro:", e);
        };
        img.src = currentImageUrl;
    }
}


window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrlFromQuery = urlParams.get('imageUrl');

    if (!imageUrlFromQuery) {
        alert("Nenhuma imagem foi carregada. Redirecionando para upload.");
        window.location.href = "/pages/upload.html"; // Usando caminho absoluto
        return;
    }

    currentImageUrl = imageUrlFromQuery;
    console.log("Página selecionar-funcao: Tentando carregar imagem da URL:", currentImageUrl);

    const img = new Image();
    // Adicionar crossOrigin="anonymous" pode ajudar se houver alguma política de CORS
    // mesmo que servido do mesmo domínio, especialmente ao usar toDataURL no canvas.
    img.crossOrigin = "Anonymous";

    img.onload = () => {
        console.log("Imagem carregada com sucesso no objeto Image. Dimensões:", img.width, "x", img.height);
        originalImageForReset = img; // Guarda a imagem original para resetar
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        console.log("Imagem desenhada no canvas.");
        botoes.forEach(botao => {
            // Habilita apenas os botões que não são de áudio/vídeo por enquanto
            if (botao.id !== "btn-video" && botao.id !== "btn-audio") {
                 botao.disabled = false;
            }
        });
    };

    img.onerror = (event) => {
        console.error("--------------------------------------------------");
        console.error("FALHA AO CARREGAR IMAGEM EM selecionar-funcao.js");
        console.error("URL Tentada:", currentImageUrl);
        console.error("Evento de erro:", event);
        console.error("Verifique se o servidor está rodando e se a URL está acessível diretamente no navegador.");
        console.error("Exemplo de URL para testar no navegador: http://localhost:3000" + currentImageUrl);
        console.error("--------------------------------------------------");
        alert("Erro ao carregar a imagem. Verifique o console do navegador para mais detalhes (Pressione F12).");
        // Poderia redirecionar ou mostrar uma imagem placeholder
    };

    img.src = currentImageUrl; // Carrega a imagem usando a URL do servidor
});

botoes.forEach(botao => {
    botao.addEventListener("click", async () => {
        if (!originalImageForReset && !currentImageUrl) { // Verifica se há base para processar
            alert("Nenhuma imagem carregada para processar.");
            return;
        }

        // Sempre reseta para a imagem original ANTES de aplicar um novo efeito
        // para que os efeitos não se acumulem indesejadamente.
        resetarParaOriginal();

        // Aguarda um pequeno instante para garantir que o reset foi renderizado se for assíncrono
        await new Promise(resolve => setTimeout(resolve, 50));


        const imageFunctionButtons = ["btn-inverter-cores", "btn-preto-branco", "btn-piorar-imagem"];
        if (imageFunctionButtons.includes(botao.id)) {
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
                default: // Este caso não deve ser alcançado devido ao .includes()
                    alert("Função de imagem não reconhecida!");
                    esconderLoading();
                    return;
            }

            // Delay visual (pode ser ajustado ou removido)
            await new Promise(resolve => setTimeout(resolve, 300));

            console.log(`Aplicando função: ${botao.id}`);
            processarImagem(funcaoEscolhida);

            esconderLoading();
        } else if (botao.id === "btn-video" || botao.id === "btn-audio") {
            alert("Funções de vídeo e áudio ainda não implementadas.");
        } else {
            // Para outros botões que não são de processamento de imagem nem áudio/vídeo
            console.warn(`Botão com ID '${botao.id}' clicado, mas sem ação definida.`);
        }
    });
});

botaoCancelar.addEventListener("click", () => {
    esconderLoading();
});
