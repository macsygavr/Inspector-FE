import React, { FC, useEffect, useState } from "react";
import ModalCloseIcon from "../../../../../assets/Icons/ModalCloseIcon";
import ProfileOnIcon from "../../../../../assets/Icons/ProfileOnIcon";
import Button from "../../../../UiKit/Button/Button";
import css from "../../../index.module.css";
import { getPhone, logout } from "../../../../../api/accountApi";
import { useProfileContext } from "../../../../../contexts/ProfileContext";
import { useQuery } from "react-query";

type Props = {
  onCancel: () => void;
};

const LogoutModal: FC<Props> = ({ onCancel }) => {
  const { setIsAuthorized } = useProfileContext();
  const [phone, setPhone] = useState("+7 --- --- -- --");

  const { data } = useQuery("userPhone", getPhone);

  useEffect(() => {
    if (data?.phone) {
      const phoneData = data.phone;
      setPhone(
        `+${phoneData?.[0]} ${phoneData?.[1]}${phoneData?.[2]}${phoneData?.[3]} ${phoneData?.[4]}${phoneData?.[5]}${phoneData?.[6]}-${phoneData?.[7]}${phoneData?.[8]}-${phoneData?.[9]}${phoneData?.[10]}`
      );
    }
  }, [data]);

  return (
    <>
      <div className={css.header}>
        <span>Профиль</span>
        <button className={css.closeIcon} onClick={onCancel}>
          <ModalCloseIcon />
        </button>
      </div>
      <div className={css.modalAuthorizedBodyContainer}>
        <div className={css.profileIconContainer}>
          <ProfileOnIcon />
        </div>
        <span className={css.phone}>{phone}</span>
      </div>
      <div className={css.footer}>
        <Button
          className={css.loginBtn}
          onClick={() => {
            logout().then((data) => {
              if (data === 200 && setIsAuthorized) {
                setIsAuthorized(false);
                onCancel();
              }
            });
          }}
          variant="primary"
        >
          Выйти
        </Button>
      </div>
    </>
  );
};

export default LogoutModal;
