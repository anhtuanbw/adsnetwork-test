import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="title"
            content="Stora - React Ecommerce Template with NextJs, AntDesign, ReactHooks"
          />
          <meta
            name="description"
            content="Stora - React Ecommerce Template with NextJs, AntDesign, ReactHooks"
          />
          <link rel="icon" href="/fav.png" />
          <link
            href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link href="/assets/css/elegant-icon.css" rel="stylesheet" />
          <link href="/assets/css/icomoon-icon.css" rel="stylesheet" />

          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="2USB4QpeS5bgMOr1XiRXaqCtc6u3Bhce";;analytics.SNIPPET_VERSION="4.15.3";
              analytics.load("2USB4QpeS5bgMOr1XiRXaqCtc6u3Bhce");
              analytics.page();
              }}();`,
            }}
          ></script> */}

          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
                process.env.NODE_ENV === "development"
                  ? "http://localhost:9081/aicactus-sdk.development.min.js"
                  : "https://cdn.aicactus.io/aicactus-sdk.min.js"
              }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load(function(){AicactusSDK.initialize({containerId:"1c8f8a44-1d08-46f1-8e99-1b1da65d3769@web", type: ["adnetwork"], debug: true}),AicactusSDK.callMethodsFromContainer()});`,
            }}
          ></script> */}

          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
                process.env.NODE_ENV === "development"
                  ? "http://localhost:9081/aicactus-sdk.development.min.js"
                  : "https://cdn.aicactus.io/aicactus-sdk.min.js"
              }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load( function(){AicactusSDK.initialize({containerId:"b8a3ccf2-5d49-4912-b2cc-87dc46e10277@web", type: ["adnetwork"], debug: true}),AicactusSDK.callMethodsFromContainer();
            });
            `,
            }}
          ></script> */}

          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
                process.env.NODE_ENV === "development"
                  ? "http://localhost:9081/aicactus-sdk.development.min.js"
                  : "https://cdn.aicactus.io/aicactus-sdk.min.js"
              }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load(function(){AicactusSDK.initialize({containerId:"1c8f8a44-1d08-46f1-8e99-1b1da65d3769@web", type: ["adnetwork"], debug: true}),AicactusSDK.callMethodsFromContainer()});`,
            }}
          ></script> */}

          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="2USB4QpeS5bgMOr1XiRXaqCtc6u3Bhce";;analytics.SNIPPET_VERSION="4.15.3";
              analytics.load("2USB4QpeS5bgMOr1XiRXaqCtc6u3Bhce");
              analytics.page();
              }}();`,
            }}
          ></script> */}
        </Head>
        <body>
          <Main />
          <div id="subpages-sidebar" />
          <NextScript />

          <script src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
          <script src="https://googleads.github.io/videojs-ima/node_modules/video.js/dist/video.min.js"></script>
          <script src="https://googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.min.js"></script>
          <script src="https://googleads.github.io/videojs-ima/dist/videojs.ima.js"></script>
          <script src="https://googleads.github.io/videojs-ima/node_modules/can-autoplay/build/can-autoplay.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
