# YouMatter 💙  
### Your AI Companion That Cares

🌐 **Live App:** https://you-matter-frontend-six.vercel.app/  
🚀 Built by A4E (AI for Everyone) Initiative  

A compassionate AI-powered mental health companion and lab report interpreter —  
designed to make emotional support and healthcare understanding accessible to everyone, everywhere, always.

---

## 🌸 What is YouMatter?

YouMatter is a free, judgment-free AI mental health companion and medical lab report interpreter built especially for:

- Students  
- Young adults  
- First-time healthcare navigators  
- Anyone feeling overwhelmed by modern healthcare  

We believe two things deeply:

> 1️⃣ Mental health support should never be a luxury.  
> 2️⃣ No one should feel lost reading their own lab report.

YouMatter bridges both gaps with a warm, human-first AI experience powered by advanced language models — wrapped in a design that feels like a hug, not a hospital.

---

# ✨ Features

## 💬 Talk to Aasha — Your 24/7 Companion
- AI trained in CBT & mindfulness principles  
- Listens without judgment  
- Responds in warm, short, grounded replies  
- Crisis-aware and safety-first  
- Available at 3am or 3pm  

---

## 📋 Lab Report Interpreter
Upload any blood test PDF and get:

- ✅ 50+ parameter extraction  
- ✅ High / Low / Critical flagging  
- ✅ Plain-English explanations  
- ✅ 3 smart doctor questions  
- ✅ Structured medical-safe output  

No diagnosis. No fear-mongering. Just clarity.

---

## 🌬️ Guided Breathing
Animated nervous-system reset exercises:

- Box Breathing  
- 4-7-8 Method  
- Deep Calm  

No app download. Just breathe.

---

## 📓 Mood Journal
- Private encrypted entries  
- Tag emotions  
- Track patterns  
- Reflect safely  

---

## 📊 Mood Tracker
Visualize emotional trends over:
- Days  
- Weeks  
- Months  

Aasha gently notices patterns and checks in when needed.

---

## 🆘 Built-in Crisis Support

Smart crisis keyword detection instantly surfaces:

| Helpline | Number |
|-----------|---------|
| iCall (India) | 9152987821 |
| Vandrevala Foundation | 1860-2662-345 |
| Snehi | 044-24640050 |
| NIMHANS | 080-46110007 |

You are never alone. We make sure of it.

---

# 🎨 Design Philosophy

YouMatter’s visual identity is built on:

💜 Softness  
💙 Warmth  
💗 Empathy  
🫶 Trust  

Inspired by the logo’s lavender-human and blue-AI silhouettes forming a heart.

### 🎨 Color Palette

| Color | Hex | Meaning |
|-------|------|----------|
| Primary Lavender | #C4B5F4 | Human warmth |
| Soft Blue | #93C5FD | AI clarity |
| Blush Pink | #F4A8C0 | Empathy |
| Warm Peach | #FBBF9A | Energy |
| Deep Navy | #2D2350 | Stability |

### 🖋 Typography
- **Display:** Playfair Display  
- **Body:** Nunito  

### 🧩 UI Principles
- No sharp corners. Anywhere. Ever.  
- Pill buttons  
- Cloud-like cards  
- Glass morphism  
- Mobile-first design  

---

# 🛠️ Tech Stack

| Layer | Technology | Why |
|--------|------------|-----|
| Frontend | Next.js 14 + TypeScript | SSR + production ready |
| Styling | Tailwind CSS | Fast UI development |
| Auth | Supabase Magic Link | Passwordless login |
| Database | Supabase PostgreSQL + RLS | Secure by default |
| Storage | Supabase Storage | Private PDFs |
| PDF Parsing | pdf-parse / PyMuPDF | Server-side extraction |
| AI Core | Anthropic Claude (Haiku) | Fast + empathetic |
| Hosting | Vercel | CI/CD + Edge |
| Analytics | PostHog | Privacy-first |

💡 **Total MVP Infrastructure Cost: $0**

---

# 🏗️ Project Structure
youmatter/
├── app/
├── components/
├── lib/
├── supabase/
└── public/

---

# 🤖 AI Prompt Architecture

## Aasha — Mental Health Companion

**Rules:**
- Never diagnose  
- Never prescribe  
- 2–4 sentence warm replies  
- End with an open question  
- Crisis keywords → show helplines immediately  
- Ground responses in CBT & mindfulness  

---

## Lab Report Interpreter

**Output Format (Strict JSON):**

```json
{
  "parameters": [
    {
      "name": "",
      "value": "",
      "unit": "",
      "range": "",
      "status": "",
      "explanation": ""
    }
  ],
  "summary": "",
  "doctor_questions": []
}
Rules:

No diagnosis
Always say “Consult your doctor”
Calm tone for critical values
JSON only output
🔒 Safety & Privacy
✅ Supabase Row-Level Security
✅ Zero health data selling
✅ Private PDF buckets
✅ AI clearly labeled as non-medical
✅ Crisis detection built-in
✅ Legal coverage via Termly

Privacy-first. Always.

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/a4e-team/youmatter.git
cd youmatter
2️⃣ Install dependencies
npm install
3️⃣ Configure environment variables
Create .env.local:
npm run dev
Visit:
http://localhost:3000
📈 KPIs
Daily Active Users
Lab Reports Uploaded
Chat Sessions Started
Breathing Sessions Completed
Journal Entries Written
Crisis Panel Views
🎯 Month 1 Target: 100–200 users

👥 Team — A4E Initiative
Built with 💙 by 7 pre-final year CSE-AIML students
Haldia Institute of Technology

Name	Role
Aishwarya Shree	Project Lead, AI & Architecture
Harshita Smriti	Backend & Database
Simran Patel	Frontend
Ankita Kumari	Frontend
Rounit Raj Singh	Frontend
Neeraj Kumar	Testing & QA
Supriya Jana	Content & Support
🤝 Contributing
git checkout -b feature/amazing-feature
git commit -m "Add: amazing feature"
git push origin feature/amazing-feature
pen a Pull Request 💙

⚠️ Disclaimer
YouMatter is not a medical device and does not provide medical advice, diagnosis, or treatment. All AI-generated content is informational only. Always consult a licensed healthcare professional.

If in immediate danger, contact emergency services.

🌐 Live Application
👉 https://you-matter-frontend-six.vercel.app/

Made with 💙 by the A4E Team
“Taking care of your mind is the bravest thing you can do.”
