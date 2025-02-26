---
title: "Open5GS Kubernetes Operator"
---

# Open5GS Kubernetes Operator

The **Open5GS Kubernetes Operator** is a custom Kubernetes operator designed to automate the deployment, configuration, and lifecycle management of Open5GS and its subscribers in a declarative manner. It uses two Custom Resource Definitions (CRDs): one to manage Open5GS deployments and another for user management.

## What does it do?

- **Deployment and reconfiguration:** Automates the deployment and reconfiguration of Open5GS instances in a cluster, ensuring that the actual state matches the desired state.
- **Multi-namespace support:** Allows managing multiple deployments in different namespaces or even multiple deployments in the same namespace.
- **User management:** Facilitates subscriber management, distinguishing between **Managed Users** (defined in a CR) and **Unmanaged Users** (created externally).

## Documentation Sections

- [Simple Deployment](docs/simple-deployment/simple-deployment.md)  
  A guide to setting up a basic deployment of Open5GS using the operator.

- [Installation Options](docs/installation-options/instalation-options.md)  
  Learn about the various installation methods available, including using Helm and direct Kubernetes manifests.

- [Complete Demo with UERANSIM](docs/complete-demo-ueransim/complete-demo-ueransim.md)  
  A comprehensive demonstration of deploying the operator with a UERANSIM setup for testing connectivity.

---