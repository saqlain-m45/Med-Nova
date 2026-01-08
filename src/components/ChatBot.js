import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Med Nova AI. How can I assist you with your health questions today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiKey = process.env.REACT_APP_DEEPSEEK_API_KEY;
            if (!apiKey) {
                throw new Error("API Key not found. Please add REACT_APP_DEEPSEEK_API_KEY to your .env file.");
            }

            const openai = new OpenAI({
                baseURL: 'https://api.deepseek.com',
                apiKey: apiKey,
                dangerouslyAllowBrowser: true // Required for client-side usage
            });

            // Prepare messages history
            const apiMessages = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));

            // Add the new user message
            apiMessages.push({ role: 'user', content: input });

            const completion = await openai.chat.completions.create({
                messages: apiMessages,
                model: 'deepseek-chat',
            });

            const botResponse = completion.choices[0].message.content;

            setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [...prev, { text: `System Error: ${error.message || "Connection failed"}.`, sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '100px', right: '40px', zIndex: 9999 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="card shadow-lg border-0 rounded-4 overflow-hidden mb-3"
                        style={{ width: '350px', maxHeight: '500px', height: '80vh', display: 'flex', flexDirection: 'column' }}
                    >
                        {/* Header */}
                        <div className="card-header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                                <span className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>🤖</span>
                                <h6 className="mb-0 fw-bold">Med Nova AI</h6>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="btn btn-sm text-white opacity-75 hover-opacity-100">✕</button>
                        </div>

                        {/* Messages */}
                        <div className="card-body p-3 bg-light overflow-auto flex-grow-1" style={{ scrollbarWidth: 'thin' }}>
                            <div className="d-flex flex-column gap-3">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                                    >
                                        <div
                                            className={`p-3 rounded-3 shadow-sm ${msg.sender === 'user'
                                                ? 'bg-primary text-white ms-4'
                                                : 'bg-white text-dark me-4'
                                                }`}
                                            style={{
                                                maxWidth: '85%',
                                                borderTopRightRadius: msg.sender === 'user' ? '4px' : '1rem',
                                                borderTopLeftRadius: msg.sender === 'bot' ? '4px' : '1rem',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.4'
                                            }}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="d-flex justify-content-start">
                                        <div className="bg-white p-2 px-3 rounded-pill shadow-sm">
                                            <span className="dot-flashing">...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-top">
                            <form onSubmit={handleSend} className="d-flex gap-2">
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light rounded-pill px-4"
                                    placeholder="Ask a health question..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: 42, height: 42 }}
                                    disabled={isLoading || !input.trim()}
                                >
                                    ➤
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px', position: 'relative' }}
            >
                {isOpen ? '✕' : '💬'}
            </motion.button>
        </div>
    );
};

export default ChatBot;
