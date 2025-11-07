# Farian Bin Rahman - Portfolio Website

A modern, production-ready portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **🎨 Modern Design**: Clean, minimal design with generous whitespace and smooth animations
- **🌓 Dark Mode**: Automatic theme switching with system preference detection
- **⚡ Performance**: Optimized images, code-splitting, and lazy loading
- **♿ Accessibility**: WCAG compliant with semantic HTML and keyboard navigation
- **🔍 Command Palette**: Quick navigation with Cmd/Ctrl+K
- **📝 Blog**: MDX-based blog with syntax highlighting
- **🚀 SEO Optimized**: Server-side rendering with Next.js App Router
- **📊 Visitor Tracking**: Persistent visitor counter with MongoDB analytics
- **📱 Responsive**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Content**: [Contentlayer](https://contentlayer.dev/) for MDX
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose for visitor tracking
- **Command Palette**: [Fuse.js](https://fusejs.io/) for fuzzy search
- **Email**: [Resend](https://resend.com/) for contact form

## 🚀 Quick Start

1. **Clone and install**:
   ```bash
   git clone https://github.com/farianbr/portfolio.git
   cd portfolio
   npm install
   ```

2. **Set up MongoDB** (see [QUICKSTART.md](QUICKSTART.md) for 5-min setup)

3. **Create `.env.local`**:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel** (see [DEPLOYMENT.md](DEPLOYMENT.md))

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get MongoDB visitor tracking running in 5 minutes
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[docs/MONGODB_SETUP.md](docs/MONGODB_SETUP.md)** - MongoDB architecture and analytics
- **[MONGODB_IMPLEMENTATION.md](MONGODB_IMPLEMENTATION.md)** - Implementation details


---

Built with care.
