const baseApiPath = "/contract";

export const sendCallMeRequest = (
  phone: string,
  locality?: string
): Promise<number | void> => {
  return fetch(`${baseApiPath}/callme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      locality,
    }),
  })
    .then((response) => response.status)
    .catch((err) => {
      console.log(err);
    });
};
