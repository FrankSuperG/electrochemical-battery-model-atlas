.PHONY: check validate render render-readme render-reproductions check-links check-bib check-readme

check:
	node scripts/models.js check

validate:
	node scripts/models.js validate

render:
	node scripts/models.js render-reproductions
	node scripts/models.js render-readme

render-readme:
	node scripts/models.js render-readme

render-reproductions:
	node scripts/models.js render-reproductions

check-links:
	node scripts/models.js check-links

check-bib:
	node scripts/models.js check-bib

check-readme:
	node scripts/models.js check-readme
