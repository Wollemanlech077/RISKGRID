'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth'
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore'

export default function FirebaseTest() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    try {
      await signInAnonymously(auth)
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const sendMessage = async () => {
    if (!message.trim() || !user) return

    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        userId: user.uid,
        timestamp: new Date(),
        userName: user.displayName || 'Anonymous'
      })
      setMessage('')
      loadMessages()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const loadMessages = async () => {
    try {
      const q = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(10)
      )
      const querySnapshot = await getDocs(q)
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMessages(messagesData)
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  useEffect(() => {
    if (user) {
      loadMessages()
    }
  }, [user])

  if (loading) {
    return (
      <div className="glassmorphism-card p-6 rounded-2xl">
        <p className="text-white">Loading Firebase...</p>
      </div>
    )
  }

  return (
    <div className="glassmorphism-card p-6 rounded-2xl max-w-md">
      <h2 className="text-2xl font-light text-white mb-4">Firebase Test</h2>
      
      {!user ? (
        <button
          onClick={signIn}
          className="portal-button-small mb-4"
        >
          Sign In Anonymously
        </button>
      ) : (
        <div>
          <p className="text-white/70 text-sm mb-4">
            Signed in as: {user.displayName || 'Anonymous'}
          </p>
          
          <div className="mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="portal-button-small mt-2"
            >
              Send Message
            </button>
          </div>

          <div className="max-h-40 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="text-white/80 text-sm mb-2 p-2 bg-white/5 rounded">
                <strong>{msg.userName}:</strong> {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
