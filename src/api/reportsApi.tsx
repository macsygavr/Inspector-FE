import { FiltersFormValues } from "../pages/AllReportsPage/components/Filters/Filters";

const baseApiPath = "/offer";

export type ImageType = {
  image: string;
  is_layout: boolean;
  is_facade: boolean;
  is_yard: boolean;
  is_entrance: boolean;
  is_preview: boolean;
};

type LocationFullType = {
  country?: string;
  region?: string;
  locality_name?: string;
  address?: string;
  parsed_address?: string;
  apartment?: number;
  latitude?: number;
  longitude?: number;
};

type LocationType = {
  latitude?: number;
  longitude?: number;
};

export type AgentType = {
  name?: string;
  phone?: string;
  email?: string;
  photo?: string;
  externalid?: string;
};

export type ApartDisadvantageType = {
  sawSupply: boolean;
  electrics: boolean;
  layout: boolean;
  layoutNotLegalized: boolean;
  repairRequired: boolean;
  entrance: boolean;
};

export type BuildingDisadvantageType = {
  sawSupply: boolean;
  elevator: boolean;
  front: boolean;
  electrician: boolean;
  parking: boolean;
  territory: boolean;
  residents: boolean;
};

type MetroType = {
  station?: string;
  color?: string;
  foot_time?: string | null;
  transport_time?: string | null;
};

export type ReportData = {
  id?: number;
  is_studio?: boolean;
  agentId?: number;
  lot_number?: number;
  categoryId?: number;
  cadastral_number?: number;
  locationId?: number;
  sales_agentId?: number;
  price?: number;
  renovationId?: number;
  qualityId?: number;
  description?: string;
  area?: number;
  living_space?: number;
  kitchen_space?: number;
  rooms?: number;
  rooms_type?: number;
  deal_statusId?: number;
  haggle?: null;
  mortgage?: null;
  bathroom_unit?: false;
  floor?: number;
  floors_total?: number;
  window_view?: number;
  balcony?: boolean;
  building_typeId?: number;
  built_year?: number;
  ceiling_height?: number;
  guarded_building?: null;
  access_control_system?: null;
  lift?: boolean;
  parking?: boolean;
  parking_places?: number;
  parking_place_price?: number;
  parking_guest?: null;
  flat_alarm?: null;
  security?: null;
  is_elite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  Images?: ImageType[];
  Location?: LocationFullType;
  legal_aspects_count?: number;
  legal_aspects_registered?: string;
  legal_aspects_title_documents?: string;
  legal_aspects_mortgage?: string;
  legal_aspects_age?: string;
  probability?: number;
  bargaining?: boolean;
  infrastructure_childrens?: number;
  infrastructure_commerce?: number;
  infrastructure_entertainment?: number;
  infrastructure_safety?: number;
  infrastructure_transport?: number;
  Agent?: AgentType;
  ApartDisadvantage?: ApartDisadvantageType;
  BuildingDisadvantage?: BuildingDisadvantageType;
  Metros?: MetroType[];
  sold?: boolean;
};

export type PlacemarkType = {
  Location?: LocationType;
  id?: number;
  price?: number;
};

export type GetReportsResponse = {
  currentPage: number;
  list: ReportData[];
  totalPages: number;
  totalElements: number;
  filtered: boolean;
};

export type SliderValues = {
  cost?: {
    from: number;
    to: number;
  };
  square?: {
    from: number;
    to: number;
  };
  ceilingHeight?: {
    from: number;
    to: number;
  };
  floor?: {
    from: number;
    to: number;
  };
  year?: {
    from: number;
    to: number;
  };
  totalFloors?: {
    from: number;
    to: number;
  };
};

export const getReports = ({
  pageNumber,
  pageSize,
  filters,
}: {
  pageNumber: number;
  pageSize: number;
  filters?: Omit<FiltersFormValues, "roomsCount">;
}): Promise<GetReportsResponse> => {
  return fetch(`${baseApiPath}`, {
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

export const getReportById = (id: string): Promise<ReportData> => {
  return fetch(`${baseApiPath}/${id}`).then((response) => response.json());
};

export const getSliderValues = (): Promise<SliderValues> => {
  return fetch(`${baseApiPath}/filters`)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getAllReportsPlacemarks = ({
  filters,
}: {
  filters?: Omit<FiltersFormValues, "roomsCount">;
}): Promise<PlacemarkType[]> => {
  return fetch(`${baseApiPath}/coords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters,
    }),
  }).then((response) => response.json());
};
