import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Zelya IA</span>
        </div>
        <p className="text-gray-600 mb-4">
          Transformando seus arquivos com inteligência artificial de forma simples e mágica ✨
        </p>
        <p className="text-sm text-gray-500">© 2024 Zelya IA. Feito com 💜 para você.</p>
      </div>
    </footer>
  )
}
