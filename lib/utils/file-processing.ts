type FileType = "image" | "video" | "audio"

// Função para processar imagens
export const processImage = async (file: File, functionId: string): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      if (!ctx) {
        resolve(URL.createObjectURL(file))
        return
      }

      ctx.drawImage(img, 0, 0)

      // Aplicar filtros baseado na função
      switch (functionId) {
        case "invert":
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i] // Red
            data[i + 1] = 255 - data[i + 1] // Green
            data[i + 2] = 255 - data[i + 2] // Blue
          }
          ctx.putImageData(imageData, 0, 0)
          break

        case "grayscale":
          ctx.filter = "grayscale(100%)"
          ctx.drawImage(img, 0, 0)
          break

        case "vintage":
          ctx.filter = "sepia(100%) contrast(120%) brightness(110%)"
          ctx.drawImage(img, 0, 0)
          break
      }

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob))
        } else {
          resolve(URL.createObjectURL(file))
        }
      })
    }

    img.src = URL.createObjectURL(file)
  })
}

// Função para processar vídeos
export const processVideo = async (file: File, functionId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (!ctx) {
        resolve(URL.createObjectURL(file))
        return
      }

      // Para demonstração, vamos aplicar filtros CSS ao vídeo
      video.style.filter = getVideoFilter(functionId)

      // Criar um novo blob com o vídeo processado (simulado)
      const processedBlob = new Blob([file], { type: file.type })
      resolve(URL.createObjectURL(processedBlob))
    }

    video.onerror = () => {
      reject(new Error("Erro ao carregar vídeo"))
    }

    video.src = URL.createObjectURL(file)
  })
}

// Função para processar áudios
export const processAudio = async (file: File, functionId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const fileReader = new FileReader()

    fileReader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        let processedBuffer: AudioBuffer

        switch (functionId) {
          case "speed-up":
            processedBuffer = changeAudioSpeed(audioBuffer, audioContext, 1.5)
            break
          case "slow-down":
            processedBuffer = changeAudioSpeed(audioBuffer, audioContext, 0.7)
            break
          case "distort":
            processedBuffer = distortAudio(audioBuffer, audioContext)
            break
          default:
            processedBuffer = audioBuffer
        }

        // Converter de volta para blob
        const processedBlob = await audioBufferToBlob(processedBuffer)
        resolve(URL.createObjectURL(processedBlob))
      } catch (error) {
        console.error("Erro ao processar áudio:", error)
        resolve(URL.createObjectURL(file))
      }
    }

    fileReader.onerror = () => {
      reject(new Error("Erro ao ler arquivo de áudio"))
    }

    fileReader.readAsArrayBuffer(file)
  })
}

// Função auxiliar para filtros de vídeo
export const getVideoFilter = (functionId: string): string => {
  switch (functionId) {
    case "speed-up":
      return "brightness(110%) contrast(110%)"
    case "slow-motion":
      return "brightness(90%) contrast(90%)"
    case "grayscale":
      return "grayscale(100%)"
    default:
      return "none"
  }
}

// Função para alterar velocidade do áudio
const changeAudioSpeed = (audioBuffer: AudioBuffer, audioContext: AudioContext, rate: number): AudioBuffer => {
  const channels = audioBuffer.numberOfChannels
  const sampleRate = audioBuffer.sampleRate
  const newLength = Math.floor(audioBuffer.length / rate)

  const newBuffer = audioContext.createBuffer(channels, newLength, sampleRate)

  for (let channel = 0; channel < channels; channel++) {
    const oldData = audioBuffer.getChannelData(channel)
    const newData = newBuffer.getChannelData(channel)

    for (let i = 0; i < newLength; i++) {
      const oldIndex = Math.floor(i * rate)
      if (oldIndex < oldData.length) {
        newData[i] = oldData[oldIndex]
      }
    }
  }
  return newBuffer
}

// Função para distorcer áudio
const distortAudio = (audioBuffer: AudioBuffer, audioContext: AudioContext): AudioBuffer => {
  const channels = audioBuffer.numberOfChannels
  const length = audioBuffer.length
  const sampleRate = audioBuffer.sampleRate

  const newBuffer = audioContext.createBuffer(channels, length, sampleRate)

  for (let channel = 0; channel < channels; channel++) {
    const oldData = audioBuffer.getChannelData(channel)
    const newData = newBuffer.getChannelData(channel)

    for (let i = 0; i < length; i++) {
      // Aplicar distorção simples
      let sample = oldData[i]
      sample = Math.sign(sample) * Math.pow(Math.abs(sample), 0.5)
      sample = Math.max(-1, Math.min(1, sample * 2))
      newData[i] = sample
    }
  }

  return newBuffer
}

// Função para converter AudioBuffer para Blob
const audioBufferToBlob = async (audioBuffer: AudioBuffer): Promise<Blob> => {
  const numberOfChannels = audioBuffer.numberOfChannels
  const length = audioBuffer.length
  const sampleRate = audioBuffer.sampleRate

  // Criar um buffer WAV simples
  const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2)
  const view = new DataView(arrayBuffer)

  // Header WAV
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(0, "RIFF")
  view.setUint32(4, 36 + length * numberOfChannels * 2, true)
  writeString(8, "WAVE")
  writeString(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, numberOfChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * numberOfChannels * 2, true)
  view.setUint16(32, numberOfChannels * 2, true)
  view.setUint16(34, 16, true)
  writeString(36, "data")
  view.setUint32(40, length * numberOfChannels * 2, true)

  // Dados de áudio
  let offset = 44
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]))
      view.setInt16(offset, sample * 0x7fff, true)
      offset += 2
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" })
}
