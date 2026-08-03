# La Peau — Parfumerie de Contact

Landing page institucional e de pré-lançamento da **La Peau**, uma casa de
perfumes com posicionamento clássico, editorial e contemporâneo.

A experiência foi construída a partir da identidade visual da marca, com
paleta em marfim, café, dourado e rosa antigo, tipografia inspirada nas casas de
perfumaria tradicionais, movimentos sutis de parallax e uma narrativa focada
no conceito:

> O perfume encontra a pele.

## Estado atual

- Página única, responsiva e otimizada para desktop e dispositivos móveis.
- Publicada gratuitamente pelo **OpenAI Sites**.
- URL de produção: <https://la-peau-parfumerie.lucianocsilveira.chatgpt.site>
- O acesso da publicação atual é **privado**, restrito ao proprietário do Site.
- O Instagram oficial está integrado em navegação, galeria editorial e rodapé:
  <https://www.instagram.com/lapeau.parfumerie>.
- Não há formulário, integração com WhatsApp, catálogo ou banco de dados nesta
  versão.
- O repositório remoto configurado como `origin` é:
  <https://github.com/lucianocsilveira/lapeau_landing_page.git>

> Importante: enviar commits ao GitHub não publica automaticamente uma nova
> versão do site. O fluxo de publicação no Sites é uma etapa separada, descrita
> neste documento.

## Tecnologias utilizadas

| Tecnologia | Versão atual | Finalidade |
| --- | ---: | --- |
| Node.js | `>= 22.13.0` | Ambiente de execução e ferramentas de desenvolvimento |
| React | `19.2.6` | Componentização e comportamento da interface |
| Next.js | `16.2.6` | App Router, metadados e estrutura da aplicação |
| TypeScript | `5.9.3` | Tipagem estática |
| vinext | `0.0.50` | Compilação do projeto Next.js por meio do Vite |
| Vite | `8.0.13` | Servidor local e pipeline de build |
| Tailwind CSS | `4.2.1` | Pipeline de CSS; o design atual usa principalmente CSS autoral |
| Cloudflare Vite Plugin | `1.37.1` | Geração do Worker compatível com a hospedagem Sites |
| Wrangler | `4.92.0` | Infraestrutura local usada pelo plugin da Cloudflare |
| Drizzle ORM | `0.45.2` | Estrutura opcional para banco D1; não utilizada atualmente |
| ESLint | `9.39.4` | Análise estática do código |

O projeto utiliza módulos ECMAScript, definidos por `"type": "module"` no
`package.json`.

## Direção visual

### Tipografia

As fontes são carregadas com `next/font/google` em `app/layout.tsx`:

- **Bodoni Moda** (`--font-bodoni`): títulos e assinatura principal;
- **Cormorant Garamond** (`--font-cormorant`): textos, subtítulos e itálicos;
- O monograma `LP` não é composto com uma fonte web. Ele usa a arte oficial da
  marca em `public/monograma-lp.png`, preservando exatamente o desenho enviado.

O carregamento utiliza `display: swap` para evitar que o texto fique invisível
enquanto as fontes são baixadas.

### Paleta

Os principais tokens estão definidos no início de `app/globals.css`:

```css
:root {
  --ivory: #f1e9dc;
  --paper: #f7f1e7;
  --espresso: #24140f;
  --espresso-soft: #34211a;
  --gold: #ad8852;
  --rose: #b56f70;
  --ink: #2d1b15;
}
```

Ao alterar a identidade visual, prefira atualizar esses tokens em vez de
espalhar novas cores diretamente pelos seletores.

### Imagens da marca

Os arquivos utilizados pela página ficam em `public/`:

| Arquivo | Uso |
| --- | --- |
| `public/brand-board.png` | Prancha completa da identidade visual |
| `public/embalagens.png` | Imagem principal do hero |
| `public/monograma-lp.png` | Monograma oficial usado no cabeçalho, hero, fechamento e favicon |
| `public/redes-sociais_1.png` | Cena editorial do frasco na seção de experiência |
| `public/redes-sociais_2.png` | Monograma sobre fundo café na galeria do Instagram |
| `public/redes-sociais_3.png` | Assinatura Parfumerie de Contact na galeria do Instagram |
| `public/redes-sociais_4.png` | Frase da marca na galeria do Instagram |
| `public/og.png` | Imagem de compartilhamento para Open Graph e X/Twitter |

`public/og.png` foi criada especificamente para esta página, usando as três
referências originais da marca. Ela contém os textos “LA PEAU”, “PARFUMERIE DE
CONTACT” e “O perfume encontra a pele.”.

O arquivo legado `public/redes-sociais.png`, que reunia as quatro peças em uma
única imagem, não é mais referenciado pela página.

Ao substituir uma imagem, mantenha o mesmo nome para evitar alterações no código
ou atualize as referências em `app/page.tsx` e `app/layout.tsx`.

## Estrutura do projeto

```text
.
├── .openai/
│   └── hosting.json          # Identidade do Site e bindings opcionais
├── app/
│   ├── chatgpt-auth.ts       # Helpers opcionais de autenticação
│   ├── globals.css           # Design system, layout, responsividade e animações
│   ├── layout.tsx            # Fontes, idioma, SEO e metadados sociais
│   └── page.tsx              # Conteúdo e comportamento da landing page
├── build/
│   └── sites-vite-plugin.ts  # Integração do build com o OpenAI Sites
├── db/
│   ├── index.ts              # Infraestrutura opcional do Drizzle
│   └── schema.ts             # Schema vazio; não há banco em uso
├── drizzle/                  # Metadados/migrações opcionais
├── examples/d1/              # Exemplo do template; não faz parte da página
├── public/                   # Imagens e outros arquivos públicos
├── tests/                    # Teste herdado do template; ver Limitações conhecidas
├── worker/
│   └── index.ts              # Entrada do Cloudflare Worker
├── drizzle.config.ts         # Configuração opcional do Drizzle/SQLite
├── next.config.ts            # Configuração do Next.js
├── package.json              # Scripts, versões e dependências
├── vite.config.ts            # vinext, Sites e Cloudflare em ambiente local
└── tsconfig.json             # Configuração do TypeScript
```

Arquivos gerados localmente, como `node_modules/`, `dist/`, `.wrangler/`,
`.vinext/` e `work/`, não devem ser versionados.

## Arquitetura da página

A aplicação possui uma única rota, `/`.

### `app/page.tsx`

É um Client Component (`"use client"`) porque controla os efeitos de rolagem e
entrada dos elementos.

Principais seções:

| ID/área | Responsabilidade |
| --- | --- |
| `#inicio` | Hero, mensagem principal e imagem das embalagens |
| `#conceito` | Manifesto e posicionamento da marca |
| `#experiencia` | Ritual e imagem editorial do perfume |
| `#instagram` | Galeria das peças sociais e link para o perfil oficial |
| Pilares | Pele, Presença e Memória |
| História visual | Identidade e atmosfera da marca |
| `#lancamento` | Encerramento “Em breve” |
| Rodapé | Assinatura institucional |

Os links de navegação são âncoras internas. Ao adicionar ou renomear uma seção,
atualize simultaneamente o atributo `id` e o `href` correspondente.

### Animações e parallax

Os movimentos são implementados sem biblioteca externa:

- elementos com `data-reveal` são revelados por `IntersectionObserver`;
- elementos com `data-parallax` recebem um deslocamento calculado durante a
  rolagem;
- `requestAnimationFrame` limita as atualizações visuais ao ciclo de pintura do
  navegador;
- o valor de `data-parallax`, como `0.055`, controla a intensidade do efeito;
- a classe `is-scrolled` altera o cabeçalho depois de 32 px de rolagem;
- `prefers-reduced-motion: reduce` desativa os movimentos para usuários que
  solicitam menos animações no sistema operacional.

Mantenha valores de parallax baixos. Valores altos criam recortes indesejados
nas imagens e podem prejudicar a leitura em telas pequenas.

### Estilos e responsividade

Todo o layout específico está em `app/globals.css`. Os principais breakpoints
são:

- `900px`: reorganiza grids, transforma o hero em sobreposição e simplifica a
  navegação;
- `600px`: ajusta tipografia, margens, pilares e rodapé para celulares.

O arquivo também inclui:

- textura global sutil;
- estados de foco e hover;
- animações iniciais do hero;
- tratamento do cabeçalho fixo;
- fallbacks tipográficos;
- suporte a `prefers-reduced-motion`.

### SEO e compartilhamento

`app/layout.tsx` gera os metadados da página. O domínio é obtido dos headers da
requisição para que a URL absoluta de `public/og.png` funcione tanto localmente
quanto em produção.

Metadados configurados:

- idioma `pt-BR`;
- título e descrição;
- Open Graph;
- cartão grande do X/Twitter;
- imagem social em `public/og.png`;
- favicon baseado no monograma oficial `public/monograma-lp.png`.

Ao alterar o posicionamento ou a frase principal, revise os textos do layout e
a arte `og.png` para manter consistência entre a página e o compartilhamento.

## Pré-requisitos

- Node.js `22.13.0` ou mais recente;
- npm, incluído com o Node.js;
- Git;
- acesso ao projeto no OpenAI Sites para publicar versões;
- acesso ao repositório GitHub para enviar alterações ao `origin`.

Confirme as versões locais:

```bash
node --version
npm --version
git --version
```

## Instalação local

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/lucianocsilveira/lapeau_landing_page.git
cd lapeau_landing_page
```

Instale exatamente as versões registradas no `package-lock.json`:

```bash
npm ci
```

Use `npm install` somente quando estiver adicionando, removendo ou atualizando
dependências. Em instalações normais e ambientes de CI, prefira `npm ci`.

Não há variáveis de ambiente obrigatórias na versão atual.

## Desenvolvimento local

Inicie o servidor:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

O servidor possui atualização automática durante a edição. Se a porta 3000 já
estiver ocupada, o processo informará o endereço alternativo utilizado.

Para encerrar, pressione `Ctrl+C` no terminal.

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente local com vinext/Vite |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run start` | Inicia localmente o build de produção |
| `npm run lint` | Executa o ESLint |
| `npm test` | Executa o teste herdado do starter; atualmente está obsoleto |
| `npm run db:generate` | Gera migrações Drizzle quando um schema D1 for criado |

## Build local

Antes de abrir um pull request ou publicar uma atualização:

```bash
npm ci
npm run lint
npm run build
```

O resultado do build é gravado em `dist/`. Essa pasta é ignorada pelo Git e não
deve ser adicionada ao repositório.

Um build bem-sucedido deve conter, entre outros arquivos:

```text
dist/server/index.js
```

Esse é o ponto de entrada esperado pelo fluxo de publicação do Sites.

Para testar o build de produção localmente:

```bash
npm run start
```

O comando `npm run build` é a validação obrigatória. O comando `npm test` não
deve ser usado como critério de aprovação até que o teste do starter seja
substituído, conforme explicado em **Limitações conhecidas**.

## Fluxo recomendado de alteração

1. Atualize sua cópia local:

   ```bash
   git switch main
   git pull origin main
   ```

2. Crie uma branch com nome descritivo:

   ```bash
   git switch -c feature/nome-da-alteracao
   ```

3. Instale as dependências:

   ```bash
   npm ci
   ```

4. Desenvolva e revise em `http://localhost:3000`:

   ```bash
   npm run dev
   ```

5. Valide:

   ```bash
   npm run lint
   npm run build
   ```

6. Revise o estado do repositório:

   ```bash
   git status
   git diff
   ```

7. Crie o commit e envie a branch:

   ```bash
   git add -A
   git commit -m "Descreva a alteração"
   git push -u origin feature/nome-da-alteracao
   ```

8. Depois da revisão, integre a mudança em `main`.

## Como publicar atualizações

### Hospedagem atual: OpenAI Sites

A publicação está vinculada ao projeto registrado em
`.openai/hosting.json`. Esse arquivo deve continuar versionado.

```json
{
  "project_id": "appgprj_6a7097c52018819184f93a8c7fed415b",
  "d1": null,
  "r2": null
}
```

Regras importantes:

- não remova ou altere manualmente o `project_id`;
- não crie um novo Site para publicar uma atualização deste projeto;
- `d1` e `r2` permanecem `null` enquanto não houver banco ou armazenamento;
- credenciais temporárias de publicação nunca devem ser salvas no repositório,
  em remotes Git ou em arquivos `.env` versionados;
- o envio para o GitHub e o deploy no Sites são operações independentes.

### Procedimento de publicação

1. Confirme que a alteração desejada está integrada na branch que será
   publicada.
2. Execute `npm ci`, `npm run lint` e `npm run build`.
3. Confirme que não existem arquivos acidentais com `git status`.
4. Crie e envie o commit ao GitHub.
5. No Codex, abra este repositório e solicite, por exemplo:

   ```text
   Publique no Sites a versão atual da landing page La Peau.
   Reutilize o project_id existente em .openai/hosting.json.
   ```

6. O fluxo de hospedagem irá:

   - reutilizar o Site existente;
   - validar o build;
   - registrar a versão exata do código;
   - preparar o pacote de produção;
   - salvar uma nova versão no Sites;
   - publicar essa versão;
   - acompanhar o processo até a URL ficar ativa.

7. Confira a URL de produção e faça uma revisão funcional.

Não execute um segundo deploy enquanto o anterior ainda estiver em andamento.

### Acesso privado e publicação pública

O Site atual foi implantado com acesso privado. Para torná-lo público, peça
explicitamente ao Codex para alterar o acesso e publicar a versão aprovada.
Essa ação deve ser confirmada porque permitirá que qualquer pessoa com o link
acesse a página.

Exemplo de solicitação:

```text
Torne pública a versão atual do site La Peau e confirme o endereço final.
```

### Domínio próprio

O subdomínio `chatgpt.site` é fornecido pela hospedagem. Um domínio próprio pode
ser conectado posteriormente pelo Sites, mas o registro e a renovação do
domínio são cobrados pelo provedor escolhido.

Ao conectar um domínio próprio:

1. adicione o hostname ao Site;
2. copie exatamente os registros DNS informados pelo serviço;
3. configure os registros no provedor do domínio;
4. aguarde a validação de DNS e do certificado SSL;
5. confirme o status antes de divulgar o endereço.

### GitHub não faz deploy automático

O remote `origin` aponta para o GitHub, mas não existe neste projeto um workflow
de GitHub Actions que publique no Sites. Portanto:

```bash
git push origin main
```

atualiza o código remoto, mas **não** altera a versão em produção. Após o push,
execute o procedimento do Sites.

## Rollback

Existem duas estratégias:

### Reimplantar uma versão salva

Peça ao Codex para listar as versões do Site e reimplantar a versão estável
anterior. Essa é a opção mais rápida quando o problema está apenas na versão de
produção.

### Reverter o código

Quando o repositório também precisa refletir a correção:

```bash
git log --oneline
git revert <sha-do-commit>
git push origin main
```

Depois, gere o build e publique a nova versão pelo Sites. Prefira `git revert`
a comandos que reescrevem o histórico compartilhado.

## Conteúdo e manutenção da marca

### Alterar textos

Os textos visíveis estão em `app/page.tsx`. Revise também:

- título e descrição em `app/layout.tsx`;
- textos contidos na imagem `public/og.png`;
- atributos `alt` das imagens;
- links de navegação e IDs das seções.

### Alterar imagens

Coloque arquivos públicos em `public/` e referencie-os a partir da raiz:

```tsx
<img src="/nome-do-arquivo.png" alt="Descrição da imagem" />
```

Boas práticas:

- comprima as imagens antes de publicá-las;
- preserve boa resolução para telas de alta densidade;
- prefira WebP ou AVIF para novas fotografias quando a qualidade permitir;
- evite nomes com espaços ou caracteres especiais;
- revise os recortes de desktop e celular;
- não remova `og.png` sem também alterar os metadados.

### Alterar o efeito de parallax

O valor é informado no atributo `data-parallax`:

```tsx
<img data-parallax="0.045" src="/redes-sociais_1.png" alt="..." />
```

Quanto menor o número, mais discreto o deslocamento. Depois de qualquer
alteração, teste o início e o fim da seção em diferentes tamanhos de tela para
garantir que não apareçam áreas vazias.

### Alterar o Instagram ou adicionar WhatsApp/formulário

O Instagram oficial está definido diretamente em `app/page.tsx` como
`https://www.instagram.com/lapeau.parfumerie`. Se o perfil mudar, atualize todas
as ocorrências do endereço no cabeçalho, na galeria e no rodapé.

Ao adicionar outros canais:

- não invente URLs, números, e-mails ou nomes de usuário;
- use os canais oficiais fornecidos pela marca;
- adicione rótulos acessíveis aos links;
- para formulários reais, escolha um destino persistente para os dados;
- inclua política de privacidade e consentimento quando houver coleta de dados
  pessoais;
- não simule uma inscrição bem-sucedida sem armazenar ou enviar o contato.

## Banco de dados e armazenamento

O projeto inclui a estrutura opcional do Drizzle, D1 e R2 herdada do template,
mas nenhuma dessas capacidades está ativa.

Estado atual em `.openai/hosting.json`:

- `d1: null` — sem banco SQLite/D1;
- `r2: null` — sem bucket de arquivos.

Se uma funcionalidade exigir persistência:

1. defina o schema em `db/schema.ts`;
2. gere a migração com `npm run db:generate`;
3. revise os arquivos criados em `drizzle/`;
4. configure o binding lógico em `.openai/hosting.json` pelo fluxo do Sites;
5. valide localmente e publique uma nova versão.

Não use `localStorage` para dados que precisem estar disponíveis em outros
dispositivos ou para informações sensíveis.

## Autenticação

`app/chatgpt-auth.ts` contém helpers opcionais para autenticação com ChatGPT,
mas a landing page não os utiliza atualmente.

O acesso privado atual é controlado pela política do próprio Sites, não por uma
tela de login implementada na aplicação. Não crie rotas próprias para os
caminhos reservados de autenticação do Sites sem revisar a integração existente.

## Variáveis de ambiente e segredos

Não há variáveis obrigatórias no momento. Arquivos `.env*` são ignorados pelo
Git.

Se uma integração futura precisar de credenciais:

- crie um `.env.local` apenas para desenvolvimento;
- documente somente o nome das variáveis em um `.env.example`, sem valores;
- configure os valores de produção pelo gerenciamento de ambiente do Sites;
- nunca exponha segredos em componentes client, imagens, commits ou logs;
- variáveis com prefixo `NEXT_PUBLIC_` ficam disponíveis no navegador e não
  podem conter segredos.

## Acessibilidade e desempenho

Ao manter o projeto, preserve:

- hierarquia semântica de títulos;
- textos alternativos úteis em imagens com conteúdo;
- `aria-label` em links cujo propósito não seja evidente;
- navegação por teclado;
- contraste entre texto e fundo;
- suporte a `prefers-reduced-motion`;
- eventos de rolagem passivos;
- uso de `requestAnimationFrame` no parallax;
- imagens comprimidas e dimensões adequadas.

O hero possui uma imagem decorativa com `alt=""` e `aria-hidden="true"` no
contêiner. Isso é intencional, pois a mesma informação não deve ser anunciada
duas vezes por leitores de tela.

## Checklist antes de publicar

- [ ] Os textos e acentos foram revisados em português do Brasil.
- [ ] Links e âncoras funcionam.
- [ ] Imagens carregam e os recortes estão corretos.
- [ ] A página foi revisada em celular e desktop.
- [ ] O efeito de parallax não expõe áreas vazias.
- [ ] A navegação por teclado funciona.
- [ ] O modo de redução de movimento continua funcional.
- [ ] Título, descrição e `og.png` representam a versão atual.
- [ ] `npm run lint` foi executado.
- [ ] `npm run build` foi concluído sem erros.
- [ ] `git status` não contém arquivos temporários ou segredos.
- [ ] O commit publicado corresponde exatamente ao build validado.
- [ ] A URL de produção foi aberta depois do deploy.
- [ ] O nível de acesso, privado ou público, está correto.

## Limitações conhecidas e dívida técnica

### Teste herdado do starter

`tests/rendered-html.test.mjs` ainda testa a tela temporária de carregamento do
template original. Essa tela foi removida quando a landing page foi criada.
Consequentemente, `npm test` não representa a aplicação atual e deve falhar até
o teste ser reescrito.

O teste futuro deve validar, no mínimo:

- resposta HTTP `200` para `/`;
- título “La Peau — Parfumerie de Contact”;
- presença da frase “O perfume encontra a pele.”;
- existência das seções principais;
- ausência do marcador temporário `codex-preview`.

Até essa atualização, utilize `npm run lint` e `npm run build` como validações
técnicas obrigatórias.

### Monograma em imagem raster

O desenho oficial do `LP` é uma imagem PNG. Isso garante fidelidade visual, mas
exige atenção à resolução e ao contraste. Se a marca disponibilizar futuramente
um arquivo vetorial oficial, substitua o PNG por esse arquivo sem redesenhar ou
aproximar o monograma com outra fonte.

### Infraestrutura opcional do template

As pastas `db/`, `drizzle/`, `examples/d1/` e o helper de autenticação foram
mantidos para futuras evoluções. Elas não são necessárias para a landing page
estática atual. Não as remova sem antes confirmar que o pipeline do Sites e os
planos futuros do projeto não dependem delas.

### Captura de leads

A página atual comunica o pré-lançamento, mas não captura contatos. Antes de
adicionar um formulário, defina a ferramenta de destino, o texto de
consentimento, a política de privacidade e o responsável pelo tratamento dos
dados.

## Solução de problemas

### `npm ci` falha

- confirme a versão do Node.js;
- apague apenas `node_modules/` e execute `npm ci` novamente;
- não apague `package-lock.json` para tentar resolver uma instalação comum;
- verifique acesso à internet e ao registro npm.

### A porta 3000 está ocupada

Encerre o processo que utiliza a porta ou use o endereço alternativo informado
pelo servidor. Evite manter várias instâncias do ambiente local abertas.

### Fontes não aparecem

- confirme que o ambiente possui acesso aos arquivos gerados pelo
  `next/font/google`;
- verifique os nomes das variáveis CSS no layout e no stylesheet;
- mantenha os fallbacks `Didot`, `Georgia` e `cursive`.

### Imagem não aparece

- confirme que o arquivo está em `public/`;
- use uma URL iniciada por `/`, por exemplo `/embalagens.png`;
- confira maiúsculas e minúsculas, pois o ambiente de produção pode ser
  sensível a caixa;
- gere um novo build antes de publicar.

### Build local funciona, mas a produção não mudou

Um build local e um push no GitHub não fazem deploy. Publique uma nova versão
pelo Sites e acompanhe o processo até o status final.

### O link solicita autenticação

Esse é o comportamento esperado enquanto o Site estiver privado. A alteração
para acesso público deve ser solicitada e confirmada explicitamente.

## Convenções de contribuição

- escreva código, comentários e documentação de manutenção com clareza;
- mantenha o conteúdo editorial em português do Brasil;
- prefira mudanças pequenas e commits com responsabilidade única;
- não altere arquivos gerados em `dist/`;
- não versione credenciais, arquivos `.env`, logs ou pacotes de deploy;
- preserve o `package-lock.json` quando houver mudanças de dependências;
- execute lint e build antes de solicitar revisão;
- registre neste README qualquer nova integração, variável, rota, binding ou
  etapa de publicação.

## Licença e uso de marca

Não há um arquivo de licença definido no repositório. O código, a identidade
visual, o monograma, as imagens, os textos e o nome **La Peau** devem ser
considerados proprietários até que uma licença seja adicionada formalmente.
