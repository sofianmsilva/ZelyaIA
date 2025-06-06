import { Card } from "@/components/ui/card"
import { Sparkles, Heart, Zap, Shield } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre a Zelya IA
            <span className="text-purple-600"> ✨</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça mais sobre nossa inteligência artificial especializada em transformar seus arquivos de forma mágica
            e simples.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Nossa Missão</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Democratizar o acesso a ferramentas de edição avançadas através da inteligência artificial. Queremos que
              qualquer pessoa possa transformar seus arquivos de forma profissional, sem precisar de conhecimento
              técnico ou softwares complexos.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Tecnologia</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos algoritmos avançados de processamento de imagem, vídeo e áudio, combinados com uma interface
              intuitiva que torna a edição acessível para todos. Tudo funciona diretamente no seu navegador, garantindo
              privacidade e velocidade.
            </p>
          </Card>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que torna a Zelya especial?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Privado</h3>
              <p className="text-gray-600 text-sm">
                Seus arquivos são processados localmente no seu navegador. Nada é enviado para nossos servidores.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Super Rápido</h3>
              <p className="text-gray-600 text-sm">
                Processamento instantâneo sem necessidade de upload ou download. Tudo acontece em tempo real.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fácil de Usar</h3>
              <p className="text-gray-600 text-sm">
                Interface intuitiva e amigável. Basta carregar seu arquivo e escolher o efeito desejado.
              </p>
            </div>
          </div>
        </div>

        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Formatos Suportados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Imagens</h3>
              <p className="text-gray-600 text-sm">JPG, PNG até 10MB</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Vídeos</h3>
              <p className="text-gray-600 text-sm">MP4, WEBM até 50MB</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Áudios</h3>
              <p className="text-gray-600 text-sm">MP3, WAV até 25MB</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
