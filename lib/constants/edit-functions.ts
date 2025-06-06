export type FileType = "image" | "video" | "audio"

export type EditFunction = {
  id: string
  name: string
  description: string
}

export const editFunctions = {
  image: [
    { id: "invert", name: "Inverter cores", description: "Inverte todas as cores da imagem" },
    { id: "grayscale", name: "Preto e branco", description: "Converte para tons de cinza" },
    { id: "vintage", name: "Efeito vintage", description: "Adiciona um filtro retrô" },
  ],
  video: [
    { id: "speed-up", name: "Acelerar vídeo", description: "Aumenta a velocidade de reprodução" },
    { id: "slow-motion", name: "Câmera lenta", description: "Reduz a velocidade de reprodução" },
    { id: "grayscale", name: "Preto e branco", description: "Remove as cores do vídeo" },
  ],
  audio: [
    { id: "speed-up", name: "Acelerar áudio", description: "Aumenta a velocidade do áudio" },
    { id: "slow-down", name: "Áudio lento", description: "Reduz a velocidade do áudio" },
    { id: "distort", name: "Distorcer voz", description: "Aplica efeitos de distorção" },
  ],
}
