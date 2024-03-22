const baseApiPath = "/user";

type PhoneResponse = {
  phone: string;
}

export const getSmsCode = (phone: string): Promise<number | void> => {
  return fetch(`${baseApiPath}/sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
    }),
  })
    .then((response) => response.status)
    .catch((err) => {
      console.log(err);
    });
};

export const checkSmsCode = (
  phone: string,
  code: string
): Promise<number | void> => {
  return fetch(`${baseApiPath}/smscode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, code }),
  })
    .then((response) => response.status)
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (): Promise<number | void> => {
  return fetch(`${baseApiPath}/logout`)
    .then((response) => response.status)
    .catch((err) => {
      console.log(err);
    });
};

export const getPhone = (): Promise<PhoneResponse | void> => {
  return fetch(`${baseApiPath}/phone`)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};
