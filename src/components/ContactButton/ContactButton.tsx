import React, { FC, useState } from "react";
import Button from "../UiKit/Button/Button";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useModalState } from "../../hooks/useModalState";
import AuthorizationModal from "../Modals/AuthorizationModal/AuthorizationModal";
import ContactModal from "../Modals/ContactModal/ContactModal";
import SkeletonRow from "../UiKit/SkeletonRow/SkeletonRow";
import { sendCallMeRequest } from "../../api/callMe";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../routes";

type Props = {
  locality?: string;
  className?: string;
  skeletonMode?: boolean;
  isSoldButton?: boolean;
};

const ContactButton: FC<Props> = ({
  locality,
  className,
  skeletonMode,
  isSoldButton,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const { isAuthorized, userPhone } = useProfileContext();
  const authorizationModal = useModalState();
  const contactModal = useModalState();
  const router = useRouter();

  const handleClick = () => {
    if (isAuthorized) {
      setIsFetching(true);
      sendCallMeRequest(userPhone ?? "", locality ?? "").then(() => {
        setIsFetching(false);
        contactModal.open();
      });
    } else {
      authorizationModal.open();
    }
  };

  return (
    <>
      {skeletonMode ? (
        <SkeletonRow
          style={{
            height: "48px",
            marginTop: "32px",
            borderRadius: "16px",
          }}
        />
      ) : (
        <>
          {isSoldButton ? (
            <Button
              className={className}
              onClick={() => router.push(PublicRoutes.ALL_REPORTS.static)}
              variant="primary"
            >
              Узнать об аналогах
            </Button>
          ) : (
            <Button
              className={className}
              onClick={handleClick}
              variant="primary"
              disabled={isFetching}
              showSpinner={isFetching}
            >
              Перезвоните мне
            </Button>
          )}

          {authorizationModal.opened && (
            <AuthorizationModal
              open={authorizationModal.opened}
              onCancel={authorizationModal.close}
              action="callMe"
            />
          )}
          {contactModal.opened && (
            <ContactModal
              open={contactModal.opened}
              onCancel={contactModal.close}
            />
          )}
        </>
      )}
    </>
  );
};

export default ContactButton;
