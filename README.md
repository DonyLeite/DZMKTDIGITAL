# DZ Marketing Digital — Landing Page

Mirror estático da landing page da **DZ Marketing Digital**, publicado em
<https://dzmktdigital-1.base44.app>.

Site 100% estático: HTML + CSS compilado (Tailwind) + JavaScript vanilla.
Sem build step, sem dependências — é só abrir o `index.html`.

## 🚀 Publicar

| Onde | Como |
| --- | --- |
| **GitHub Pages** | Settings → Pages → branch `main`, pasta `/ (root)` |
| **Netlify** | arraste a pasta do repo para <https://app.netlify.com/drop> |
| **Vercel** | `npx vercel --prod` |
| **Qualquer hospedagem** | copie `index.html`, `assets/` e os `.png` para a raiz |

## 📁 Estrutura

```
.
├── index.html          # página completa (hero, serviços, depoimentos, raio-x, diagnóstico, contato)
├── assets/
│   ├── styles.css      # CSS compilado do Tailwind (extraído do app original)
│   └── app.js          # interações: menu mobile, acordeão de serviços, header no scroll, form -> WhatsApp
├── favicon.png         # logo da marca
├── icon-192.png        # ícones PWA
├── icon-512.png
├── manifest.json
└── README.md
```

## ⚙️ Interações implementadas em `assets/app.js`

- **Header** — fica transparente no topo e ganha fundo `backdrop-blur` ao rolar.
- **Menu mobile** — botão de hamburger abre/fecha o painel de navegação (`< 1024px`).
- **Serviços** — acordeão: clica no serviço, abre o detalhe (features + investimento) e destaca o item ativo.
- **Diagnóstico** — o formulário monta a mensagem e abre o WhatsApp (`wa.me/5511937584664`) com os dados preenchidos.
- **Hero** — contadores (`500+`, `10M+`, `98%`, `+340%`) animam na entrada da viewport.
- **Rodapé** — ano do copyright é preenchido via JS.

> Tudo respeita `prefers-reduced-motion`.

## 🔗 CTAs e contatos

| Item | Valor |
| --- | --- |
| WhatsApp | `wa.me/5511937584664` |
| E-mail | `dzmkt.br@gmail.com` |
| Instagram | <https://www.instagram.com/doni__leite> |
| Facebook | <https://www.facebook.com/donileite> |
| YouTube | <https://www.youtube.com/@doni_leite> |
| LinkedIn | <https://www.linkedin.com/in/doni-leite> |

Os links de WhatsApp com mensagem pré-preenchida por serviço estão no HTML —
troque o número `5511937584664` por uma busca global para mudar em todo o site.

## 🔗 Sincronizar com o app original (base44)

Este repositório é um **espelho estático**. O código-fonte original (React/Vite)
continua no [base44](https://app.base44.com). Duas formas de manter tudo em
paridade:

1. **Sincronização pelo base44 (recomendado)** — no editor do app:
   *Settings → Integrations → GitHub*, conecte `DonyLeite/DZMKTDIGITAL` e o
   base44 passa a enviar o código-fonte para este repositório. A partir daí o
   repo vira a fonte de verdade e o deploy automático acontece.
2. **Re-exportar manualmente** — no editor do base44 use *Export/Share → GitHub*
   para sobrescrever o repositório com o código-fonte atual.

Depois de qualquer mudança de conteúdo no base44, o fluxo ideal é:

```
base44  ->  GitHub (repo)  ->  GitHub Pages / Netlify (deploy)
```

## ⚠️ Nota sobre a origem deste mirror

A extração foi feita a partir do bundle compilado do app base44 (`dzmktdigital-1`),
já que o app exige autenticação para exibir a landing page. Todo o texto,
markup e estilos são os originais; o JavaScript foi reescrito em vanilla JS
para substituir o runtime React nos pontos interativos.
