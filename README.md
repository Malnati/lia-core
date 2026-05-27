# lia-core

Contratos compartilhados da plataforma Lia.

## Responsabilidade

- Tipos de domínio.
- Roles e permissões.
- Status e checkpoints.
- Tenant padrão Lia.
- Rotas públicas da API NestJS.
- Cliente HTTP mínimo para consumidores frontend.

## Publicação

GitHub Pages esperado: <https://malnati.github.io/lia-core/>

O build publica ESM estático em `dist/index.js` e tipos em `dist/index.d.ts`.

## Validação

```bash
pnpm lint
pnpm test
pnpm build
```
