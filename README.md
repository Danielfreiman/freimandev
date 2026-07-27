# Freiman Dev

Landing page da Freiman Dev — desenvolvimento web sob demanda.
Next.js (App Router), TypeScript e CSS Modules, com renderização estática,
imagens otimizadas e metadados de SEO.

**Conceito:** *The Build Stack — da demanda ao ar.* Sete camadas de um projeto
web (estrutura, interface, código, conteúdo, integração, performance e
publicação) começam dispersas em profundidade e se organizam, conforme o
scroll, dentro de um frame de navegador até o estado `no ar`.

## Rodar localmente

**Pré-requisito:** Node.js 20.9 ou superior.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Opcionalmente, defina a URL pública em `.env.local` (veja `.env.example`):
   ```
   NEXT_PUBLIC_SITE_URL=https://www.freimandev.com.br
   ```
   Ela alimenta o canonical, o Open Graph, o `sitemap.xml` e o `robots.txt`.
3. Suba o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sem emitir arquivos |
| `npm run optimize:images` | Converte capas de projeto para webp (veja abaixo) |

> Não rode `npm run build` com o `npm run dev` ativo: os dois compartilham o
> diretório `.next` e o cache corrompe.

## Estrutura

```
app/          layout, página, globals.css, robots.ts, sitemap.ts, manifest.ts
components/
  scene/      Signature Scene (BuildArc, BuildStack, SceneBoot)
  sections/   Hero, Capabilities, SelectedWork, Process, Engagement, Contact
  layout/     Header, Footer
  ui/         Logo, Action
data/         brand, projects, capabilities, process, scene
public/       projects/*.webp, textures/
scripts/      optimize-images.mjs
```

### Dados

Todo o conteúdo comercial vive em `data/`. `data/brand.ts` é a fonte única de
marca e contato — o WhatsApp aparece só a partir dali. E-mail e redes sociais
não são exibidos porque não há perfis públicos confirmados.

### Imagens de projeto

As capas ficam em `public/projects` como webp. Para regerar a partir de PNGs:

```bash
npm run optimize:images ./caminho/para/os/pngs
```

## Decisões de implementação

- **Sem WebGL.** A Signature Scene é CSS 3D sobre DOM real: o conteúdo continua
  indexável, a página funciona sem WebGL por construção e o scroll não
  re-renderiza React — o JavaScript apenas escreve custom properties
  (`--p`, `--mx`, `--my`) e o compositor faz o resto.
- **A cor tem função.** O verde `#B6F36B`, extraído do `icon.svg` da marca,
  marca um estado só: publicado / no ar. O que ainda não foi construído é
  desenhado em hairlines tracejadas.
- **Acessibilidade.** WCAG 2.2 AA: skip link, foco visível, alvos de toque,
  contraste mínimo aferido em 4.93:1, e `prefers-reduced-motion` mantém a cena
  no estado final estático sem perder informação.
