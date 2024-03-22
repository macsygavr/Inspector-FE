const baseApiPath = "/request";

type SendRequestResponse = {
  error?: number;
  object_id?: number;
  popup: { header: string; text: string };
};

export type RequestRowTypeResponse = {
  createdAt: string;
  id: number;
  offer_id: number | null;
  status: number;
  updatedAt: string;
  user_id: number;
  user_link: string;
  reason: string;
};

export const sendRequest = (reqLink: string): Promise<SendRequestResponse> => {
  return fetch(`${baseApiPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reqLink,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getAllRequests = (): Promise<RequestRowTypeResponse[]> => {
  return fetch(`${baseApiPath}/all`)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

