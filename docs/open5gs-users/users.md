---
layout: default
title: Create Open5GS Users
description: Aprende a gestionar usuarios en tu implementación de Open5GS
---

# Crear Usuarios en Open5GS

Esta guía te enseñará a crear y gestionar usuarios en tu implementación de Open5GS utilizando el operador.

## Prerrequisitos

- Un despliegue funcional de Open5GS (sigue primero [esta guía](/docs/open5gs-deployment/deployment))
- kubectl configurado para acceder a tu clúster

## Conceptos Básicos

En redes 5G, los usuarios se denominan "suscriptores" y se identifican principalmente mediante:

- **IMSI (International Mobile Subscriber Identity)**: Identificador único global
- **Ki (Key Identifier)**: Clave de autenticación secreta
- **OPc**: Valor derivado para mejorar la seguridad

## Paso 1: Crear un Archivo de Definición de Usuario

Crea un archivo llamado `subscriber.yaml` con la siguiente configuración (también disponible en [users-values.yaml](/docs/open5gs-users/users-values.yaml)):

```yaml
apiVersion: open5gs.org/v1alpha1
kind: Subscriber
metadata:
  name: test-user-1
  namespace: open5gs
spec:
  imsi: "208930000000001"
  plmnID: "20893"
  # Los siguientes valores deben mantenerse seguros en un entorno de producción
  authenticationKey: "465B5CE8B199B49FAA5F0A2EE238A6BC"
  opc: "E8ED289DEBA952E4283B54E88E6183CA"
  # Información adicional del suscriptor
  ueAmbr:
    uplink: "100 Mbps"
    downlink: "500 Mbps"
  sliceConfigurations:
    - sst: 1  # Slice Service Type
      sd: "000001"  # Slice Differentiator
      default: true
      sessionAmbr:
        uplink: "50 Mbps"
        downlink: "250 Mbps"
  # Referencia al despliegue de Open5GS
  deploymentRef:
    name: open5gs-demo
```

<div class="code-copy-button" data-target="subscriber-yaml">Copiar Código</div>

## Paso 2: Aplicar la Configuración

Aplica el archivo de configuración para crear tu suscriptor:

```bash
kubectl apply -f subscriber.yaml
```

El operador detectará este recurso y añadirá el suscriptor a la base de datos de Open5GS.

## Paso 3: Verificar la Creación del Usuario

Puedes verificar que el suscriptor se ha creado correctamente consultando el recurso:

```bash
kubectl get subscribers -n open5gs
```

Deberías ver tu suscriptor con estado "Provisioned":

![Suscriptor creado](/docs/open5gs-users/screenshots/subscriber-created.png)

También puedes verificar a través de la interfaz web navegando a la sección "Subscribers":

![Suscriptor en WebUI](/docs/open5gs-users/screenshots/subscriber-webui.png)

## Paso 4: Crear Múltiples Usuarios

Para crear múltiples usuarios, puedes usar un script o aplicar varios archivos YAML. Aquí hay un ejemplo de cómo crear varios suscriptores utilizando un script bash:

```bash
#!/bin/bash

# Número de usuarios a crear
NUM_USERS=10

# PLMN ID base
PLMN="20893"

for i in $(seq 1 $NUM_USERS); do
  # Crear IMSI único (rellenar con ceros)
  IMSI_SUFFIX=$(printf "%010d" $i)
  IMSI="${PLMN}${IMSI_SUFFIX}"
  
  # Generar claves aleatorias (en un entorno real, utilizarías un método más seguro)
  KEY=$(openssl rand -hex 16 | tr '[:lower:]' '[:upper:]')
  OPC=$(openssl rand -hex 16 | tr '[:lower:]' '[:upper:]')
  
  # Crear el archivo YAML
  cat > subscriber-${i}.yaml << EOF
apiVersion: open5gs.org/v1alpha1
kind: Subscriber
metadata:
  name: user-${i}
  namespace: open5gs
spec:
  imsi: "${IMSI}"
  plmnID: "${PLMN}"
  authenticationKey: "${KEY}"
  opc: "${OPC}"
  ueAmbr:
    uplink: "100 Mbps"
    downlink: "500 Mbps"
  sliceConfigurations:
    - sst: 1
      sd: "000001"
      default: true
      sessionAmbr:
        uplink: "50 Mbps"
        downlink: "250 Mbps"
  deploymentRef:
    name: open5gs-demo
EOF

  # Aplicar el archivo
  kubectl apply -f subscriber-${i}.yaml
  echo "Created subscriber user-${i} with IMSI ${IMSI}"
done
```

<div class="code-copy-button" data-target="batch-script">Copiar Código</div>

## Paso 5: Modificar un Usuario Existente

Para modificar un usuario existente, simplemente actualiza el archivo YAML y vuelve a aplicarlo:

```bash
# Editar el archivo
vim subscriber.yaml

# Aplicar los cambios
kubectl apply -f subscriber.yaml
```

El operador detectará los cambios y actualizará el suscriptor en la base de datos.

## Paso 6: Eliminar un Usuario

Para eliminar un usuario, utiliza el comando delete:

```bash
kubectl delete subscriber test-user-1 -n open5gs
```

## Parámetros Avanzados

Consulta el archivo [users-values.yaml](/docs/open5gs-users/users-values.yaml) completo para ver todos los parámetros disponibles, que incluyen:

- Configuraciones de APN
- Parámetros de QoS
- Configuración de múltiples slices
- Perfiles de suscriptor personalizados

![Configuración avanzada](/docs/open5gs-users/screenshots/advanced-config.png)

## Automatización de la Gestión de Usuarios

Para entornos de producción, considera utilizar:

- **Operador de Kubernetes personalizado**: Automatiza la gestión de suscriptores basado en reglas
- **API REST**: Interactúa con la API de Open5GS directamente
- **CI/CD**: Integra la gestión de suscriptores en tus pipelines

## Solución de Problemas

Si un suscriptor no se crea correctamente, comprueba:

1. Los logs del operador:
```bash
kubectl logs -l app=open5gs-operator -n open5gs
```

2. El estado detallado del recurso:
```bash
kubectl describe subscriber test-user-1 -n open5gs
```

<div class="navigation-buttons">
  <a href="/docs/open5gs-deployment/deployment" class="button prev">Anterior: Despliegue</a>
  <a href="/tutorials" class="button next">Siguiente: Más Tutoriales</a>
</div>