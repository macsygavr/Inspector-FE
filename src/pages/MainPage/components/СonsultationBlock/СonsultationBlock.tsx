import React, { FC, useState } from "react";
import css from "./index.module.css";
import ConsultationIcon from "../../../../assets/Icons/ConsultationIcon";
import { Field, Form } from "react-final-form";
import InputPhone from "../../../../components/UiKit/InputPhone/InputPhone";
import Button from "../../../../components/UiKit/Button/Button";
import { useProfileContext } from "../../../../contexts/ProfileContext";
import { useModalState } from "../../../../hooks/useModalState";
import ContactModal from "../../../../components/Modals/ContactModal/ContactModal";
import { sendCallMeRequest } from "../../../../api/callMe";

export type FormValues = {
  phone: string;
};

const СonsultationBlock: FC = () => {
  const contactModal = useModalState();
  const [isFetching, setIsFetching] = useState(false);

  const { isAuthorized, userPhone } = useProfileContext();

  const handleSubmit = (values: FormValues) => {
    setIsFetching(true)
    sendCallMeRequest(values.phone ?? "").then(() => {
      setIsFetching(false)
      contactModal.open();
    });
  };

  return (
    <div className={css.container}>
      <div className={css.infoContainer}>
        <div className={css.iconContainer}>
          <ConsultationIcon />
        </div>
        <div className={css.textContainer}>
          <div className={css.title}>Остались вопросы?</div>
          <div className={css.subtitle}>
            Получите личную консультацию от экспертов
          </div>
        </div>
      </div>
      <Form<FormValues>
        onSubmit={handleSubmit}
        initialValues={{
          phone: isAuthorized ? userPhone : "",
        }}
      >
        {({ handleSubmit, form }) => (
          <form className={css.form} id="consultation" onSubmit={handleSubmit}>
            <div className={css.formContainer}>
              <Field
                name="phone"
                type="input"
                render={({ input }) => (
                  <InputPhone {...input} className={css.input} />
                )}
              />
              <Button
                disabled={form.getState().values.phone?.length !== 11}
                className={css.button}
                onClick={handleSubmit}
                variant="primary"
                showSpinner={isFetching}
              >
                Получить консультацию
              </Button>
            </div>
          </form>
        )}
      </Form>
      {contactModal.opened && (
        <ContactModal
          open={contactModal.opened}
          onCancel={contactModal.close}
        />
      )}
    </div>
  );
};

export default СonsultationBlock;
