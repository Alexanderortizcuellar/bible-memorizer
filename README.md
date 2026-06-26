# Bible Memorizer 📖

A modern, responsive web application designed to help you memorize scripture using active recall techniques, multiple practice modes, and visual feedback heatmaps.

## 🚀 Live Demo
Once deployed, the app will be live at:
**[https://Alexanderortizcuellar.github.io/bible-memorizer](https://Alexanderortizcuellar.github.io/bible-memorizer)**

---

## ✨ Features

- **Multiple Memorization Modes**:
  - **👁️ Hide Mode**: Gradually hide random words in a verse to test your retention.
  - **👆 Pick Mode**: Choose the next correct word from a set of randomly generated options (multiple-choice).
  - **⌨️ Type Mode**: Type the first letter of each successive word to build motor memory and fast recall.
- **Visual Mistake Heatmap**: Keep track of difficult words. If you struggle with a word, the app highlights it in a dynamic color scale (Yellow ➡️ Orange ➡️ Red) based on the number of mistakes, helping you target weak points.
- **Multi-Translation Support**: Practice in English (**ESV**) or Spanish (**RVR1960**).
- **Dynamic Passage Loader**: Select any book, chapter, and custom verse range (e.g., `1-3`, `16`) to study.
- **Mobile-Responsive**: Designed with a premium mobile-first interface, ideal for practice on-the-go.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Hook State (`useState`, `useEffect`)
- **CI/CD**: GitHub Actions (automated build and deployment)

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Local Setup
Clone the repository, install dependencies, and start the development server:

```bash
# Clone the repository
git clone https://github.com/Alexanderortizcuellar/bible-memorizer.git
cd bible-memorizer

# Install dependencies
npm install

# Run development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🚀 Deployment

The project is configured to build and deploy to **GitHub Pages** using two methods:

### 1. Automated Deployment (Recommended)
Every time you push changes to the `main` branch, a GitHub Actions workflow (`.github/workflows/deploy.yml`) is triggered. It will:
- Check out the code.
- Install dependencies and build the project (`npm run build`).
- Automatically deploy the build folder (`dist`) to the `gh-pages` branch.

### 2. Manual Deployment
You can manually trigger a build and publish to GitHub Pages from your local environment using the following command:

```bash
npm run deploy
```

> [!NOTE]  
> Make sure your GitHub Repository settings are configured to serve Pages from the `gh-pages` branch. (Settings ⚙️ -> Pages -> Branch: `gh-pages`).
