# lia-core

Contratos compartilhados da plataforma Lia.

## Responsabilidade

- Tipos de domínio.
- Roles e permissões.
- Status e checkpoints.
- Tenant padrão Lia.
- Domínios oficiais `aneety.com`.
- Cliente HTTP mínimo para consumidores frontend.

## Publicação

Cloudflare Pages Free esperado: <https://core.aneety.com/>

O build publica ESM estático em `dist/index.js` e tipos em `dist/index.d.ts`.

Import público alvo:

```ts
import { appRoles, createLiaApiClient } from 'https://core.aneety.com/index.js';
```

## API padrão

`createLiaApiClient()` usa `https://api.aneety.com/` quando `baseUrl` não for informado.

## Validação

```bash
pnpm lint
pnpm test
pnpm build
pnpm deploy:cloudflare
```
