---
layout: default
title: Open5GS Operator Documentation
description: Una plataforma moderna para la gestión de redes 5G
---

# Open5GS Operator Documentation

![Open5GS Logo](/assets/img/open5gs-logo.svg)

## Una solución completa para desplegar y gestionar redes 5G

Open5GS Operator facilita el despliegue, la configuración y la gestión de redes 5G en entornos de producción y desarrollo. Nuestra documentación proporciona guías paso a paso para comenzar rápidamente.

## Tutoriales Destacados

<div class="cards-container">
  <div class="card">
    <img src="/assets/img/deployment.png" alt="Deployment illustration">
    <div class="card-content">
      <h3>Despliegue de Open5GS</h3>
      <p>Aprende a desplegar Open5GS en tu entorno Kubernetes utilizando el operador.</p>
      <a href="/docs/open5gs-deployment/deployment" class="button">Ver Tutorial</a>
    </div>
  </div>
  
  <div class="card">
    <img src="/assets/img/users.png" alt="Users management illustration">
    <div class="card-content">
      <h3>Gestión de Usuarios</h3>
      <p>Configura y administra usuarios en tu red Open5GS de manera sencilla.</p>
      <a href="/docs/open5gs-users/users" class="button">Ver Tutorial</a>
    </div>
  </div>
  
  <div class="card">
    <img src="/assets/img/monitoring.png" alt="Monitoring illustration">
    <div class="card-content">
      <h3>Monitorización</h3>
      <p>Implementa herramientas de monitorización para tu red Open5GS.</p>
      <a href="/tutorials" class="button">Ver Tutorial</a>
    </div>
  </div>
</div>

## Comenzar Ahora

```bash
# Instalar el operador de Open5GS
kubectl create namespace open5gs
helm repo add open5gs https://open5gs.org/helm-charts
helm install open5gs-operator open5gs/operator -n open5gs
```

## Características Principales

- **Despliegue Simplificado**: Configura tu red 5G con un único archivo YAML
- **Alta Disponibilidad**: Soporte integrado para múltiples réplicas y failover
- **Monitorización Avanzada**: Prometheus y Grafana integrados
- **Gestión de Usuarios**: API sencilla para administrar suscriptores
- **Actualizaciones Sin Tiempo de Inactividad**: Mantén tu red actualizada sin interrupciones