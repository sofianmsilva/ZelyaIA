"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, RotateCcw, ArrowLeft, Sparkles, Heart, Music } from "lucide-react"
import { useAppContext } from "@/lib/context/app-context"
import { getVideoFilter } from "@/lib/utils/file-processing"
import Link from "next/link"

export default function ResultadoPage() {
  const router = useRouter()
  const { selectedFile, fileType, selectedFunction, filePreview, processedFilePreview, resetAll } = useAppContext()

  useEffect(() => {
    if (!selectedFile || !fileType || !selectedFunction || !processedFilePreview) {
      router.push("/upload")
    }
  }, [selectedFile, fileType, selectedFunction, processedFilePreview, router])

  if (!selectedFile || !fileType || !selectedFunction || !processedFilePreview) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Prontinho! Espero que tenha gostado 💜</h2>
          <p className="text-lg text-gray-600">
            Sua edição <strong>{selectedFunction.name}</strong> foi aplicada com sucesso!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Original */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Antes</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {fileType === "image" && filePreview && (
                <img
                  src={filePreview || "/placeholder.svg"}
                  alt="Original"
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                />
              )}
              {fileType === "video" && filePreview && (
                <video src={filePreview} controls className="max-w-full max-h-64 mx-auto rounded-lg" />
              )}
              {fileType === "audio" && filePreview && (
                <div className="py-8">
                  <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <audio src={filePreview} controls className="w-full" />
                </div>
              )}
            </div>
          </Card>

          {/* Result */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              Depois
              <Sparkles className="w-5 h-5 text-purple-600 ml-2" />
            </h3>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border-2 border-purple-200">
              {fileType === "image" && processedFilePreview && (
                <img
                  src={processedFilePreview || "/placeholder.svg"}
                  alt="Edited"
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                />
              )}
              {fileType === "video" && processedFilePreview && (
                <video
                  src={processedFilePreview}
                  controls
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                  style={{
                    filter: getVideoFilter(selectedFunction?.id || ""),
                  }}
                />
              )}
              {fileType === "audio" && processedFilePreview && (
                <div className="py-8">
                  <Music className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <audio src={processedFilePreview} controls className="w-full" />
                  <p className="text-sm text-purple-600 mt-2">Áudio processado com {selectedFunction?.name}</p>
                </div>
              )}
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                <Heart className="w-3 h-3 mr-1" />
                {selectedFunction?.name}
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
            onClick={() => {
              if (processedFilePreview) {
                const link = document.createElement("a")
                link.href = processedFilePreview
                link.download = `zelya_${selectedFunction?.id}_${selectedFile?.name || "arquivo"}`
                link.click()
              }
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar Arquivo
          </Button>
          <Link href="/selecionar-funcao">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 px-6 py-3"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Processar Novamente
            </Button>
          </Link>
          <Link href="/selecionar-funcao">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para Seleção
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={resetAll}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 px-6 py-3"
          >
            Novo Arquivo
          </Button>
        </div>
      </div>
    </div>
  )
}
