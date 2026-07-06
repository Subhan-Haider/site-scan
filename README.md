<div align="center">
  <img src="public/site-scan.png" alt="SiteScan Logo" width="200" />
  <h1>SiteScan</h1>
  <p><strong>A powerful all-in-one tool for discovering information about a website and host.</strong></p>
  <br>
</div>

## 🚀 Overview

SiteScan is a comprehensive, open-source web application designed to help developers, security researchers, and system administrators quickly gather, analyze, and present open data about any given URL.

Simply feed SiteScan a URL, and it will instantly provide insights into:
- Server Configuration & Architecture
- SSL/TLS Certificates and Security
- DNS Records (including DNSSEC)
- Open Ports & Firewall Detection
- Malicious Threat Feeds & Blocklists
- HTTP Security Headers
- Mail Configurations (SPF, DKIM, DMARC)
...and over 20 other critical security and configuration checks!

## ✨ Features

- **Blazing Fast**: Powered by an Astro frontend and a Node.js API backend.
- **Premium Light Theme**: An aesthetically pleasing, responsive, and dynamic user interface.
- **Non-Technical Summaries**: Highly technical outputs are automatically simplified and summarized into easily actionable insights.
- **Micro-Animations & Interaction**: A dynamic and engaging design out-of-the-box.
- **No Database Required**: Fully stateless and easy to deploy.

## 🛠️ Tech Stack

- **Frontend**: [Astro](https://astro.build/), [React](https://react.dev/), [Svelte](https://svelte.dev/)
- **Styling**: SCSS, Emotion, Custom CSS Variables
- **Backend**: [Node.js](https://nodejs.org/), Express
- **Build**: Vite, ESBuild

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm/yarn installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Subhan-Haider/site-scan.git
   cd site-scan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   This will start both the backend API (port 3001) and the Astro frontend (port 4321) concurrently.

4. **Visit the app**
   Open `http://localhost:4321` in your browser.

## ⚙️ Configuration

SiteScan works completely out of the box. However, you can configure custom API keys for third-party services (like Shodan, VirusTotal, etc.) to enhance the checks. 
Rename `.env.sample` to `.env` and add your keys!

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
