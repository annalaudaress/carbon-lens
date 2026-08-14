# 🌿 Carbon Lens

**Cloud Sustainability Dashboard** — Analyze your cloud infrastructure for cost savings and environmental impact.

> Cloud + DevOps + FinOps + Sustainability

![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)

---

## 🎯 O que é o Carbon Lens?

O Carbon Lens é uma solução de **Cloud Sustainability** que ajuda empresas a entender o impacto financeiro e ambiental da infraestrutura cloud.

A ferramenta analisa recursos de cloud e apresenta:

- **Sustainability Score** — Avaliação geral da sustentabilidade
- **Resource Scores** — Análise por Compute, Storage e Database
- **Potential Savings** — Economia financeira estimada
- **CO₂ Reduction** — Redução de emissões estimada
- **Optimization Opportunities** — Oportunidades acionáveis com prioridade e impacto
- **Generate Report** — Relatório interativo sob demanda

---

## 🚀 Quick Start

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### Instalar

```bash
git clone https://github.com/SEU_USUARIO/carbon-lens.git
cd carbon-lens
npm install
```

### Executar (desenvolvimento)

```bash
npm run dev
```

Acesse: **http://localhost:5173/carbon-lens/**

### Build de produção

```bash
npm run build
```

Os arquivos estáticos ficam em `./dist/`.

### Preview do build

```bash
npm run preview
```

---

## 📁 Estrutura do Projeto

```
carbon-lens/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Imagens e assets estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── SustainabilityScoreCard.tsx
│   │   ├── ResourceScoreBar.tsx
│   │   ├── ImpactMetricsPanel.tsx
│   │   ├── OpportunityCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── ReportModal.tsx
│   │   └── index.ts
│   ├── data/                # Dados mockados (camada separada)
│   │   └── index.ts
│   ├── pages/               # Páginas da aplicação
│   │   └── Dashboard.tsx
│   ├── types/               # Definições TypeScript
│   │   └── index.ts
│   ├── utils/               # Funções utilitárias
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions para deploy automático
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🌐 Deploy no GitHub Pages

### Opção 1: Deploy Automático (recomendado)

1. Crie um repositório no GitHub chamado `carbon-lens`
2. Push o código:

```bash
cd carbon-lens
git init
git add .
git commit -m "feat: Carbon Lens MVP - Cloud Sustainability Dashboard"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/carbon-lens.git
git push -u origin main
```

3. No GitHub, vá em **Settings → Pages**
4. Em **Source**, selecione **GitHub Actions**
5. O deploy será automático no próximo push para `main`

### Opção 2: Deploy Manual

```bash
npm run build
npx gh-pages -d dist
```

### Acessar a aplicação

Após o deploy, acesse:

```
https://SEU_USUARIO.github.io/carbon-lens/
```

---

## ⚙️ Configuração

### Alterar o base path

Se o repositório tiver outro nome, altere em `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/NOME_DO_SEU_REPO/',
})
```

### Substituir dados mockados

Os dados estão em `src/data/index.ts`. Para conectar com uma API real:

1. Mantenha as interfaces em `src/types/`
2. Substitua as exportações em `src/data/` por chamadas de API
3. Use `useEffect` + `useState` nos componentes para carregar dados assíncronos

---

## 🎨 Design

- **Tema:** Terminal/k9s-inspired com acabamento moderno
- **Cores:** Dark mode com acentos verde (sustentabilidade)
- **Tipografia:** JetBrains Mono (código) + Inter (UI)
- **Responsivo:** Desktop, tablet e mobile
- **Acessibilidade:** aria-labels, contraste adequado, teclado-navegável

---

## 📋 Features

- [x] Sustainability Score com visualização circular animada
- [x] Resource Scores com barras de progresso
- [x] Impact Metrics (savings, CO₂, resources analyzed)
- [x] Optimization Opportunities com cards detalhados
- [x] Filtros por categoria (Compute, Storage, Database)
- [x] Generate Report com modal interativo
- [x] Responsivo (mobile, tablet, desktop)
- [x] Deploy gratuito no GitHub Pages
- [x] CI/CD com GitHub Actions

---

## 🛠️ Stack

| Tech | Uso |
|------|-----|
| React 18 | UI Framework |
| TypeScript 5.5 | Type Safety |
| Vite 5 | Build Tool |
| Tailwind CSS 3.4 | Styling |
| GitHub Pages | Hosting (gratuito) |
| GitHub Actions | CI/CD |

---

## 📄 Licença

MIT
