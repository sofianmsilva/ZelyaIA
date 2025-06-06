"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon, Video, Music, ArrowLeft } from "lucide-react"
import { useAppContext } from "@/lib/context/app-context"
import type { FileType } from "@/lib/constants/edit-functions"
import Link from "next/link"

export default function UploadPage() {
  const router = useRouter()
  const { setSelectedFile, setFileType, setFilePreview } = useAppContext()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: FileType) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    const maxSizes = {
      image: 10 * 1024 * 1024, // 10MB
      video: 50 * 1024 * 1024, // 50MB
      audio: 25 * 1024 * 1024, // 25MB
    }

    if (file.size > maxSizes[type]) {
      alert(`Arquivo muito grande! Tamanho máximo para ${type}: ${maxSizes[type] / (1024 * 1024)}MB`)
      return
    }

    // Validate file type
    const validTypes = {
      image: ["image/jpeg", "image/jpg", "image/png"],
      video: ["video/mp4", "video/webm"],
      audio: ["audio/mp3", "audio/mpeg", "audio/wav"],
    }

    if (!validTypes[type].includes(file.type)) {
      alert(`Tipo de arquivo inválido para ${type}!`)
      return
    }

    setSelectedFile(file)
    setFileType(type)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setFilePreview(previewUrl)

    // Navigate to selection page
    router.push("/selecionar-funcao")

    // Reset the input value to allow selecting the same file again
    event.target.value = ""
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Escolha um tipo de arquivo para começar</h2>
          <p className="text-lg text-gray-600">Sua edição com a Zelya está a um clique de distância! 💜</p>
        </div>

        <div className="grid gap-6">
          {/* Image Upload */}
          <Card className="p-8 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-all duration-300 group">
            <div className="text-center">
              <ImageIcon className="w-16 h-16 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Imagem</h3>
              <p className="text-gray-600 mb-4">JPG, PNG até 10MB</p>
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => handleFileUpload(e, "image")}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher Imagem
                </Button>
              </label>
            </div>
          </Card>

          {/* Video Upload */}
          <Card className="p-8 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-all duration-300 group">
            <div className="text-center">
              <Video className="w-16 h-16 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Vídeo</h3>
              <p className="text-gray-600 mb-4">MP4, WEBM até 50MB</p>
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={(e) => handleFileUpload(e, "video")}
                  className="hidden"
                  id="video-upload"
                />
                <Button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById("video-upload")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher Vídeo
                </Button>
              </label>
            </div>
          </Card>

          {/* Audio Upload */}
          <Card className="p-8 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-all duration-300 group">
            <div className="text-center">
              <Music className="w-16 h-16 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Áudio</h3>
              <p className="text-gray-600 mb-4">MP3, WAV até 25MB</p>
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="audio/mp3,audio/mpeg,audio/wav"
                  onChange={(e) => handleFileUpload(e, "audio")}
                  className="hidden"
                  id="audio-upload"
                />
                <Button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById("audio-upload")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher Áudio
                </Button>
              </label>
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
