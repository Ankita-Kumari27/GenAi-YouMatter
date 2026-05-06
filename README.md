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

| Helpline | Number |
|-----------|---------|
| iCall (India) | 9152987821 |
| Vandrevala Foundation | 1860-2662-345 |
| Snehi | 044-24640050 |
| NIMHANS | 080-46110007 |

You are never alone.

---

# 🎨 Design Philosophy

Softness. Warmth. Empathy. Trust.

### 🎨 Color Palette

| Color | Hex | Meaning |
|-------|------|----------|
| Primary Lavender | #C4B5F4 | Human warmth |
| Soft Blue | #93C5FD | AI clarity |
| Blush Pink | #F4A8C0 | Empathy |
| Warm Peach | #FBBF9A | Energy |
| Deep Navy | #2D2350 | Stability |

### Typography
- **Display:** Playfair Display  
- **Body:** Nunito  

---

# 🛠️ Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js 14 + TypeScript |
| Styling | Tailwind CSS |
| Auth | Supabase Magic Link |
| Database | Supabase PostgreSQL + RLS |
| Storage | Supabase Storage |
| PDF Parsing | pdf-parse / PyMuPDF |
| AI Core | Anthropic Claude (Haiku) |
| Hosting | Vercel |
| Analytics | PostHog |

💡 Total MVP infrastructure cost: **$0**

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

Rules:
- Never diagnose  
- Never prescribe  
- 2–4 sentence warm replies  
- End with an open question  
- Crisis keywords → show helplines immediately  
- Ground responses in CBT & mindfulness  

---

## Lab Report Interpreter

**Output Format (Strict JSON)**

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
- No diagnosis  
- Always say “Consult your doctor”  
- Calm tone for critical values  
- JSON only output  

---

# 🔒 Safety & Privacy

✅ Supabase Row-Level Security  
✅ Zero health data selling  
✅ Private PDF buckets  
✅ AI clearly labeled as non-medical  
✅ Crisis detection built-in  
✅ Legal coverage via Termly  

Privacy-first. Always.

---

# 🚀 Getting Started

## 1️⃣ Clone the repository

```bash
git clone https://github.com/a4e-team/youmatter.git
cd youmatter
