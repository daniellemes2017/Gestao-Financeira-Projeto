/* eslint-env node */

/*
 * Este arquivo roda no contexto do Node.js, portanto, utilize apenas
 * recursos do ES6 compatíveis com sua versão do Node.js: https://node.green/
 */

// Configuração do seu app com Quasar CLI e Webpack
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const { configure } = require("quasar/wrappers");
const path = require("path"); // Importa o módulo 'path' para trabalhar com caminhos de arquivos

module.exports = configure(function (/* ctx */) {
  return {
    // Arquivos de Boot (/src/boot)
    // --> arquivos de boot são parte de "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ["axios"],

    // CSS global do projeto
    css: ["app.scss"],

    // Extras (fontes, ícones, etc)
    extras: ["roboto-font", "material-icons"],

    // Configuração do Webpack para build
    build: {
      vueRouterMode: "history", // Opções: 'hash' ou 'history'
      // Você pode personalizar a configuração do Webpack usando a função abaixo
      chainWebpack(chain) {
        // Exemplo: Adicionando aliases
        chain.resolve.alias.set("@", path.resolve(__dirname, "./src")); // Aqui usamos o módulo 'path'
      },
    },

    // Configurações do DevServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // abre automaticamente no navegador
    },

    // Configuração do framework Quasar
    framework: {
      config: {
        brand: {
          primary: "#1399CF", // Azul para combinar com o tema escuro
          secondary: "#00f2fe", // Azul claro, mais suave
          accent: "#1e88e5", // Pode ser usado para botões em destaque
          dark: "#181f36", // Cor de fundo do tema escuro

          positive: "#8ED943",
          negative: "#F20707",
        },
      },
      plugins: [
        "Notify", // Adicione aqui todos os plugins que deseja usar
        "Dialog",
      ],
    },

    // Animações (você pode incluir todas ou apenas específicas)
    animations: [],

    // Configuração para SSR (opcional, se não usar SSR, ignore)
    ssr: {
      pwa: false,
    },

    // Configuração para PWA (opcional)
    pwa: {
      workboxMode: "generateSW", // ou 'injectManifest'
      manifest: {
        name: `Projeto de Finanças`,
        short_name: `Finanças`,
        description: `Um sistema de gestão financeira simples.`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
        ],
      },
    },

    // Configuração para Capacitor (se for usar)
    capacitor: {
      hideSplashscreen: true,
    },

    // Configuração para Electron (se for usar)
    electron: {
      bundler: "packager", // ou 'builder'
      packager: {},
      builder: {
        appId: "projeto-de-financas",
      },
      nodeIntegration: true,
    },
  };
});
