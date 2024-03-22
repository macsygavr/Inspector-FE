import React, { FC, useState } from "react";
import css from "./index.module.css";
import ReportBlock from "./components/ReportBlock/ReportBlock";
import ProgressBar, {
  ProgressLevel,
} from "./components/ProgressBar/ProgressBar";
import ReportTrueFalseRow from "./components/ReportTrueFalseRow/ReportTrueFalseRow";
import ReportInfrastructureRow from "./components/ReportInfrastructureRow/ReportInfrastructureRow";
import ReportLegalAspectsRow from "./components/ReportLegalAspectsRow/ReportLegalAspectsRow";
import AgeIcon from "../../../../assets/Icons/AgeIcon";
import ManInDoorIcon from "../../../../assets/Icons/ManInDoorIcon";
import RegistrationIcon from "../../../../assets/Icons/RegistrationIcon";
import MortgageIcon from "../../../../assets/Icons/MortgageIcon";
import DocumentIcon from "../../../../assets/Icons/DocumentIcon";
import Tag, { TagEnum } from "../../../../components/UiKit/Tag/Tag";
import {
  ApartDisadvantageType,
  BuildingDisadvantageType,
  ReportData,
} from "../../../../api/reportsApi";
import { getProgressBarLevel } from "./components/ReportTrueFalseRow/helpers";
import ProfileOffIcon from "../../../../assets/Icons/ProfileOffIcon";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../../../routes";

type Props = {
  report?: ReportData;
  skeletonMode?: boolean;
};

const Report: FC<Props> = ({ report, skeletonMode }) => {
  const [avatarError, setAvatarError] = useState(false);
  const router = useRouter();

  const apartDisadvantageCount = Object.keys(
    report?.ApartDisadvantage ?? {}
  ).reduce((acc, item) => {
    if (
      report?.ApartDisadvantage?.[item as keyof ApartDisadvantageType] === true
    ) {
      return (acc += 1);
    }
    return acc;
  }, 0);

  const buildingDisadvantageCount = Object.keys(
    report?.BuildingDisadvantage ?? {}
  ).reduce((acc, item) => {
    if (
      report?.BuildingDisadvantage?.[item as keyof BuildingDisadvantageType] ===
      true
    ) {
      return (acc += 1);
    }
    return acc;
  }, 0);

  const showTagsContainer =
    report?.bargaining ||
    buildingDisadvantageCount > 0 ||
    apartDisadvantageCount > 0;

  const handleAuthorClick = () => {
    router.push(PublicRoutes.AGENT.get(report?.Agent?.externalid ?? ""));
  };

  return (
    <>
      {!skeletonMode && (
        <div className={css.container}>
          <span className={css.title}>Отчет о проверке</span>
          {showTagsContainer && (
            <div className={css.tagsContainer}>
              {report?.bargaining && !report.sold && (
                <Tag className={css.tag} tag={TagEnum.ReadyToTrade} />
              )}
              {buildingDisadvantageCount > 0 && (
                <Tag
                  className={css.tag}
                  tag={TagEnum.ResidentialComplexProblem}
                  countInText={buildingDisadvantageCount}
                />
              )}
              {apartDisadvantageCount > 0 && (
                <Tag
                  className={css.tag}
                  tag={TagEnum.ApartmentProblem}
                  countInText={apartDisadvantageCount}
                />
              )}
            </div>
          )}
          <ReportBlock
            title="Вероятность сделки"
            withTooltip
            tooltipTitle={"Вероятность сделки"}
            tooltipContent={
              <>
                В своей работе используем и рекомендуем такие интервалы: <br />
                &nbsp;&nbsp;1. Зелёный сигнал - сделка состоится с высокой долей
                вероятности <br />
                &nbsp;&nbsp;2. Жёлтый сигнал - сделка скорее состоится, чем не
                состоится <br />
                &nbsp;&nbsp;3. Красный сигнал - сделка маловероятна <br />
              </>
            }
          >
            <ProgressBar
              level={
                !report?.probability && report?.probability !== 0
                  ? ProgressLevel.None
                  : report?.probability <= 33
                  ? ProgressLevel.Low
                  : report?.probability <= 66
                  ? ProgressLevel.Medium
                  : ProgressLevel.High
              }
              levelNumber={report?.probability}
            />
          </ReportBlock>
          <ReportBlock title="Юридические аспекты">
            <div className={css.legalAspectsContainer}>
              <ReportLegalAspectsRow
                icon={<AgeIcon />}
                title={"Возраст собственников"}
                value={report?.legal_aspects_age ?? "Не указано"}
                disabledText={!report?.legal_aspects_age}
              />
              <ReportLegalAspectsRow
                icon={<RegistrationIcon />}
                title={"Количество собственников"}
                value={
                  !report?.legal_aspects_count
                    ? "Не указано"
                    : report?.legal_aspects_count > 1
                    ? "Больше одного"
                    : "Один"
                }
                disabledText={!report?.legal_aspects_count}
              />
              <ReportLegalAspectsRow
                icon={<ManInDoorIcon />}
                title={"Постоянно зарегистрированные"}
                value={report?.legal_aspects_registered ?? "Не указано"}
                disabledText={!report?.legal_aspects_registered}
              />
              <ReportLegalAspectsRow
                icon={<MortgageIcon />}
                title={"Наличие ипотеки"}
                value={report?.legal_aspects_mortgage ?? "Не указано"}
                disabledText={!report?.legal_aspects_mortgage}
              />
              <ReportLegalAspectsRow
                icon={<DocumentIcon />}
                title={"Правоустанавливающие документы"}
                value={report?.legal_aspects_title_documents ?? "Не указано"}
                disabledText={!report?.legal_aspects_title_documents}
              />
            </div>
          </ReportBlock>
          <ReportBlock title="Проверка ЖК">
            <ReportTrueFalseRow
              title={"Проблемы с лифтами"}
              value={report?.BuildingDisadvantage?.elevator}
            />
            <ReportTrueFalseRow
              title={"Проблемы с фасадом"}
              value={report?.BuildingDisadvantage?.front}
            />
            <ReportTrueFalseRow
              title={"Проблемы с канализацией и водоснабжением"}
              value={report?.BuildingDisadvantage?.sawSupply}
            />
            <ReportTrueFalseRow
              title={"Проблемы с электрикой"}
              value={report?.BuildingDisadvantage?.electrician}
            />
            <ReportTrueFalseRow
              title={"Проблемы с парковкой"}
              value={report?.BuildingDisadvantage?.parking}
            />
            <ReportTrueFalseRow
              title={"Проблемы с придомовой территорией"}
              value={report?.BuildingDisadvantage?.territory}
            />
            <ReportTrueFalseRow
              title={"Проблемные жильцы"}
              value={report?.BuildingDisadvantage?.residents}
            />
          </ReportBlock>
          <ReportBlock title="Проверка квартиры">
            <ReportTrueFalseRow
              title={"Проблемы с канализацией и водоснабжением"}
              value={report?.ApartDisadvantage?.sawSupply}
            />
            <ReportTrueFalseRow
              title={"Проблемы с электрикой"}
              value={report?.ApartDisadvantage?.electrics}
            />
            <ReportTrueFalseRow
              title={"Проблемы с планировкой"}
              value={report?.ApartDisadvantage?.layout}
            />
            <ReportTrueFalseRow
              title={"Перепланировка не узаконена"}
              value={report?.ApartDisadvantage?.layoutNotLegalized}
            />
            <ReportTrueFalseRow
              title={"Требуется ремонт"}
              value={report?.ApartDisadvantage?.repairRequired}
            />
            <ReportTrueFalseRow
              title={"Проблемы с подъездом"}
              value={report?.ApartDisadvantage?.entrance}
            />
          </ReportBlock>
          <ReportBlock title="Инфраструктура">
            <ReportInfrastructureRow
              title={"Детская инфраструктура"}
              level={getProgressBarLevel(report?.infrastructure_childrens)}
              levelNumber={report?.infrastructure_childrens}
              tooltipTitle={"Детская инфраструктура"}
              tooltipContent={
                "Наличие детских площадок и центров, их качество и состояние."
              }
            />
            <ReportInfrastructureRow
              title={"Торговая инфраструктура"}
              level={getProgressBarLevel(report?.infrastructure_commerce)}
              levelNumber={report?.infrastructure_commerce}
              tooltipTitle={"Торговая инфраструктура"}
              tooltipContent={
                "Наличие ритейла и торговых центров в шаговой доступности."
              }
            />
            <ReportInfrastructureRow
              title={"Досуг"}
              level={getProgressBarLevel(report?.infrastructure_entertainment)}
              levelNumber={report?.infrastructure_entertainment}
              tooltipTitle={"Досуг"}
              tooltipContent={
                "Наличие развлекательных центров, парков и общественных пространств."
              }
            />
            <ReportInfrastructureRow
              title={"Безопасность"}
              level={getProgressBarLevel(report?.infrastructure_safety)}
              levelNumber={report?.infrastructure_safety}
              tooltipTitle={"Безопасность"}
              tooltipContent={
                "Наличие видеонаблюдения, пожарной системы безопасности, закрытой территории и охраны комплекса."
              }
            />
            <ReportInfrastructureRow
              title={"Транспортная доступность"}
              level={getProgressBarLevel(report?.infrastructure_transport)}
              levelNumber={report?.infrastructure_transport}
              tooltipTitle={"Транспортная доступность"}
              tooltipContent={
                "Наличие общественного транспорта и инфраструктуры для личного транспорта."
              }
            />
          </ReportBlock>
          <div className={css.authorContainer} onClick={handleAuthorClick}>
            <div className={css.authorAvatarContainer}>
              {!report?.Agent?.photo || avatarError ? (
                <ProfileOffIcon />
              ) : (
                <img
                  className={css.avatarImg}
                  src={report?.Agent?.photo}
                  onError={() => setAvatarError(true)}
                />
              )}
            </div>
            <div className={css.authorTextContainer}>
              <span className={css.authorTitle}>Автор отчета</span>
              <span className={css.authorName}>
                {report?.Agent?.name ?? "Не указано"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Report;
