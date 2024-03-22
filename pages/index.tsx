import { FC } from "react";
import MainContainer from "../src/components/MainContainer/MainContainer";
import MainPage from "../src/pages/MainPage/MainPage";
import Head from "next/head";

const Index: FC = () => (
  <MainContainer>
    <Head>
      <meta
        name="description"
        content="Узнайте о потенциальных рисках до сделки не выходя из дома. Доверьте команде Инспектора проверку интересующей вас квартиры. "
      />
      <meta
        property="og:title"
        content="Инспектор – сервис по проверке жилой недвижимости. "
      />
      <meta
        property="og:description"
        content="Узнайте о потенциальных рисках до сделки не выходя из дома. Доверьте команде Инспектора проверку интересующей вас квартиры. "
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://revizor.estate" />
      <meta property="og:image" content="/preview.jpeg" />
      <title>
        Инспектор. Недвижимость — проверенные квартиры. Сервис проверки
        недвижимости онлайн. Бесплатно!
      </title>
    </Head>
    <MainPage />
  </MainContainer>
);

export default Index;
