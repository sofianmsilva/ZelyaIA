"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ImageIcon, Video, Music, Sparkles } from "lucide-react"
import { useAppContext } from "@/lib/context/app-context"
import { editFunctions, type FileType, type EditFunction } from "@/lib/constants/edit-functions"
import { processImage, processVideo, processAudio } from "@/lib/utils/file-processing"
import Link from "next/link"

export default function SelecionarFuncaoPage() {
  const router = useRouter()
  const {
    selectedFile,
    fileType,
    filePreview,
    setSelectedFunction,
    setProcessedFilePreview,
    isProcessing,
    setIsProcessing,
    resetAll,
  } = useAppContext()

  useEffect(() => {
    if (!selectedFile || !fileType) {
      router.push("/upload")
    }
  }, [selectedFile, fileType, router])

  const handleFunctionSelect = async (func: EditFunction) => {
    if (!selectedFile || !fileType) return

    setSelectedFunction(func)
    setIsProcessing(true)

    try {
      let processedUrl: string | null = null

      if (fileType === "video") {
        processedUrl = await processVideo(selectedFile, func.id)
      } else if (fileType === "audio") {
        processedUrl = await processAudio(selectedFile, func.id)
      } else if (fileType === "image") {
        processedUrl = await processImage(selectedFile, func.id)
      }

      if (processedUrl) {
        setProcessedFilePreview(processedUrl)
      }

      setIsProcessing(false)
      router.push("/resultado")
    } catch (error) {
      console.error("Erro no processamento:", error)
      alert("Erro ao processar arquivo. Tente novamente.")
      setIsProcessing(false)
    }
  }

  const FileTypeIcon = ({ type }: { type: FileType }) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-6 h-6" />
      case "video":
        return <Video className="w-6 h-6" />
      case "audio":
        return <Music className="w-6 h-6" />
    }
  }

  if (!selectedFile || !fileType) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Escolha sua edição mágica ✨</h2>
          <p className="text-lg text-gray-600">
            Arquivo carregado com sucesso! Agora escolha como quer que eu o transforme.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* File Preview */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FileTypeIcon type={fileType} />
              <span className="ml-2">Arquivo Carregado</span>
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {fileType === "image" && filePreview && (
                <img
                  src={filePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                />
              )}
              {fileType === "video" && filePreview && (
                <video src={filePreview} controls className="max-w-full max-h-64 mx-auto rounded-lg" />
              )}
              {fileType === "audio" && filePreview && (
                <div className="py-8">
                  <Music className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <audio src={filePreview} controls className="w-full" />
                </div>
              )}
              <p className="text-sm text-gray-600 mt-2">{selectedFile.name}</p>
            </div>
          </Card>

          {/* Function Selection */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Opções de Edição</h3>
            <div className="space-y-3">
              {editFunctions[fileType].map((func) => (
                <button
                  key={func.id}
                  onClick={() => handleFunctionSelect(func)}
                  disabled={isProcessing}
                  className="w-full p-4 text-left border border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-700">{func.name}</h4>
                      <p className="text-sm text-gray-600">{func.description}</p>
                    </div>
                    <Sparkles className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>

            {isProcessing && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent mr-2"></div>
                  <span className="text-purple-700">Processando com a Zelya...</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex space-x-3">
              <Link href="/upload" className="flex-1">
                <Button
                  variant="outline"
                  disabled={isProcessing}
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={resetAll}
                disabled={isProcessing}
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
