export function aplicarBaixaQualidade(canvas, ctx) {
  const larguraOriginal = canvas.width;
  const alturaOriginal = canvas.height;

  const fator = 0.1; // 10% da resolução original

  const larguraBaixa = Math.floor(larguraOriginal * fator);
  const alturaBaixa = Math.floor(alturaOriginal * fator);

  const canvasTemp = document.createElement("canvas");
  canvasTemp.width = larguraBaixa;
  canvasTemp.height = alturaBaixa;

  const ctxTemp = canvasTemp.getContext("2d");

  // Reduz qualidade desenhando pequeno
  ctxTemp.drawImage(canvas, 0, 0, larguraBaixa, alturaBaixa);

  // Desenha de volta em tamanho grande com pixelização
  ctx.clearRect(0, 0, larguraOriginal, alturaOriginal);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvasTemp, 0, 0, larguraOriginal, alturaOriginal);
}
