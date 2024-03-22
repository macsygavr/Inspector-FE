import React, { FC } from "react";
import Head from "next/head";
import MainContainer from "../../src/components/MainContainer/MainContainer";
import AgentPage from "../../src/pages/AgentPage/AgentPage";
import { GetServerSideProps } from "next";
import CustomErrorPage from "../../src/pages/CustomErrorPage/CustomErrorPage";
import { GetAgentReportsResponse } from "../../src/api/agentsApi";
import { YMaps } from "@pbe/react-yandex-maps";

type PageProps = {
  data?: GetAgentReportsResponse;
  error?: boolean;
};

export const getServerSideProps: GetServerSideProps<{
  data?: GetAgentReportsResponse;
  error?: boolean;
}> = async (context) => {
  const res = await fetch("http://inspector.estate:3434/agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageNumber: 0,
      pageSize: 1,
      agentId: context.params?.id,
    }),
  });

  const data: GetAgentReportsResponse = await res.json();

  return { props: { data } };
};

const Page: FC<PageProps> = ({ data }) => {
  return (
    <MainContainer>
      {!data?.agent ? (
        <CustomErrorPage
          customSubtitleText={"Агента, которого вы запрашиваете, не существует"}
          customBtnText={"Наши агенты"}
          redirectToAllAgents={true}
        />
      ) : (
        <>
          <Head>
            <meta
              name="description"
              content="Узнайте о потенциальных рисках до сделки не выходя из дома. Доверьте команде Инспектора проверку интересующей вас квартиры. "
            />
            <meta
              property="og:title"
              content={`${data?.agent?.name ?? ""} - ${
                data?.totalElements ?? 0
              } проверенных объектов`}
            />
            <meta
              property="og:description"
              content="Выбирайте лучшего инспектора!"
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`https://revizor.estate/agents/${data?.agent?.externalid}`}
            />
            <title>{`${data?.agent?.name ?? ""} - ${
              data?.totalElements ?? 0
            } проверенных объектов`}</title>
          </Head>
          <YMaps>
            <AgentPage />
          </YMaps>
        </>
      )}
    </MainContainer>
  );
};

export default Page;
