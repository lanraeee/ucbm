'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'bot' | 'user'
  text: string
}

function getReply(q: string): string {
  const s = q.toLowerCase()
  if (s.includes('course') || s.includes('programme') || s.includes('study') || s.includes('diploma') || s.includes('degree') || s.includes('master')) {
    return 'We offer 20+ programmes across five faculties, from Certificate to Professional Doctorate. Browse them on the Courses page — you can filter by faculty and level. Would you like help choosing?'
  }
  if (s.includes('apply') || s.includes('admission') || s.includes('enrol')) {
    return "You can apply on our Admissions page — the application takes about 5 minutes. There's a route for everyone, whether you have qualifications, work experience, or neither."
  }
  if (s.includes('fee') || s.includes('cost') || s.includes('price') || s.includes('finance') || s.includes('fund')) {
    return 'Fee details vary by programme and study mode. Email info@ucbm.co.uk or send an enquiry via the Contact page and our admissions team will send you a full fee schedule.'
  }
  if (s.includes('online') || s.includes('odl') || s.includes('distance') || s.includes('part')) {
    return 'We offer four study modes: Full-Time, Part-Time, ODL (Open & Distance Learning) and fully Online — so you can study around work and family commitments.'
  }
  if (s.includes('where') || s.includes('location') || s.includes('campus') || s.includes('manchester')) {
    return 'Our campus is in Manchester, United Kingdom, with more locations coming soon. Many programmes can also be studied entirely online.'
  }
  if (s.includes('contact') || s.includes('email') || s.includes('phone') || s.includes('speak')) {
    return 'You can reach us at info@ucbm.co.uk, or use the Contact page to book a consultation or request a prospectus.'
  }
  return "Thanks for your question! For anything I can't answer here, email info@ucbm.co.uk or send an enquiry via the Contact page — our team replies within two working days."
}

export default function Chatbot() {
  const [open, setOpen]     = useState(false)
  const [input, setInput]   = useState('')
  const [msgs, setMsgs]     = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm the UCBM assistant. Ask me about our courses, faculties, study modes, or how to apply." },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, open])

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    const reply = getReply(text)
    setMsgs((m) => [...m, { role: 'user', text }, { role: 'bot', text: reply }])
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex flex-col rounded-2xl shadow-modal overflow-hidden"
          style={{ width: 340, maxWidth: 'calc(100vw - 48px)', height: 440, background: '#fff' }}
        >
          {/* Header */}
          <div className="bg-ucbm-primary text-white px-[18px] py-3.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ucbm-gold text-ucbm-dark grid place-items-center font-marcellus text-[13px] flex-shrink-0">
              UC
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-[14.5px]">UCBM Assistant</div>
              <div className="text-[12px] text-ucbm-ondark">Ask about courses, fees or applying</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="bg-transparent border-none text-ucbm-ondark text-[18px] cursor-pointer hover:text-white transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 bg-ucbm-light">
            {msgs.map((m, i) => (
              <div
                key={i}
                className="px-3.5 py-2.5 rounded-xl text-[13.5px] leading-[1.55] max-w-[85%]"
                style={{
                  alignSelf:       m.role === 'user' ? 'flex-end' : 'flex-start',
                  background:      m.role === 'user' ? '#3b1d5e' : '#ffffff',
                  color:           m.role === 'user' ? '#ffffff' : '#55496b',
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-ucbm-border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your question…"
              className="flex-1 min-w-0 px-3.5 py-2.5 border-[1.5px] border-ucbm-input rounded-full text-[13.5px] focus:outline-none focus:border-ucbm-primary transition-colors"
            />
            <button
              onClick={send}
              className="bg-ucbm-primary border-none text-white font-extrabold text-[13.5px] px-[18px] py-2.5 rounded-full cursor-pointer hover:bg-ucbm-purple-hv transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className="w-[58px] h-[58px] rounded-full bg-ucbm-gold border-none text-ucbm-dark text-[24px] cursor-pointer shadow-[0_12px_28px_rgba(0,0,0,0.3)] hover:bg-ucbm-gold-hv transition-colors duration-200"
      >
        💬
      </button>
    </div>
  )
}
