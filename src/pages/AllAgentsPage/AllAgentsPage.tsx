import React, { FC, useEffect, useState } from "react";
import css from "./index.module.css";
import AgentCard from "./components/AgentCard/AgentCard";
import Pagination from "../../components/UiKit/Pagination/Pagination";
import InputField from "../../components/UiKit/InputField/InputField";
import Button from "../../components/UiKit/Button/Button";
import { useQuery } from "react-query";
import { getAllAgents } from "../../api/agentsApi";
import { AgentType } from "../../api/reportsApi";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const AllAgentsPage: FC = () => {
  const [hasError, setHasError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [allAgents, setAllAgents] = useState<AgentType[]>([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const pageSize = 12;

  const {
    data: allAgentsData,
    error,
    refetch,
  } = useQuery("allAllAgentsData", () =>
    getAllAgents({
      pageNumber: pageNumber - 1,
      pageSize,
      filters: {
        name,
      },
    })
  );

  useEffect(() => {
    if (allAgentsData) {
      setAllAgents(allAgentsData?.list ?? []);
      setTotal(allAgentsData?.totalElements ?? 0);
    }
    if (error) {
      setHasError(true);
    }
  }, [allAgentsData, error]);

  useEffect(() => {
    refetch();
  }, [pageNumber]);

  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <span className={css.title}>Наши инспекторы</span>
      </div>
      <div className={css.filters}>
        <div className={css.inputsContainer}>
          {/* TODO: вернуть кгда появятся данные об офисе */}
          {/* <div className={css.inputContainer}>
            <InputDropDown placeholder={"Все офисы"} options={options} />
          </div> */}
          <div className={css.inputContainer}>
            <InputField
              placeholder={"Поиск"}
              className={css.searchInput}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button
            className={css.button}
            variant="primary"
            onClick={() => {
              pageNumber === 1 ? refetch() : setPageNumber(1);
            }}
          >
            Найти
          </Button>
        </div>
      </div>
      {hasError ? (
        <ErrorMessage />
      ) : (
        <div className={css.agentCardsContainer}>
          {allAgents.map((item) => (
            <AgentCard key={item.externalid} agent={item} />
          ))}
        </div>
      )}
      {!hasError && total > 0 && (
        <Pagination
          total={total}
          showSizeChanger={false}
          current={pageNumber}
          pageSize={pageSize}
          onChange={(page) => {
            setPageNumber(page);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      )}
    </div>
  );
};

export default AllAgentsPage;
