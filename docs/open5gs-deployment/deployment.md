---
layout: default
title: "Create an Open5GS Deployment"
---

# Create an Open5GS Deployment

Este tutorial te guiará paso a paso para desplegar Open5GS en tu infraestructura.

## Requisitos previos

- Acceso a un entorno Linux.
- Docker instalado.
- Conocimientos básicos de YAML.

## Paso 1: Configuración Inicial

Edita el archivo [deployment-values.yaml](deployment-values.yaml) para configurar los parámetros de despliegue.

```yaml
# Ejemplo de deployment-values.yaml
server:
  host: "0.0.0.0"
  port: 8080
database:
  user: "open5gs"
  password: "password123"

```
<div class="navigation-buttons"> <a href="/docs/open5gs-users/users.html" class="btn">Siguiente Tutorial: Create Open5GS Users</a> <a href="{{ '/' | relative_url }}" class="btn">Volver al Inicio</a> </div> ```