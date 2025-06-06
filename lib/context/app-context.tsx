"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type FileType = "image" | "video" | "audio"

type EditFunction = {
  id: string
  name: string
  description: string
}

interface AppContextType {
  selectedFile: File | null
  setSelectedFile: (file: File | null) => void
  fileType: FileType | null
  setFileType: (type: FileType | null) => void
  selectedFunction: EditFunction | null
  setSelectedFunction: (func: EditFunction | null) => void
  filePreview: string | null
  setFilePreview: (url: string | null) => void
  processedFilePreview: string | null
  setProcessedFilePreview: (url: string | null) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
  resetAll: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<FileType | null>(null)
  const [selectedFunction, setSelectedFunction] = useState<EditFunction | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [processedFilePreview, setProcessedFilePreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const resetAll = () => {
    setSelectedFile(null)
    setFileType(null)
    setSelectedFunction(null)
    setFilePreview(null)
    setProcessedFilePreview(null)
    setIsProcessing(false)
  }

  return (
    <AppContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        fileType,
        setFileType,
        selectedFunction,
        setSelectedFunction,
        filePreview,
        setFilePreview,
        processedFilePreview,
        setProcessedFilePreview,
        isProcessing,
        setIsProcessing,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
