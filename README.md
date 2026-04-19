# Flab2Fab: AI-Driven Health Assessment Platform

Flab2Fab is a full-stack health assessment application that transforms raw physiological data into actionable fitness intelligence. It combines a high-performance **FastAPI** backend with a modern **React** frontend, leveraging state-of-the-art **LLMs** (Qwen 2.5) for personalized coaching.

## Key Features

- **Logic-First Architecture**: Health scores and BMI are calculated using deterministic logic for 100% accuracy.
- **AI-Powered Insights**: Get deep analytical insights and motivational coaching tailored to your specific goals.
- **Dynamic Action Plans**: AI-generated "Top 3 Actions" and "Strategic Shifts" based on your unique profile.
- **Premium UI/UX**: A sleek, dark-themed interface with fluid animations (Framer Motion) and responsive design.
- **Real-time Processing**: Seamless asynchronous communication between frontend and backend.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Framer Motion, Lucide React, Tailwind CSS.
- **Backend**: FastAPI (Python), Pydantic (Data Validation), Uvicorn.
- **AI**: Hugging Face Inference API (Qwen/Qwen2.5-7B-Instruct).

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Hugging Face API Token (Free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Flab2Fab.git
   cd Flab2Fab
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```
   *Create a `.env` file in the `backend` folder based on `.env.example`.*

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start Backend** (from `backend` folder):
   ```bash
   python main.py
   ```

2. **Start Frontend** (from `frontend` folder):
   ```bash
   npm run dev
   ```

## 🔒 Security
Sensitive keys and environment-specific configurations are managed via `.env` files and are excluded from version control via `.gitignore`.

---
Architected by **Navya Katta**
