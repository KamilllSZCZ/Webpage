# Dual Zone Garage — One-page website

Prosty, nowoczesny one-page dla firmy motoryzacyjnej. Pliki strony znajdują się w katalogu projektu.

Jak przetestować lokalnie:

1. Otwórz `index.html` w przeglądarce (np. dwuklik lub `Open File`).
2. Alternatywnie uruchom prosty serwer w katalogu projektu (Python 3):

```bash
cd /home/admin/Documents/Webpage
python3 -m http.server 8000
# następnie otwórz http://localhost:8000
```

Uwaga: Galeria używa tymczasowych zdjęć z Unsplash (linki hotlink). Aby użyć własnych zdjęć: skopiuj pliki do `assets/images/` i zaktualizuj atrybuty `src` i `data-full` w `index.html`.

Pliki:

- index.html
- assets/css/styles.css
- assets/js/script.js
- assets/images/placeholder*.svg

Strona jest responsywna, dark-theme, bez zewnętrznych frameworków.
