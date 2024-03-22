/**
 * Описание объекта
 * @param static - Статичный url адрес который нужен для компонента <Route path={} />.
 * @param dynamic - URl для страниц с динамическим роутингом, или плавающими аргументами, нужен для правильного открытия страниц
 * @param get - функция для выдачи URL
 */

export const PublicRoutes = {
  MAIN: {
    static: "/",
  },
  ALL_REPORTS: {
    static: "/reports",
    dynamic: "/reports/:city",
    get: (city : string) => {
      return `/reports/${city}`
    }
  },
  MY_REQUESTS: {
    static: "/requests",
  },
  REPORT: {
    dynamic: "/report/:reportId",
    get: (reportId: string) => {
      return `/report/${reportId}`;
    },
  },
  ALL_AGENTS: {
    static: "/agents",
  },
  AGENT: {
    dynamic: "/agents/:agentId",
    get: (agentId: string) => {
      return `/agents/${agentId}`;
    },
  },
};
