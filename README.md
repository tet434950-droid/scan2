# Site de Novels (Eleventy + Decap CMS)

## Como rodar localmente
```bash
npm install
npm run dev
```

## Build de produção
```bash
npm run build
```
Saída em `_site`.

## Configurar Decap CMS
Edite `admin/config.yml` e ajuste:
```yaml
repo: tet434950-droid/scan2  # troque se usar outro repo
base_url: https://steep-cloud-d8dc.tet434950.workers.dev
auth_endpoint: /
```

## Deploy no Cloudflare Pages
- **Build command**: `npm run build`
- **Output directory**: `_site`

Abra `/admin/` para usar o CMS.
Deploy de teste ✅
