#!/bin/bash
set -e

# Script para criar múltiplos bancos de dados no PostgreSQL

echo "Criando bancos de dados adicionais..."

# Criar banco sonarqube
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE sonarqube;
    GRANT ALL PRIVILEGES ON DATABASE sonarqube TO $POSTGRES_USER;
EOSQL

echo "Bancos de dados criados com sucesso!"
