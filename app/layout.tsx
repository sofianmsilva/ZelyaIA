import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AppProvider } from "@/lib/context/app-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zelya IA - Edição Mágica de Arquivos",
  description: "Transforme suas imagens, vídeos e áudios com inteligência artificial",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
