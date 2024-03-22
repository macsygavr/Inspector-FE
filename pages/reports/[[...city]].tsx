import React, { FC } from "react";
import MainContainer from "../../src/components/MainContainer/MainContainer";
import AllReportsPage from "../../src/pages/AllReportsPage/AllReportsPage";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { YMaps } from "@pbe/react-yandex-maps";

export enum CitiesFromUrl {
  spb = "spb",
  rostov = "rostov",
  sochi = "sochi",
  kazan = "kazan",
  irkutsk = "irkutsk",
  habarovsk = "habarovsk",
}

type PageProps = {
  city?: string;
};

export const getServerSideProps: GetServerSideProps<{
  city?: string | string[];
}> = async (context) => ({ props: { city: context.query?.city?.[0] ?? "" } });

export const getCityForTitle = (city?: string) => {
  switch (city) {
    case CitiesFromUrl.spb:
      return "Санкт-Петербурге";

    case CitiesFromUrl.rostov:
      return "Ростове-на-Дону";

    case CitiesFromUrl.sochi:
      return "Сочи";

    case CitiesFromUrl.kazan:
      return "Казани";

    case CitiesFromUrl.irkutsk:
      return "Иркутске";

    case CitiesFromUrl.habarovsk:
      return "Хабаровске";

    default:
      return "Москве";
  }
};

const Page: FC<PageProps> = ({ city }) => {
  return (
    <MainContainer>
      <Head>
        <meta
          name="description"
          content={`Найдите проверенную квартиру в ${getCityForTitle(city)}`}
        />
        <meta
          property="og:title"
          content={`Инспектор - проверенные квартиры в ${getCityForTitle(
            city
          )}`}
        />
        <meta
          property="og:description"
          content={`Найдите проверенную квартиру в ${getCityForTitle(city)}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://revizor.estate/reports/${city}`}
        />
        <meta property="og:image" content="/preview.jpeg" />
        <title>{`Инспектор - проверенные квартиры в ${getCityForTitle(
          city
        )}`}</title>
      </Head>
      <YMaps>
        <AllReportsPage city={city} />
      </YMaps>
    </MainContainer>
  );
};

export default Page;
