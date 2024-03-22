import React, { FC } from "react";
import ReportPage from "../../src/pages/ReportPage/ReportPage";
import MainContainer from "../../src/components/MainContainer/MainContainer";
import Script from "next/script";
import { ImageType, ReportData } from "../../src/api/reportsApi";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { splitByThreeDigits } from "../../src/components/UiKit/InputRange/helpers";
import CustomErrorPage from "../../src/pages/CustomErrorPage/CustomErrorPage";

type PageProps = {
  data?: ReportData;
  error?: boolean;
  url?: string;
  price?: string;
  pricePerMeter?: string | null;
  imagesForCarousel?: ImageType[];
};

export const getServerSideProps: GetServerSideProps<{
  data?: ReportData;
  error?: boolean;
  url?: string;
  price?: string;
  pricePerMeter?: string | null;
  imagesForCarousel?: ImageType[];
}> = async (context) => {
  const res = await fetch(`http://inspector.estate:3434/offer/${context.params?.id}`);
  const data: ReportData = await res.json();
  if (!data) {
    return {
      props: { error: true },
    };
  }

  const price = splitByThreeDigits(String(data?.price ?? ""));

  const pricePerMeter = splitByThreeDigits(
    String(((data?.price ?? 0) / (data?.area ?? 0)).toFixed(0))
  );

  const facadeImages = data?.Images?.filter((item) => item.is_facade) ?? [];
  const yardImages = data?.Images?.filter((item) => item.is_yard) ?? [];
  const entranceImages = data?.Images?.filter((item) => item.is_entrance) ?? [];
  const layoutImages = data?.Images?.filter((item) => item.is_layout) ?? [];
  const otherImages = data?.Images?.filter(
    (item) =>
      !item.is_facade &&
      !item.is_yard &&
      !item.is_entrance &&
      !item.is_layout &&
      !item.is_preview
  );

  const sortedImages = [
    ...(facadeImages ?? []),
    ...(yardImages ?? []),
    ...(entranceImages ?? []),
    ...(layoutImages ?? []),
    ...(otherImages ?? []),
  ];

  return {
    props: {
      data,
      url: context.resolvedUrl,
      price: price,
      pricePerMeter:
        pricePerMeter === "NaN" || pricePerMeter === "Infinity"
          ? null
          : pricePerMeter,
      imagesForCarousel: sortedImages,
    },
  };
};

const Page: FC<PageProps> = ({
  data,
  url,
  error,
  price,
  pricePerMeter,
  imagesForCarousel,
}) => {
  const previewImage =
    data?.Images?.find((item) => item.is_preview)?.image ?? "";

  const title = `Продается ${
    data?.rooms
      ? `${data?.rooms}-комн. квартира`
      : data?.is_studio
      ? "студия"
      : "квартира"
  } за ${price ?? "-"} руб., ${data?.area ?? "-"} м.кв., этаж ${
    data?.floor ?? "-"
  }/${data?.floors_total ?? "-"}`;

  const description = data?.Location?.address
    ? `${data?.Location?.address}, ${
        data?.Location?.locality_name ? `${data?.Location?.locality_name}` : ""
      }`
    : data?.Location?.parsed_address
    ? `${data?.Location?.parsed_address ?? ""}, ${
        data?.Location?.locality_name ? `${data?.Location?.locality_name}` : ""
      }`
    : "";

  const metro = data?.Metros?.[0]?.station
    ? `м. ${data?.Metros?.[0]?.station}`
    : "";

  return (
    <MainContainer>
      {error ? (
        <CustomErrorPage
          customSubtitleText={
            "Объект, который вы запрашиваете, не существует. Возможно его удалили или был введен неверный адрес"
          }
          customBtnText={"Все объекты"}
          redirectToAllReports={true}
        />
      ) : (
        <>
          <Head>
            <meta name="description" content={`${description}, ${metro}`} />
            <meta property="og:title" content={title} />
            <meta
              property="og:description"
              content={`${description}, ${metro}`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://revizor.estate${url}`} />
            <meta
              property="og:image"
              content={
                previewImage
                  ? previewImage
                  : "https://revizor.estate/photoError.jpg"
              }
            />
            <title>
              {error
                ? "Что-то пошло не так"
                : `${title}, ${description}, ${metro}`}
            </title>
          </Head>
          <ReportPage
            ssrReport={data}
            price={price}
            pricePerMeter={pricePerMeter}
            imagesForCarousel={imagesForCarousel}
          />
          <Script
            src="https://api-maps.yandex.ru/2.1/?apikey=4ad680d8-822b-4ab4-be19-7c87909aeb6d&lang=ru_RU"
            type="text/javascript"
          />
        </>
      )}
    </MainContainer>
  );
};

export default Page;
