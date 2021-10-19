const WorkboxPlugin = require("workbox-webpack-plugin");
const generateSitemap = require("./scripts/sitemap");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const baseUrl = "https://seattlepar3.com";

const sitemapDest = path.resolve(".next/static");
const skipIndex = ["/profile", "/caddy", "/proshop"];

const serviceWorkerPath = "static/sw.js";
const serviceWorkerUrl = `/_next/${serviceWorkerPath}`;
const serviceWorkerDest = `.next/${serviceWorkerPath}`;

const { withSentryConfig } = require("@sentry/nextjs");

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const moduleExports = {
  // module.exports = {
  reactStrictMode: true,
  env: {
    serviceWorkerUrl,
  },
  pageExtensions: ["ts", "tsx", "js"],
  webpack: (config, { isServer, dev, webpack, buildId }) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        loader: "@svgr/webpack",
      },
      {
        test: /\.html$/,
        loader: "raw-loader",
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      }
    );

    if (isServer && !dev) {
      generateSitemap(
        {
          baseUrl,
          skipIndex,
        },
        sitemapDest
      );
    }

    if (!isServer) {
      const additionalManifestEntries = fs
        .readdirSync("public", { withFileTypes: true })
        /*
         * Add the public files to precache-manifest entries.
         *
         * We're creating an MD5 hash from file contents
         * to know if they've changed, so that the service worker
         * would know to recache them if they have.
         */
        .reduce((manifest, file) => {
          const { name } = file;

          // Filter out directories and hidden files.
          if (!file.isFile() || name.startsWith(".")) {
            return manifest;
          }

          return [
            ...manifest,
            {
              url: `/${name}`,
              revision: crypto
                .createHash("md5")
                .update(Buffer.from(fs.readFileSync(`public/${name}`)))
                .digest("hex"),
            },
          ];
        }, []);

      /*
       * In development mode pre-cache files up-to 5MB
       */
      const maximumFileSizeToCacheInBytes = dev ? 25000000 : undefined;

      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: path.resolve("src", "sw", "index.ts"),
          swDest: path.resolve(serviceWorkerDest),
          dontCacheBustURLsMatching: /^\/_next\/static\//,
          maximumFileSizeToCacheInBytes,
          additionalManifestEntries,
          webpackCompilationPlugins: [
            new webpack.DefinePlugin({
              "self.__BUILD_ID": JSON.stringify(buildId),
            }),
          ],
          exclude: [
            /*
             * Filter out our API route,
             * we need this here because our api is a NextJS page,
             * and is treated as a static endpoint.
             */
            /\/api\//i,
            /^build-manifest\.json$/i,
            /^react-loadable-manifest\.json$/i,
            /\/react-refresh\.js$/i,
            /\/_error\.js$/i,
            /\.js\.map$/i,
            /*
             * Since we're using variable fonts
             * we don't want to pre-cache any,
             * otherwise we're downloading both
             * variable & regular fonts.
             */
            /\.(ttf|woff)/i,
          ],
          modifyURLPrefix: {
            "static/": "/_next/static/",
          },
        })
      );
    }

    return config;
  },
  headers: () => [
    {
      /*
       * Since we're outputing service worker
       * with static files in /_next/static directory
       * we have to return the service worker file with an additional header
       * so that the browser would know that it's safe to run it on the root scope.
       */
      source: serviceWorkerUrl,
      headers: [
        {
          key: "service-worker-allowed",
          value: "/",
        },
      ],
    },
  ],
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
