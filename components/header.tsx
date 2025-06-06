"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-purple-100 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Zelya IA</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Início
            </Link>
            <Link
              href="/upload"
              className={`transition-colors ${
                isActive("/upload") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Processar Arquivo
            </Link>
            <Link
              href="/sobre"
              className={`transition-colors ${
                isActive("/sobre") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className={`transition-colors ${
                isActive("/contato") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
