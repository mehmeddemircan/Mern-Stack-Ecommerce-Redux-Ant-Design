import React, { Fragment } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ModalForm from "../modal/Login";

import HomePage from "../../pages/HomePage";
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  const { authenticate, user, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  const handleCloseProtect = () => {
    history.push("/");
  };
  const { t } = useTranslation();

  useEffect(() => {
    if (!authenticate) {
      // toast.error(t("messages.protectedRoute"));
      setShowModal(true);
    }
  }, [authenticate]);
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (!authenticate) {
              return (
                <>
                  <HomePage />
                  <ModalForm
                    visible={showModal}
                    showModal={showModal}
                    handleClose={handleCloseProtect}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  />
                </>
              );
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
