import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageIcon, Video, Music } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Olá, sou a Zelya!
            <span className="block text-purple-600">Sua IA especialista em edições mágicas</span>
            <span className="text-4xl">💫</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Envie sua imagem, vídeo ou áudio e veja a mágica acontecer! Transformo seus arquivos com inteligência
            artificial de forma simples e rápida.
          </p>
          <Link href="/upload">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Bora Começar! ✨
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="p-6 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <ImageIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Edição de Imagens</h3>
            <p className="text-gray-600">Filtros, efeitos e transformações incríveis para suas fotos</p>
          </Card>
          <Card className="p-6 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <Video className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Edição de Vídeos</h3>
            <p className="text-gray-600">Acelere, desacelere e aplique efeitos em seus vídeos</p>
          </Card>
          <Card className="p-6 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <Music className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Edição de Áudio</h3>
            <p className="text-gray-600">Modifique velocidade e adicione efeitos sonoros</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
