---
layout: default
title: Create an Open5GS Deployment
description: Aprende a desplegar Open5GS en tu entorno Kubernetes
---

# Crear un Despliegue de Open5GS

Esta guía te llevará paso a paso a través del proceso de despliegue de Open5GS utilizando el operador. Al final, tendrás una red 5G completamente funcional ejecutándose en tu clúster de Kubernetes.

## Prerrequisitos

- Un clúster de Kubernetes (v1.19+)
- Helm 3 instalado
- kubectl configurado para comunicarse con tu clúster
- Permisos adecuados para crear recursos en el clúster

## Paso 1: Instalar el Operador de Open5GS

Primero, necesitamos instalar el operador en nuestro clúster:

```bash
# Crear un namespace dedicado
kubectl create namespace open5gs

# Añadir el repositorio de Helm
helm repo add open5gs https://open5gs.org/helm-charts
helm repo update

# Instalar el operador
helm install open5gs-operator open5gs/operator -n open5gs
```

Verifica que el operador se esté ejecutando correctamente:

```bash
kubectl get pods -n open5gs
```

Deberías ver el pod del operador en estado "Running":

![Operador en ejecución](/docs/open5gs-deployment/screenshots/operator-running.png)

## Paso 2: Preparar el Archivo de Configuración

Crea un archivo llamado `open5gs-deployment.yaml` con la siguiente configuración (también disponible en [deployment-values.yaml](/docs/open5gs-deployment/deployment-values.yaml)):

```yaml
apiVersion: open5gs.org/v1alpha1
kind: Open5GSDeployment
metadata:
  name: open5gs-demo
  namespace: open5gs
spec:
  # Configuración de componentes básicos
  amf:
    replicas: 1
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "200m"
  
  smf:
    replicas: 1
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "200m"
        
  upf:
    replicas: 1
    resources:
      requests:
        memory: "256Mi"
        cpu: "200m"
      limits:
        memory: "512Mi"
        cpu: "500m"
    
  # Base de datos MongoDB
  mongodb:
    persistence:
      enabled: true
      size: 1Gi
    
  # Configuración de la red
  networking:
    mnoDomain: "open5gs.local"
    dnn: "internet"
    ipPool: "10.45.0.0/16"
    
  # Activar WebUI
  webui:
    enabled: true
```

## Paso 3: Aplicar la Configuración

Aplica el archivo de configuración para crear tu despliegue:

```bash
kubectl apply -f open5gs-deployment.yaml
```

El operador detectará este recurso y comenzará a desplegar todos los componentes necesarios para tu red Open5GS.

## Paso 4: Verificar el Despliegue

Monitorea el progreso del despliegue:

```bash
kubectl get pods -n open5gs
```

Deberías ver varios pods para los diferentes componentes de Open5GS (AMF, SMF, UPF, etc.):

![Componentes desplegados](/docs/open5gs-deployment/screenshots/components-deployed.png)

Para verificar el estado general del despliegue:

```bash
kubectl get open5gsdeployments -n open5gs
```

El estado debería cambiar a "Ready" cuando todo esté correctamente desplegado:

![Despliegue listo](/docs/open5gs-deployment/screenshots/deployment-ready.png)

## Paso 5: Acceder a la Interfaz Web

Si has habilitado el WebUI en tu configuración, puedes acceder a él mediante port-forwarding:

```bash
kubectl port-forward svc/open5gs-demo-webui 3000:3000 -n open5gs
```

Ahora puedes acceder a la interfaz web en `http://localhost:3000`:

![Interfaz Web](/docs/open5gs-deployment/screenshots/webui.png)

Credenciales por defecto:
- Usuario: admin
- Contraseña: 1423

## Configuración Avanzada

Para configuraciones más avanzadas, consulta el archivo [deployment-values.yaml](/docs/open5gs-deployment/deployment-values.yaml) completo, que incluye opciones para:

- Configuración de alta disponibilidad
- Ajustes de red avanzados
- Integración con sistemas de monitorización
- Configuración de seguridad

## Próximos Pasos

Ahora que tienes tu despliegue básico de Open5GS, puedes:

1. [Configurar usuarios y suscriptores](/docs/open5gs-users/users)
2. Implementar un sistema de monitorización
3. Conectar dispositivos de prueba

## Solución de Problemas

Si encuentras problemas durante el despliegue, consulta los logs del operador:

```bash
kubectl logs -l app=open5gs-operator -n open5gs
```

Para problemas específicos de componentes, consulta los logs de ese pod:

```bash
kubectl logs open5gs-demo-amf-0 -n open5gs
```

<div class="navigation-buttons">
  <a href="/" class="button prev">Inicio</a>
  <a href="/docs/open5gs-users/users" class="button next">Siguiente: Gestión de Usuarios</a>
</div>