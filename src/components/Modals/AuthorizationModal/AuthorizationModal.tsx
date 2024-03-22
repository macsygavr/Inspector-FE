import React, { FC, useState } from "react";
import css from "../index.module.css";
import { Modal, ModalProps } from "antd";
import { Form } from "react-final-form";
import LogoutModal from "./components/LogoutModal/LogoutModal";
import LoginPhoneModal from "./components/LoginPhoneModal/LoginPhoneModal";
import LoginCodeModal from "./components/LoginCodeModal/LoginCodeModal";
import cn from "classnames";
import { useProfileContext } from "../../../contexts/ProfileContext";
import { checkSmsCode, getPhone, getSmsCode } from "../../../api/accountApi";
import { useQuery } from "react-query";
import { getAllRequests } from "../../../api/requestApi";
import MakeRequestModal from "../MakeRequestModal/MakeRequestModal";
import ContactModal from "../ContactModal/ContactModal";

export enum AuthorizationModalTypeEnum {
  Logout = "Logout",
  LoginPhone = "LoginPhone",
  LoginCode = "LoginCode",
  MakeRequest = "MakeRequest",
  CallMe = "CallMe",
}

export type FormValues = {
  phone: string;
  code: string;
};

type Props = {
  onCancel: () => void;
  action?: "makeRequest" | "callMe";
} & ModalProps;

const AuthorizationModal: FC<Props> = ({ onCancel, action, ...props }) => {
  const { isAuthorized, setIsAuthorized } = useProfileContext();
  const [isFetching, setIsFetching] = useState(false);

  const { refetch: refetchAllRequests } = useQuery(
    "allRequests",
    getAllRequests,
    {
      enabled: false,
    }
  );

  const { refetch: refetchPhone } = useQuery("userPhone", getPhone, {
    enabled: false,
  });

  const [modalType, setModalType] = useState<AuthorizationModalTypeEnum>(
    isAuthorized
      ? AuthorizationModalTypeEnum.Logout
      : AuthorizationModalTypeEnum.LoginPhone
  );
  const [codeError, setCodeError] = useState(false);

  const handleSubmit = (values: FormValues) => {
    const { phone, code } = values;

    // TODO: костыль для того чтобы страница "Мои заявки"  прокручивалась после залогинивания (кнопка "Проверить объект" размонтируется раньше, чем успевает сработать useModalState и вернуть стиль overflow === "auto" на body)
    if (modalType === AuthorizationModalTypeEnum.LoginCode) {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    if (modalType === AuthorizationModalTypeEnum.LoginPhone) {
      setIsFetching(true);
      getSmsCode(phone)
        .then((data) => {
          if (data === 200) {
            setIsFetching(false);
            setModalType(AuthorizationModalTypeEnum.LoginCode);
          }
        })
        .catch((err) => console.error(err));
    }
    if (modalType === AuthorizationModalTypeEnum.LoginCode) {
      setIsFetching(true);
      checkSmsCode(phone, code)
        .then((data) => {
          if (data === 200 && setIsAuthorized) {
            setIsFetching(false);
            refetchAllRequests();
            refetchPhone();
            setIsAuthorized(true);
            if (action === "makeRequest") {
              setModalType(AuthorizationModalTypeEnum.MakeRequest);
            } else if (action === "callMe") {
              setModalType(AuthorizationModalTypeEnum.CallMe);
            } else {
              onCancel();
            }
          } else {
            setIsFetching(false);
            setCodeError(true);
          }
        })
        .catch((err) => {
          setIsFetching(false);
          console.error(err);
        });
    }
  };

  const handleSetCodeError = (value: boolean) => {
    setCodeError(value);
  };

  return (
    <div className={css.container}>
      <Modal
        className={cn(
          css.modal,
          (modalType === AuthorizationModalTypeEnum.LoginPhone ||
            modalType === AuthorizationModalTypeEnum.LoginCode) &&
            css.fullscreen
        )}
        closable={false}
        footer={null}
        wrapClassName={css.modalWrap}
        rootClassName={css.modalRoot}
        {...props}
      >
        <Form<FormValues> onSubmit={handleSubmit}>
          {({ handleSubmit, form }) => (
            <form
              className={css.form}
              id="authorization"
              onSubmit={handleSubmit}
            >
              {modalType === AuthorizationModalTypeEnum.Logout ? (
                <LogoutModal onCancel={onCancel} />
              ) : modalType === AuthorizationModalTypeEnum.LoginPhone ? (
                <LoginPhoneModal
                  onCancel={onCancel}
                  handleSubmit={handleSubmit}
                  form={form}
                  isFetching={isFetching}
                />
              ) : modalType === AuthorizationModalTypeEnum.LoginCode ? (
                <LoginCodeModal
                  onCancel={onCancel}
                  handleSubmit={handleSubmit}
                  form={form}
                  hasCodeError={codeError}
                  handleSetCodeError={handleSetCodeError}
                  isFetching={isFetching}
                />
              ) : modalType === AuthorizationModalTypeEnum.MakeRequest ? (
                <MakeRequestModal
                  open={modalType === AuthorizationModalTypeEnum.MakeRequest}
                  onCancel={onCancel}
                />
              ) : (
                <ContactModal
                  open={modalType === AuthorizationModalTypeEnum.CallMe}
                  onCancel={onCancel}
                />
              )}
            </form>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AuthorizationModal;
