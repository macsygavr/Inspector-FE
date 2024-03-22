import React, { FC } from "react";
import Button from "../UiKit/Button/Button";
import { useModalState } from "../../hooks/useModalState";
import AuthorizationModal from "../Modals/AuthorizationModal/AuthorizationModal";
import MakeRequestModal from "../Modals/MakeRequestModal/MakeRequestModal";
import { useProfileContext } from "../../contexts/ProfileContext";

type Props = {
  variant: "primary" | "secondary";
  className?: string;
  customText?: string;
};

const MakeRequestButton: FC<Props> = ({ variant, className, customText }) => {
  const makeRequestModal = useModalState();
  const authorizationModal = useModalState();
  const { isAuthorized } = useProfileContext();

  return (
    <>
      <Button
        onClick={() =>
          isAuthorized ? makeRequestModal.open() : authorizationModal.open()
        }
        variant={variant}
        className={className}
      >
        {customText || "Проверить объект"}
      </Button>
      {authorizationModal.opened && (
        <AuthorizationModal
          open={authorizationModal.opened}
          onCancel={authorizationModal.close}
          action="makeRequest"
        />
      )}
      {makeRequestModal.opened && (
        <MakeRequestModal
          open={makeRequestModal.opened}
          onCancel={makeRequestModal.close}
        />
      )}
    </>
  );
};

export default MakeRequestButton;
