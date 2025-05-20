// Seleciona o input de upload de imagem e o canvas da página
const inputUpload = document.getElementById("upload-input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); // Contexto 2D do canvas, usado para desenhar a imagem

// Evento que é acionado quando o usuário seleciona um arquivo no input
inputUpload.addEventListener("change", () => {
  const file = inputUpload.files[0]; // Pega o primeiro arquivo selecionado

  // Verifica se há arquivo e se ele é do tipo imagem
  if (!file || !file.type.startsWith("image/")) {
    alert("Por favor, selecione uma imagem válida."); // Alerta caso o arquivo não seja imagem
    return; // Interrompe a execução
  }

  const reader = new FileReader(); // Cria um leitor de arquivos

  // Quando o arquivo for lido com sucesso
  reader.onload = function (e) {
    const img = new Image(); // Cria um novo objeto de imagem
    img.onload = () => {
      // Define a largura e altura do canvas de acordo com a imagem
      canvas.width = img.width;
      canvas.height = img.height;

      // Desenha a imagem no canvas a partir da posição (0, 0)
      ctx.drawImage(img, 0, 0);

      // Salva a imagem original no localStorage para usar depois
      localStorage.setItem("imagemOriginal", img.src);
    };
    img.src = e.target.result; // Define o conteúdo da imagem como o resultado do FileReader
  };

  reader.readAsDataURL(file); // Lê o arquivo como uma URL codificada em base64
});
