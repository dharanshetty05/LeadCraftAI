# LeadCraft AI

AI-powered outreach intelligence tool that analyzes Instagram business
profiles and generates personalized cold outreach messages for
freelancers and agencies.

LeadCraft AI automates the most time-consuming part of cold outreach:
understanding a business and writing a relevant message.

Instead of manually analyzing every lead, users can paste an Instagram
profile URL and instantly receive a business insight and a tailored
outreach message.

------------------------------------------------------------------------

## Problem

Cold outreach usually involves three repetitive steps:

1.  Find a potential lead\
2.  Analyze the business and their online presence\
3.  Write a personalized outreach message

Steps **2 and 3 are time-consuming and repetitive**.

LeadCraft AI automates those steps by combining **Instagram data
extraction with AI-powered analysis and message generation**.

------------------------------------------------------------------------

# Features

-   Instagram profile analysis using profile metadata extraction
-   AI-powered business insights using LLMs
-   Personalized outreach message generation
-   Two-stage AI prompt pipeline for better response quality
-   Automated data extraction from Instagram profiles
-   Clean and responsive UI built with Next.js and Tailwind
-   Copy-to-clipboard functionality for outreach messages

------------------------------------------------------------------------

# System Workflow

Paste Instagram URL ↓ Extract Instagram username ↓ Fetch Instagram
profile HTML ↓ Parse profile metadata (bio, followers, posts) ↓ AI
analyzes business profile ↓ AI generates personalized outreach message ↓
User copies message and sends outreach

------------------------------------------------------------------------

# Architecture

Frontend (Next.js) ↓ Backend API (Node.js / Express) ↓ Instagram Data
Extraction Service ↓ AI Analysis Service (Groq LLM) ↓ Response Generator

------------------------------------------------------------------------

# Tech Stack

Frontend - Next.js - React - TailwindCSS

Backend - Node.js - Express.js

AI - Groq API - Llama 3.3 70B Versatile

Scraping - Axios - Cheerio

Tools - Git - Postman - Vercel - Render

------------------------------------------------------------------------

# Project Structure

leadcraft-ai │ ├── frontend │ ├── app │ ├── components │ │ └──
LeadForm.js │ └── styles │ ├── backend │ ├── controllers │ │ └──
analyzeController.js │ │ │ ├── services │ │ ├── aiService.js │ │ └──
instagramService.js │ │ │ ├── prompts │ │ └── prompts.js │ │ │ ├──
routes │ │ └── analyzeRoutes.js │ │ │ └── server.js │ └── README.md

------------------------------------------------------------------------

# AI Pipeline

LeadCraft AI uses a **two-stage prompt architecture**.

Stage 1 -- Business Analysis

Input: - Business Name - Instagram Bio - Caption - Location

The AI identifies: - What the business does - Their current online
presence - Whether they appear to have a website - A potential
opportunity where a website could help

Output: summary, opportunity

------------------------------------------------------------------------

Stage 2 -- Outreach Message Generation

Input: - Business name - Business summary - Opportunity insight

The AI generates: - A short WhatsApp outreach message - Friendly tone -
Under 70 words - Personalized to the business

Output: message

------------------------------------------------------------------------

# Instagram Data Extraction

LeadCraft AI extracts profile metadata directly from the Instagram page
HTML.

Example source:
```{=html}
<meta name="description">
```
Example content: 106 Followers, 2 Following, 21 Posts - AmMo's Cafe
(@ammo_scafe) on Instagram: "Coffee \| Snacks \| Chill vibes"

Extracted data: - Username - Display name - Bio - Followers - Post count

Libraries used: - Axios - Cheerio

Note: Instagram scraping relies on public metadata and may break if
Instagram changes their HTML structure.

------------------------------------------------------------------------

# API Endpoint

POST /api/analyze

------------------------------------------------------------------------

# Request Example

Manual mode

{ "businessName": "Ammos Cafe", "bio": "Coffee \| Snacks \| Chill
vibes", "caption": "New coffee menu launched" }

Instagram mode

{ "businessName": "Ammos Cafe", "instagramUrl":
"https://instagram.com/ammo_scafe" }

------------------------------------------------------------------------

# Response Example

{ "summary": "...", "opportunity": "...", "message": "...",
"instagramData": { "displayName": "AmMo's Cafe", "followers": "106
Followers", "posts": "21 Posts", "bio": "Coffee \| Snacks \| Chill
vibes" } }

------------------------------------------------------------------------

# Running the Project Locally

Clone the repository

git clone https://github.com/yourusername/leadcraft-ai.git

------------------------------------------------------------------------

Backend setup

cd backend npm install

Create .env

GROQ_API_KEY=your_api_key

Start server

npm run dev

------------------------------------------------------------------------

Frontend setup

cd frontend npm install npm run dev

Open http://localhost:3000

------------------------------------------------------------------------

# Current Capabilities

-   Instagram profile analysis
-   AI-powered business insights
-   Personalized outreach generation
-   Profile metadata visualization
-   Copy-to-clipboard message functionality

------------------------------------------------------------------------

# Limitations

-   Instagram scraping relies on metadata tags which may change
-   Caption extraction currently uses bio as fallback
-   Full post extraction is not implemented

------------------------------------------------------------------------

# Future Improvements

Planned development phases include:

Lead database - Store analyzed leads - Track outreach status

Outreach dashboard - Manage leads - Track messages and replies

Follow-up system - Automated follow-up reminders

Analytics - Leads analyzed - Messages sent - Replies - Clients acquired

------------------------------------------------------------------------

# Author

Dharan Shetty

GitHub https://github.com/dharanshetty05

LinkedIn https://linkedin.com/in/dharan-shetty

Portfolio https://dharan-shetty.vercel.app
