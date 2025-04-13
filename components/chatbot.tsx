/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react"
import { MessageSquare, Send, X, ArrowDown, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"

type StructuredContent = {
  title: string
  sections: {
    heading: string
    items: {
      emoji: string
      name: string
      details: string
    }[]
  }[]
  footer: string
}

type Message = {
  id: number
  content: any // using any as requested
  sender: "user" | "bot"
  type: "structured" | "text"
}

function StructuredMessage({ content }: { content: StructuredContent }) {
  return (
    <div className="structured-message">
      {content.title && <h2 className="font-bold text-lg">{content.title}</h2>}
      {content.sections &&
        content.sections.map((section: any, idx: number) => (
          <div key={idx} className="my-2">
            {section.heading && <h3 className="font-semibold">{section.heading}</h3>}
            {section.items && section.items.length > 0 && (
              <ul className="list-disc ml-6">
                {section.items.map((item: any, i: number) => (
                  <li key={i}>
                    <span>{item.emoji} </span>
                    <span className="font-bold">{item.name}</span> - {item.details}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      {content.footer && <p className="italic mt-2">{content.footer}</p>}
    </div>
  )
}

export default function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "👋 Ckemi! Unë jam Asistenti virtual i MerrBio. Si mund t'ju ndihmoj sot?",
      sender: "bot",
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
    if (!isChatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add the user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      type: "text",
    }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch("http://localhost:9000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response")
      }

      const data: any = await response.json()
      // If data has the structured keys, treat it as structured; otherwise, fallback to string
      const isStructured = data.title !== undefined && data.sections !== undefined && data.footer !== undefined

      const botMessage: Message = {
        id: messages.length + 2,
        content: isStructured ? data : JSON.stringify(data),
        sender: "bot",
        type: isStructured ? "structured" : "text",
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "Sorry, there was an error getting a response.",
        sender: "bot",
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const hasScrolledUp = () => {
    if (!chatContainerRef.current) return false
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    return scrollHeight - scrollTop - clientHeight > 50
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {isChatOpen && (
          <div className="relative w-full max-w-[370px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
            {/* Chat header - Updated with red and green design */}
            <div className="bg-red-700 p-4 flex justify-between items-center relative overflow-hidden">
              {/* Green decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600 rounded-bl-full opacity-90"></div>

              <div className="flex items-center space-x-3 z-10">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <div className="h-full w-full bg-red-800 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">MerrBio&apos;s Assistant</h3>
                  <p className="text-xs text-white/80">Online | Usually replies instantly</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-red-800/50 z-10">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.sender === "user"
                        ? "bg-red-700 text-white rounded-tr-none"
                        : "bg-emerald-100 text-gray-800 rounded-tl-none border-l-4 border-emerald-600"
                    }`}
                  >
                    {message.sender === "bot" && message.type === "structured" ? (
                      <StructuredMessage content={message.content} />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-emerald-100 text-gray-800 rounded-2xl rounded-tl-none p-3 border-l-4 border-emerald-600">
                    <div className="flex space-x-1">
                      <span className="h-2 w-2 bg-emerald-300 rounded-full animate-bounce"></span>
                      <span
                        className="h-2 w-2 bg-emerald-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="h-2 w-2 bg-emerald-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input with green footer */}
            <div className="border-t border-gray-200 bg-emerald-50">
              <form onSubmit={handleSubmit} className="p-4">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef as any}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="rounded-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-emerald-600 hover:bg-emerald-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center mt-2 text-xs text-emerald-700">
                  <Leaf className="h-3 w-3 mr-1" />
                  <span>Powered by MerrBio Market Fresh Technology</span>
                </div>
              </form>
            </div>

            {/* Scroll to bottom button - shows when scrolled up */}
            {hasScrolledUp() && (
              <Button
                size="icon"
                className="absolute bottom-20 right-4 rounded-full h-8 w-8 bg-emerald-600 hover:bg-emerald-700 shadow-md"
                onClick={scrollToBottom}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* Chat button - Split design */}
        <Button
          onClick={toggleChat}
          size="icon"
          className={`h-14 w-14 rounded-full relative overflow-hidden ${
            isChatOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-red-700 hover:bg-red-800"
          } shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {!isChatOpen && <div className="absolute top-0 right-0 w-7 h-7 bg-emerald-600 rounded-bl-full"></div>}
          <div className="relative z-10">
            {isChatOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}
          </div>
        </Button>
      </div>
    </>
  )
}
