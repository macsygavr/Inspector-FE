import { useRouter } from "next/router";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { PublicRoutes } from "../routes";
import { getPhone } from "../api/accountApi";
import { useQuery } from "react-query";

interface ProfileContextInterface {
  isAuthorized?: boolean;
  userPhone?: string;
  setIsAuthorized?: (value: boolean) => void;
}

const ProfileContext = React.createContext<ProfileContextInterface>({});

const ProfileContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const router = useRouter();

  const { data, refetch } = useQuery("userPhone", getPhone, {
    refetchOnMount: "always",
  });

  useEffect(() => {
    // если есть сессия, то вернется телефон, если умерла - прийдет пустой объект, значит разлогиниваемся
    if (data?.phone) {
      setUserPhone(data?.phone);
      setIsAuthorized(true);
    } else {
      setUserPhone("");
      setIsAuthorized(false);
    }
  }, [data]);

  const handleSetIsAuthorized = (value: boolean) => {
    setIsAuthorized(value);
    refetch();
    if (
      value &&
      !router.route.includes("/report/") &&
      !router.route.includes("/agents/")
    ) {
      router.push(PublicRoutes.MY_REQUESTS.static);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        isAuthorized,
        userPhone,
        setIsAuthorized: handleSetIsAuthorized,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext: () => ProfileContextInterface = () =>
  React.useContext(ProfileContext);

export { useProfileContext };

export default ProfileContextProvider;
