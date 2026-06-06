# Mini AI Meeting Assistant

## Overview

Mini AI Meeting Assistant is a backend application that helps teams manage meetings, analyze transcripts using AI, track action items, and send reminders for overdue tasks.

The system uses groq to generate structured meeting insights while grounding all generated outputs in transcript citations.

---

## Features

* JWT Authentication
* Meeting Management
* AI-Powered Meeting Analysis
* Citation-Based Insights
* Action Item Extraction
* Action Item Status Tracking
* Overdue Action Item Detection
* Scheduled Reminder Job
* Telegram Notifications
* Swagger API Documentation

---

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* groq API
* Telegram Bot API
* node-cron
* Swagger

---

## Environment Variables

Create a `.env` file:

PORT=5000

MONGODB_URI=

JWT_SECRET=

GROQ_API_KEY=

TELEGRAM_BOT_TOKEN=

TELEGRAM_CHAT_ID=

---

## Setup Instructions

### Clone Repository

git clone <repository-url>

cd mini-ai-meeting-assistant

### Install Dependencies

npm install

### Configure Environment Variables

Create `.env` using `.env.example`

### Start Development Server

npm run dev

---

## Local Execution Steps

1. Start MongoDB Atlas connection.
2. Configure groq API key.
3. Configure Telegram bot credentials.
4. Run:

npm run dev

5. Open Swagger:

http://localhost:5000/api-docs

---

## Deployment Instructions

### Railway

1. Push repository to GitHub.
2. Create a new Web Service on Railway.
3. Connect GitHub repository.
4. Configure environment variables.
5. Deploy.

---

## API Usage Examples

### Register

POST /api/auth/register

{
"name": "Yash",
"email": "[yash@example.com](mailto:yash@example.com)",
"password": "password123"
}

### Login

POST /api/auth/login

{
"email": "[yash@example.com](mailto:yash@example.com)",
"password": "password123"
}

### Create Meeting

POST /api/meetings

{
"title": "Sprint Planning",
"participants": ["[alice@example.com](mailto:alice@example.com)"],
"meetingDate": "2026-06-06T10:00:00Z",
"transcript": [...]
}

### Analyze Meeting

POST /api/meetings/{id}/analyze

---

## API Documentation

Swagger UI:

http://localhost:5000/api-docs
