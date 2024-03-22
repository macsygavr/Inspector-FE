import Head from "next/head";
import ProfileContextProvider from "../src/contexts/ProfileContext";
import { GeneralErrorBoundary } from "../src/components/GeneralErrorBoundary";
import "../src/global.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 20_000,
      refetchOnWindowFocus: false,
      cacheTime: 20_000,
    },
  },
});

const AppLayout = ({ Component, pageProps }) => (
  <>
    <GeneralErrorBoundary>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
        <script type="text/javascript">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(94852163, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
            });`}
        </script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/94852163"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ProfileContextProvider>
          <Component {...pageProps} />
        </ProfileContextProvider>
      </QueryClientProvider>
    </GeneralErrorBoundary>
  </>
);

export default AppLayout;
