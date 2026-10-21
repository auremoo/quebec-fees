> Créé par Aurélien Moote - Moo - 2026. Logiciel libre (licence MIT) :
> réutilisable à condition de conserver la mention de l'auteur.

# Quebec Fees

Calculateur web de **taxes du Québec (TPS 5 % + TVQ 9,975 %)** avec pourboire, partage de facture et calcul inversé.

👉 **Application en ligne : https://auremoo.github.io/quebec-fees/**

## Fonctionnalités

- **Mode rapide** : un montant avant taxes → TPS, TVQ, total. Accepte les additions (`12,50+8`, `3*4,99`).
- **Mode panier** : plusieurs articles avec quantité, articles détaxés (ex. épicerie de base) et rabais (prix négatif).
- **Mode inverse** : à partir d'un total payé, retrouve le prix avant taxes (optionnellement pourboire inclus → budget maximal).
- **Pourboire** en **%** (boutons rapides configurables + valeur libre) ou en **montant fixe $**, calculé **avant** ou **après** taxes.
- **Total rond** : ajuste le pourboire pour arriver au dollar supérieur.
- **Partage** de la facture entre N personnes (arrondi au cent supérieur par personne).
- **Comparateur** de pourboires (10 / 15 / 18 / 20 / 25 %…), cliquable.
- **Arrondi comptant** à 0,05 $ (le Canada n'a plus de pièce de 1 ¢).
- **Historique** local des calculs (restaurables), **copie** d'un résumé texte.
- **Modulable** : préréglages de taxes pour toutes les provinces et territoires, taxes entièrement éditables (ajout / suppression / taux).
- Français / anglais, thème clair / sombre / auto, installable sur l'écran d'accueil (manifeste PWA), aucune dépendance.

## Paramètres d'URL (raccourcis iPhone, favoris)

L'application peut être ouverte avec un montant prérempli :

| Paramètre | Alias | Effet |
|---|---|---|
| `montant` | `amount`, `prix`, `price` | Mode rapide avec ce montant avant taxes (accepte `12,50` ou `12.50`) |
| `total` | — | Mode inverse avec ce total payé |
| `pourboire` | `tip` | Pourboire en % (0 à 100) |
| `partage` | `split` | Nombre de personnes (1 par défaut) |

Exemple : `https://auremoo.github.io/quebec-fees/?montant=42,50&pourboire=18&partage=2`

Les paramètres sont retirés de l'URL une fois appliqués.
Une URL entièrement encodée (`/quebec-fees/%3Fmontant%3D5`, produite par certains raccourcis) est redirigée par `404.html`.

**Raccourci iPhone** (app Raccourcis) : *Demander une entrée* (Nombre) → *URL* `https://auremoo.github.io/quebec-fees/?montant=` suivi de la variable *Entrée fournie* → *Ouvrir les URL*.

## Calcul

Chaque taxe est calculée séparément sur le montant taxable puis arrondie au cent, comme sur un reçu :

```
TPS = arrondi(montant × 5 %)
TVQ = arrondi(montant × 9,975 %)
Total = montant + TPS + TVQ + pourboire
```

Les taux sont indicatifs : vérifiez toujours votre reçu.

## Développement

Site 100 % statique (HTML / CSS / JavaScript vanilla). Ouvrez `index.html` dans un navigateur, ou :

```bash
python -m http.server 8000
```

Publié via GitHub Pages depuis la branche `main`.

## Auteur & licence

Créé par **Aurélien Moote - Moo - 2026**. Logiciel libre (licence MIT) :
réutilisable à condition de conserver la mention de l'auteur. Voir [LICENSE](LICENSE), [NOTICE](NOTICE) et [AUTHORS](AUTHORS).
