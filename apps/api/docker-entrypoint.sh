#!/bin/bash

set +e

echo "=== Diagnostic PHP ==="
echo "PHP version:"
php --version 2>&1 | grep -v "already loaded"
echo ""

echo "=== Configuration de la base de données Symfony ==="


# Créer la base de données si elle n'existe pas
echo "Création de la base de données (si nécessaire)..."
php bin/console doctrine:database:create --if-not-exists 2>&1 | grep -v "already exists"

# Générer les migrations à partir des entités
echo "Génération des migrations..."
php bin/console doctrine:migrations:diff --no-interaction 2>&1 | grep -E "(generated|no changes)"

# Exécuter les migrations
echo "Exécution des migrations..."
php bin/console doctrine:migrations:migrate --no-interaction 2>&1 | tail -1

# Charger les fixtures
echo "Chargement des fixtures..."
php bin/console doctrine:fixtures:load --no-interaction --append 2>&1 | grep -E "(Loaded|fixtures)" | tail -1

# Lancer PHP-FPM
exec php-fpm
