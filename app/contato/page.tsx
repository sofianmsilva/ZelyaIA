"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, MessageCircle, Send, MapPin, Clock } from "lucide-react"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria o envio do formulário
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Entre em Contato
            <span className="text-purple-600"> 💜</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou precisa de ajuda? Adoraríamos ouvir você! Nossa equipe está sempre pronta
            para ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Contato */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Envie uma Mensagem</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Sobre o que você gostaria de falar?"
                />
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Conte-nos mais detalhes sobre sua dúvida ou sugestão..."
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">E-mail</h3>
              </div>
              <p className="text-gray-600">contato@zelyaia.com</p>
              <p className="text-sm text-gray-500 mt-2">Respondemos em até 24 horas durante dias úteis</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Horário de Atendimento</h3>
              </div>
              <div className="space-y-1 text-gray-600">
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 14h</p>
                <p>Domingo: Fechado</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Localização</h3>
              </div>
              <p className="text-gray-600">
                São Paulo, Brasil
                <br />
                Atendimento 100% digital
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Perguntas Frequentes</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">A Zelya é gratuita?</p>
                  <p className="text-gray-600">Sim! Todas as funcionalidades são totalmente gratuitas.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Meus arquivos ficam seguros?</p>
                  <p className="text-gray-600">Sim! Todo processamento é feito localmente no seu navegador.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Posso sugerir novas funcionalidades?</p>
                  <p className="text-gray-600">Claro! Adoramos receber sugestões da nossa comunidade.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
