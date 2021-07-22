import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import { register as _register } from "../../actions/userActions";
import { useTranslation } from "react-i18next";
import {
  Box,
  ImageArea,
  Image,
  LoginPopup,
  LoginForm,
  FormControl,
  Label,
  Button,
  Close,
  LinkOps,
  SocialMedia,
  SocialMediaList,
  Span,
} from "./styles/Login";
import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ModalForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);
  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [error, setError] = useState("");

  const { t } = useTranslation();

  if (!props.visible) {
    return null;
  }

  const userSignup = () => {
    const user = { name, email, password };
    if (name === "" || email === "") {
      toast.error(t("messages.allFields"));
    }
    if (password.length < 6) {
      toast.error(t("messages.passwordLength"));
    }

    dispatch(_register(user));
  };

  const userLogin = (e) => {
    e.preventDefault();

    if (register) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  return (
    <>
      <LoginPopup>
        <Box>
          <ImageArea>
            <Image></Image>
            <h1>Amazon</h1>
          </ImageArea>
          <LoginForm>
            <Close onClick={props.handleClose}>&times;</Close>

            <h3
              onClick={() => {
                setRegister(false);
                setEmail("");
                setPassword("");
              }}
              style={{ minWidth: 100 }}
            >
              {t("signin.loginBtn")}
            </h3>

            <h3
              onClick={() => {
                setRegister(true);
                setName("");
                setEmail("");
                setPassword("");
              }}
              style={{ minWidth: 100 }}
            >
              {t("signin.registerBtn")}
            </h3>

            <h4 style={{ color: "#222", fontSize: 25 }}>
              {register ? t("signin.registerBtn") : t("signin.loginBtn")}
            </h4>
            <form>
              {register && (
                <div className="form-group">
                  <FormControl
                    placeholder={t("signin.fullName")}
                    required
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
              <div className="form-group">
                <FormControl
                  placeholder={t("signin.email")}
                  required
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <FormControl
                  placeholder={t("signin.password")}
                  required
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: 5 }}
                />
              </div>

              <div className="form-group" style={{ margin: "12px 0" }}>
                <Label for="remember-me">
                  <input type="checkbox" name="remember-me" defaultChecked />
                  {t("signin.rememberMe")}
                </Label>
                {register ? (
                  <Link
                    style={{ color: "#222" }}
                    onClick={() => {
                      setRegister(false);
                      setEmail("");
                      setPassword("");
                    }}
                  >
                    <LinkOps>{t("signin.haveAccount")}</LinkOps>
                  </Link>
                ) : (
                  <Link to="password/forgot" style={{ color: "#222" }}>
                    <LinkOps>{t("signin.forgotPassword")}</LinkOps>
                  </Link>
                )}
              </div>
              <Span style={{ color: "#222", margin: "10px 0px" }}>
                {t("signin.orContinueWith")}
              </Span>
              <SocialMediaList>
                <SocialMedia className="social-media">
                  <i class="fab fa-facebook"></i>
                </SocialMedia>
                <SocialMedia className="social-media">
                  <i class="fab fa-google"></i>
                </SocialMedia>
                <SocialMedia className="social-media">
                  <i class="fab fa-apple"></i>
                </SocialMedia>
              </SocialMediaList>
              <Button type="submit" onClick={userLogin}>
                {register ? t("signin.registerBtn") : t("signin.loginBtn")}
              </Button>
            </form>
          </LoginForm>
        </Box>
      </LoginPopup>
    </>
  );
};

export default ModalForm;
