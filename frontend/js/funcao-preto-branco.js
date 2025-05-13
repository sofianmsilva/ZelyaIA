export function aplicarPretoBranco(canvas, ctx) {
  const imagem = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dados = imagem.data;

  for (let i = 0; i < dados.length; i += 4) {
    const r = dados[i];
    const g = dados[i + 1];
    const b = dados[i + 2];

    const media = (r + g + b) / 3;

    dados[i] = media;     // Red
    dados[i + 1] = media; // Green
    dados[i + 2] = media; // Blue
    // Alpha (dados[i + 3]) permanece o mesmo
  }

  ctx.putImageData(imagem, 0, 0);
}
