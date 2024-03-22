import { AgentType, GetReportsResponse, PlacemarkType } from "./reportsApi";

const baseApiPath = "/agent";

type GetAllAgentsResponse = {
  currentPage: number;
  list: AgentType[];
  totalPages: number;
  totalElements: number;
  filtered: boolean;
};

export type GetAgentReportsResponse = GetReportsResponse & {
  agent: AgentType;
};

export type GetAllAgentsFilters = {
  name?: string;
};

export const getAllAgents = ({
  pageNumber,
  pageSize,
  filters,
}: {
  pageNumber: number;
  pageSize: number;
  filters?: GetAllAgentsFilters;
}): Promise<GetAllAgentsResponse> => {
  return fetch(`${baseApiPath}/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
      filters,
    }),
  }).then((response) => response.json());
};

export const getAgentReports = ({
  pageNumber,
  pageSize,
  agentId,
}: {
  pageNumber: number;
  pageSize: number;
  agentId: string;
}): Promise<GetAgentReportsResponse> => {
  return fetch(`${baseApiPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageNumber,
      pageSize,
      agentId,
    }),
  }).then((response) => response.json());
};

export const getAgentReportsPlacemarks = (
  agentId: string
): Promise<PlacemarkType[]> => {
  return fetch(`${baseApiPath}/${agentId}/coords`).then((response) =>
    response.json()
  );
};
