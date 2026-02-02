const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/FYP/backend/index.php?route=api';

export const api = {
    // Fetch all doctors
    getDoctors: async () => {
        try {
            const response = await fetch(`${API_URL}/doctors`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("API Error (getDoctors):", error);
            throw error;
        }
    },

    // Fetch all services
    getServices: async () => {
        try {
            const response = await fetch(`${API_URL}/services`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("API Error (getServices):", error);
            throw error;
        }
    },

    // Book appointment
    bookAppointment: async (appointmentData) => {
        try {
            const response = await fetch(`${API_URL}/appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (bookAppointment):", error);
            throw error;
        }
    },

    // Send contact message
    sendMessage: async (messageData) => {
        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error (sendMessage):", error);
            throw error;
        }
    }
};
