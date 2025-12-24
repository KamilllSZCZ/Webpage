Deploying to GitHub Pages

1. Create a repository and push this project to it.
2. Run (local):

```bash
chmod +x deploy.sh
./deploy.sh
```

This script commits the working tree to an orphan `gh-pages` branch and pushes it (force). Adjust to your workflow as needed.

---

# Deployment — GitHub Pages ✅

Ten projekt został skonfigurowany do automatycznego deployu na **GitHub Pages** przy pushu do gałęzi `main` za pomocą GitHub Actions.

Co zostało dodane:
- `.github/workflows/deploy.yml` — workflow, który przygotowuje zawartość katalogu `public` i używa oficjalnych akcji `upload-pages-artifact` oraz `deploy-pages` do opublikowania strony.
- `deploy.sh` — skrypt pomocniczy, który tworzy gałąź `gh-pages` ignorując pliki konfiguracyjne i dokumentację.

Jak to działa:
1. Po każdym pushu na `main` workflow wykona kroki: checkout → przygotowanie zawartości (kopiowanie plików do `public`) → upload artifact → deploy na Pages.
2. Nie musisz nic konfigurować po stronie akcji — wystarczy, że repo ma włączone GitHub Pages (domyślnie Pages będą publikowane przez akcję `deploy-pages`).

Ręczny deploy:
- Możesz uruchomić `./deploy.sh` lokalnie (upewnij się, że masz commitowane zmiany).

Dodatkowe wskazówki:
- Aby użyć niestandardowej domeny, dodaj plik `CNAME` do repo i ustaw domenę w ustawieniach GitHub Pages.
- Jeśli chcesz, żebym wykonał commit i push tych zmian do zdalnego repo, daj znać — mogę to zrobić (wymaga dostępu do origin i poprawnej konfiguracji git).