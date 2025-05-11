# Cardio Monitor - IoT

Projeto da disciplina SSC5972 - Internet das Coisas 2025/1.

## Pre-requisítos

- Docker version 28+
- Docker Compose version 2.36+
- OpenSSL 3.5.0+

## Setup Inicial

### 1. Gerar certificados (somente primeira vez)

```sh
chmod +x ./scripts/setup_certs.sh
./scripts/setup_certs.sh
```

_Preencha com os valores que julgar mais apropriados._

### 2. Subir o servidor do RabbitMQ Localmente (somente primeira vez)

```sh
docker compose up --build rabbitmq
```

### 3. Habilitar o plugin do MQTT 5.0 (somente primeira vez)

```sh
chmod +x ./scripts/setup_mqtt5.sh
./scripts/setup_mqtt5.sh
```

## Executando o Servidor

Após o [Setup Inicial](#setup-inicial), basta rodar o comando abaixo para executar o servidor e todas as suas dependencias:

```sh
docker compose up --build
```
