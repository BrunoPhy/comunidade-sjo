# Guia de Publicação — Site da Comunidade São José Operário

Este guia leva o site do seu computador até estar **online para todos**, com um
link que você poderá transformar em QR Code. Tudo aqui é **gratuito**.

O caminho é: **testar no seu PC → publicar na Vercel → pegar o link → gerar o QR**.

---

## 1. O que tem dentro do projeto

```
comunidade-sjo/
├── index.html            → página base (título, ícone, preview de link)
├── package.json          → lista de dependências
├── vite.config.js        → configuração do projeto
├── public/
│   ├── logo.png          → logo da comunidade
│   ├── favicon.png       → ícone que aparece na aba do navegador
│   └── og-image.png      → imagem de preview ao compartilhar o link
└── src/
    ├── App.jsx           → O SITE INTEIRO (pastorais, textos, contatos)
    ├── main.jsx          → ponto de partida do React
    └── index.css         → estilo base
```

> **O arquivo que você vai editar no dia a dia é o `src/App.jsx`.** Tudo o que
> muda (pastorais, textos, números de WhatsApp, Instagram) está organizado no
> topo dele.

---

## 2. Pré-requisito: Node.js

Você precisa do Node.js instalado (versão 18 ou superior). Para conferir, abra o
terminal e digite:

```bash
node -v
```

Se aparecer um número (ex.: `v20.x`), está pronto. Se não, baixe em
**https://nodejs.org** (versão "LTS").

---

## 3. Testar no seu computador (antes de publicar)

1. Descompacte a pasta `comunidade-sjo` em algum lugar fácil (ex.: Documentos).
2. Abra o terminal **dentro** dessa pasta.
3. Instale as dependências (só na primeira vez):

   ```bash
   npm install
   ```

4. Rode o site localmente:

   ```bash
   npm run dev
   ```

5. O terminal vai mostrar um endereço como `http://localhost:5173`.
   Abra no navegador — o site estará rodando no seu PC.
   Para testar como fica no celular, abra as ferramentas do navegador (F12) e
   ative o modo de dispositivo móvel.

Para parar, volte ao terminal e aperte `Ctrl + C`.

---

## 4. Editar o conteúdo

Abra `src/App.jsx`. No topo do arquivo você encontra:

**Dados gerais da comunidade:**

```js
const COMUNIDADE = {
  nome: "São José Operário",
  nomeCompleto: "Comunidade São José Operário",
  whatsapp: "5511966478060",          // WhatsApp geral (rodapé)
  instagram: "https://www.instagram.com/comunidadesaojoseoperarioo/",
};
```

**As pastorais** (cada uma é um bloco igual a este):

```js
{
  id: "acolhida",
  nome: "Pastoral da Acolhida",
  icon: DoorOpen,
  foto: null,                         // troque por "URL-da-foto.jpg" quando tiver
  sobre: "Texto sobre a missão...",
  participar: "Quem pode participar...",
  coordenador: "Bruno",
  whatsapp: "5511966478060",          // número que recebe a mensagem desta pastoral
},
```

- **Trocar um contato:** mude `coordenador` e `whatsapp` da pastoral.
  Formato do número: **55 + DDD + número**, tudo junto (ex.: `5511966478060`).
- **Adicionar uma pastoral:** copie um bloco inteiro, cole no fim da lista e
  troque os dados. Pronto — ela aparece sozinha na grade.
- **Colocar foto:** troque `foto: null` por `foto: "https://.../foto.jpg"`.

Salve o arquivo e o site no `npm run dev` atualiza sozinho.

---

## 5. Publicar na Vercel (grátis)

A forma recomendada é conectar o projeto ao **GitHub** — assim, toda vez que
você atualizar, o site publica sozinho.

### 5.1 Subir o projeto para o GitHub

1. Crie uma conta em **https://github.com** (se ainda não tiver).
2. Clique em **New repository**, dê um nome (ex.: `comunidade-sjo`),
   deixe **Public** e crie.
3. No terminal, dentro da pasta do projeto, rode (troque a URL pela do seu repo):

   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/comunidade-sjo.git
   git push -u origin main
   ```

### 5.2 Conectar à Vercel

1. Acesse **https://vercel.com** e clique em **Sign Up** → entre com o GitHub.
2. Clique em **Add New… → Project**.
3. Escolha o repositório `comunidade-sjo` e clique em **Import**.
4. A Vercel reconhece o Vite automaticamente. Não precisa mudar nada.
   Clique em **Deploy**.
5. Em cerca de 1 minuto, ela mostra o link do site, algo como:
   **`https://comunidade-sjo.vercel.app`** 🎉

Esse é o link público que vai no QR Code.

> **Atualizou o site depois?** Basta `git add .`, `git commit -m "..."` e
> `git push`. A Vercel publica a nova versão sozinha em segundos.

### Alternativa rápida (sem GitHub)

Se preferir não usar GitHub agora, dá para publicar direto pelo terminal:

```bash
npm install -g vercel
vercel
```

Responda às perguntas (aceite os padrões) e ela publica. Para atualizar depois,
rode `vercel --prod`.

---

## 6. Gerar o QR Code

Com o link em mãos (ex.: `https://comunidade-sjo.vercel.app`):

- Use um gerador gratuito como **qr-code-generator.com** ou
  **br.qr-code-generator.com**, cole o link e baixe a imagem em **PNG** ou
  **SVG** (SVG é melhor para imprimir grande, pois não perde qualidade).
- Ou me mande o link aqui que eu **gero o QR Code pra você**, já no estilo da
  comunidade.

**Dica de impressão:** imprima o QR com pelo menos **3 x 3 cm**, deixe uma
margem branca em volta e adicione embaixo uma frase como
*"Aponte a câmera e conheça nossas pastorais"*.

---

## 7. (Para o futuro) Domínio próprio

O link `.vercel.app` funciona perfeitamente. Quando quiser algo como
`comunidadesaojoseoperario.com.br`:

1. Registre o domínio em **https://registro.br** (cerca de R$40/ano).
2. Na Vercel, vá em **Settings → Domains**, adicione o domínio e siga as
   instruções (é só copiar dois registros para o registro.br).

O QR Code pode continuar o mesmo se você configurar o domínio na Vercel — o link
antigo passa a redirecionar.

---

## Resumo rápido

| Passo | O que fazer |
|------|--------------|
| Testar | `npm install` → `npm run dev` |
| Editar | mexer no topo de `src/App.jsx` |
| Publicar | subir no GitHub → importar na Vercel → **Deploy** |
| Atualizar | `git push` (publica sozinho) |
| Divulgar | gerar QR Code com o link da Vercel |

Qualquer passo que travar, me chame que destravamos juntos.
