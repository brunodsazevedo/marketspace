<h1 align="center">
  <img
    alt="Marketspace"
    height="240"
    title="Marketspace"
    src=".github/assets/logo.png"
  />
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=16a34a&labelColor=0A1033">
  <img src="https://img.shields.io/static/v1?label=Ignite&message=ReactNative&color=16a34a&labelColor=0A1033" />
  <img src="https://img.shields.io/static/v1?label=Expo&message=51.0.9&color=16a34a&labelColor=0A1033" />
  <img src="https://img.shields.io/static/v1?label=ReactNative&message=0.74.1&color=16a34a&labelColor=0A1033" />
  <img src="https://img.shields.io/static/v1?label=NativeWind&message=2.0.11&color=16a34a&labelColor=0A1033" />
  <img src="https://img.shields.io/static/v1?label=ReactQuery&message=5.37.1&color=16a34a&labelColor=0A1033" />
</p>

<p align="center">
  [README EM VERSÃO INGLÊS](README.md)
</p>

## 💻 Projeto

Marketspace é uma aplicação mobile para compra e venda de itens novos e usados.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [x] Expo
- [x] React Native
- [x] TypeScript
- [x] Axios
- [x] NativeWind
- [x] React Native Async Storage
- [x] React Query
- [x] Expo Router
- [x] React Native Gesture Handler
- [x] React Native Reanimated
- [x] Yup

## 📋 Pré-requisitos

- [x] NodeJS >= 20.0
- [x] yarn
- [x] Android Studio (Opcional)
- [x] Xcode (apenas em macOS - opcional)

## ⚙️ Executando o projeto

1. **Instale as dependências do projeto utilizando `yarn`**
    ```bash
    yarn
    ```

2. **Configure a API local**

   OBS: A aplicação consome uma REST API para operações como sign in, sign up, cadastro de produtos, listagem de produtos, etc. No momento, a API backend não está hospedada. Para usar a aplicação localmente, baixe e utilize [este repositório](https://github.com/brunodsazevedo/marketspace-api).

3. **Ajuste a base URL do axios**

   Antes de executar e abrir a aplicação, se você estiver executando a API localmente, será necessário ajustar a base URL da configuração axios de acordo com seu IP.

   **Em sistemas Linux:**
    ```bash
    ip a
    ```
   Procure pela interface de rede que você está utilizando (geralmente `eth0` para conexões com fio e `wlan0` ou `wlp2s0` para conexões sem fio). O endereço IP será listado sob **inet**.

   **Em sistemas Windows:**
    ```bash
    ipconfig
    ```
   Procure pela conexão de rede ativa (`Ethernet adapter` para conexões com fio ou `Wireless LAN adapter` para conexões sem fio). O endereço IP estará listado como "IPv4 Address".

   **Em sistemas macOS:**
    ```bash
    ifconfig
    ```
   Procure pela interface de rede que você está utilizando (`en0` para conexões com fio e `en1` ou `en0` para conexões sem fio). O endereço IP será listado sob **inet**.

4. **Atualize a configuração do axios**

   Abra o arquivo `src/services/api/api-config.ts` e atualize a base URL na linha 19 com o seu IP adquirido nos comandos sugeridos acima:
    ```typescript
    const api = axios.create({
      // Insira seu IP aqui
      baseURL: 'http://192.168.1.130:3333',
    }) as ApiInstanceProps
    ```

5. **Execute a aplicação**
    ```bash
    npx expo start
    ```

   Se tudo estiver configurado corretamente, você verá uma tela assim em seu terminal:
   <img
    alt="Terminal Expo"
    title="Terminal Expo"
    src=".github/assets/expo-terminal-example.png"
  />

6. **Abrindo a aplicação**

   - **Dispositivo Físico:** Se você tiver o app Expo Go no seu dispositivo (Android ou iPhone), escaneie o QR Code para abrir o app.
   - **Emulador:** Para abrir no emulador, pressione a tecla correspondente ao emulador que você deseja abrir ("a" para Android, e "i" para iOS).

---
