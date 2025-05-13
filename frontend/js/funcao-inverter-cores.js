export function aplicarInverterCores(canvas, ctx) {
    const imagem = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dados = imagem.data;
  
    for (let i = 0; i < dados.length; i += 4) {
      dados[i] = 255 - dados[i];       // R
      dados[i + 1] = 255 - dados[i + 1]; // G
      dados[i + 2] = 255 - dados[i + 2]; // B
      // Alpha (dados[i + 3]) não é alterado
    }
  
    ctx.putImageData(imagem, 0, 0);
  }
  