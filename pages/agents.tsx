import React from "react";
import MainContainer from "../src/components/MainContainer/MainContainer";
import Head from "next/head";
import AllAgentsPage from "../src/pages/AllAgentsPage/AllAgentsPage";

const Page = () => {
  return (
    <MainContainer>
      <Head>
        <meta
          name="description"
          content="Узнайте о потенциальных рисках до сделки не выходя из дома. Доверьте команде Инспектора проверку интересующей вас квартиры. "
        />
        <meta
          property="og:title"
          content="Наши инспекторы - проверки недвижимости в России"
        />
        <meta property="og:description" content="Найдите лучшего инспектора!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://revizor.estate/agents" />
        <title>Наши инспекторы - проверки недвижимости в России</title>
      </Head>
      <AllAgentsPage />
    </MainContainer>
  );
};

export default Page;
