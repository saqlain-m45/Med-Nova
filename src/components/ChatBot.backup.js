import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { motion, AnimatePresence } from 'framer-motion';

// --- LOCAL KNOWLEDGE BASE (The "Perfect" reliability layer) ---
const HOSPITAL_DATA = {
    doctors: [
        { name: "Dr. Ayesha Khan", specialty: "Cardiologist", info: "Dr. Ayesha is our lead Cardiologist available Mon-Fri, 9am-5pm." },
        { name: "Dr. Ali Raza", specialty: "Neurologist", info: "Dr. Ali Raza specializes in brain disorders. Available Tue-Thu." },
        { name: "Dr. Sarah Ahmed", specialty: "Dermatologist", info: "Top skin specialist. Walk-ins welcome on Saturdays." }
    ],
    services: [
        "Cardiology", "Neurology", "Dermatology", "Emergency Care", "Lab Testing", "X-Ray & MRI"
    ],
    contact: {
        phone: "+92 300 1234567",
        email: "info@mednova.com",
        location: "Kohat, KPK, Pakistan",
        emergency: "Dial 1122 for immediate ambulance service."
    },
    hours: "We are open 24/7 for emergencies. OPD hours are 9:00 AM to 9:00 PM."
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Hello! 👋 I'm Med Nova AI. I can help you find doctors, services, or answer health questions. How can I assist you?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Quick Actions
    const quickActions = [
        "Find a Doctor", "Opening Hours", "Emergency", "Book Appointment"
    ];

    const generateResponse = async (userText) => {
        setIsLoading(true);
        const lowerText = userText.toLowerCase();
        let botReply = "";

        // 1. CHECK LOCAL KNOWLEDGE BASE (Instant & Reliable)

        // Doctors Query
        if (lowerText.includes("doctor") || lowerText.includes("specialist")) {
            const docList = HOSPITAL_DATA.doctors.map(d => `• ${d.name} (${d.specialty})`).join("\n");
            botReply = `Here are our top specialists:\n${docList}\n\nYou can visit the 'Doctors' page for more details.`;
        }
        // Specific Department Query
        else if (lowerText.includes("cardiolo")) botReply = HOSPITAL_DATA.doctors.find(d => d.specialty === "Cardiologist").info;
        else if (lowerText.includes("neuro")) botReply = HOSPITAL_DATA.doctors.find(d => d.specialty === "Neurologist").info;
        else if (lowerText.includes("skin") || lowerText.includes("derma")) botReply = HOSPITAL_DATA.doctors.find(d => d.specialty === "Dermatologist").info;

        // Services/Hours/Contact
        else if (lowerText.includes("service") || lowerText.includes("facility")) {
            botReply = `We offer premium medical services including: ${HOSPITAL_DATA.services.join(", ")}.`;
        }
        else if (lowerText.includes("hour") || lowerText.includes("time") || lowerText.includes("open")) {
            botReply = HOSPITAL_DATA.hours;
        }
        else if (lowerText.includes("number") || lowerText.includes("phone") || lowerText.includes("call") || lowerText.includes("contact")) {
            botReply = `You can reach us at ${HOSPITAL_DATA.contact.phone} or email ${HOSPITAL_DATA.contact.email}.`;
        }
        else if (lowerText.includes("emergency") || lowerText.includes("urgent")) {
            botReply = `🚨 EMERGENCY: ${HOSPITAL_DATA.contact.emergency} Please visit our Emergency Ward immediately.`;
        }
        // Greetings & Small Talk (Handled Locally to save API)
        else if (lowerText === "hey" || lowerText === "hi" || lowerText === "hello" || lowerText.includes("good morning") || lowerText.includes("good evening")) {
            botReply = "Hello! 👋 How can I help you with your health today?";
        }
        else if (lowerText.includes("thank") || lowerText.includes("thx")) {
            botReply = "You're very welcome! Stay healthy! 💙";
        }
        else if (lowerText.includes("bye") || lowerText.includes("goodbye")) {
            botReply = "Goodbye! Take care.";
        }

        else if (lowerText.includes("appointment") || lowerText.includes("book")) {
            botReply = "You can easily book an appointment by clicking the 'Get Appointment' button in the menu, or just tell me which doctor you need.";
        }

        // 2. IF NO LOCAL MATCH, TRY API (AI Layer)
        if (!botReply) {
            try {
                const apiKey = process.env.REACT_APP_DEEPSEEK_API_KEY; // OR REACT_APP_OPENAI_API_KEY

                if (!apiKey) {
                    throw new Error("No API Key configured");
                }

                const openai = new OpenAI({
                    baseURL: 'https://api.deepseek.com', // Change this if using standard OpenAI
                    apiKey: apiKey,
                    dangerouslyAllowBrowser: true
                });

                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a helpful medical assistant for Med Nova Hospital. Keep answers concise, professional, and empathetic. Do not give definitive medical diagnoses, but suggest seeing a doctor." },
                        ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
                        { role: "user", content: userText }
                    ],
                    model: 'deepseek-chat',
                });

                botReply = completion.choices[0].message.content;

            } catch (error) {
                console.warn("AI Fallback Error:", error);

                let errorMsg = "I'm sorry, I couldn't find specific information on that in my database.";

                // Smart Error Diagnosis
                if (!process.env.REACT_APP_DEEPSEEK_API_KEY) {
                    errorMsg = "⚠️ **System Update Required**: I have a new brain (API Key) installed, but you need to **RESTART THE SERVER** to activate it. Please run `npm start` again.";
                } else if (error.message.includes("Insufficient Balance")) {
                    errorMsg = "⚠️ **API Quota Exceeded**: Your DeepSeek account has insufficient balance. Please check your billing at platform.deepseek.com.";
                } else if (error.message.includes("401")) {
                    errorMsg = "⚠️ **Authentication Failed**: The API Key appears to be invalid. Please verify it in your .env file.";
                } else if (error.message.includes("Network Error")) {
                    errorMsg = "⚠️ **Connection Error**: I cannot reach the internet right now. Please check your connection.";
                }

                botReply = errorMsg;
            }
        }

        // Add Bot Message with delay for "thinking" feel
        setTimeout(() => {
            setMessages(prev => [...prev, { text: botReply, sender: 'bot', timestamp: new Date() }]);
            setIsLoading(false);
        }, 600);
    };

    const handleSend = (e, text = null) => {
        if (e) e.preventDefault();
        const msgText = text || input;
        if (!msgText.trim()) return;

        // Add User Message
        setMessages(prev => [...prev, { text: msgText, sender: 'user', timestamp: new Date() }]);
        setInput('');

        // Trigger Response
        generateResponse(msgText);
    };

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="chatbot-window shadow-2xl"
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="d-flex align-items-center gap-3">
                                <div className="chatbot-avatar-img-container">
                                    <img src="/assets/bot-avatar.png" alt="AI Agent" className="chatbot-avatar-img" />
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold text-white" style={{ fontSize: '1.1rem' }}>Med Nova AI</h6>
                                    <span className="chatbot-status text-white-50" style={{ fontSize: '0.8rem' }}>Online</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="btn-close-chat">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="chatbot-body">
                            {/* Disclaimer */}
                            {showDisclaimer && (
                                <div className="alert alert-info py-2 px-3 small mb-3 border-0 bg-soft-blue">
                                    <div className="d-flex justify-content-between">
                                        <span><strong>Note:</strong> Not a replacement for professional medical advice.</span>
                                        <button onClick={() => setShowDisclaimer(false)} className="btn-close small ms-2" style={{ lineHeight: 0.5 }}></button>
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div key={i} className={`chat-message-row ${msg.sender}`}>
                                    {msg.sender === 'bot' && (
                                        <div className="chat-msg-avatar">
                                            <i className="bi bi-robot"></i>
                                        </div>
                                    )}
                                    <div className={`chat-bubble ${msg.sender}`}>
                                        {msg.text.split('\n').map((line, l) => (
                                            <React.Fragment key={l}>{line}<br /></React.Fragment>
                                        ))}
                                        <div className="chat-time">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="chat-message-row bot">
                                    <div className="chat-msg-avatar"><i className="bi bi-robot"></i></div>
                                    <div className="chat-bubble bot typing">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (only if empty or few messages) */}
                        {messages.length < 4 && !isLoading && (
                            <div className="chatbot-actions">
                                {quickActions.map((action, idx) => (
                                    <button key={idx} onClick={() => handleSend(null, action)} className="action-chip">
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form onSubmit={(e) => handleSend(e)} className="chatbot-input-area">
                            <input
                                type="text"
                                placeholder="Type a health query..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={!input.trim() || isLoading}>
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="chatbot-launcher"
                >
                    <i className="bi bi-chat-heart-fill"></i>
                </motion.button>
            )}
        </div>
    );
};

export default ChatBot;
