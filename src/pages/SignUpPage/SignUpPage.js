import React, { useState } from "react";
import styles from "./SignUpPage.module.scss";
import logo from "image/logo.svg";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import visibilityIcon from "image/visibilityIcon.svg";
import { toast } from "react-toastify";

import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <div>
      <div className={styles.LoginPage}>
        <div className={styles.container}>
          <div className={styles.LoginHome}>
            <div className={styles.LoginLeft}>
              <img
                className={styles.BgImg}
                src="https://webrazzi.com/v8/img/bg_auth.svg"
                alt="bg"
              />
              <a href="/">
                <img src={logo} alt="wb-logo" />{" "}
              </a>
              <div className={styles.LeftTitle}>
                <p>
                  {" "}
                  <span> </span> INS??GHTS
                </p>
                <p>
                  {" "}
                  <span> </span> G??R??????M{" "}
                </p>

                <h3>
                  Otomotiv sekt??r??nde sat??n almalar s??rerken farkl?? i?? modelleri
                  de ??ne ????k??yor{" "}
                </h3>
              </div>
            </div>
            <div className={styles.LoginRight}>
              <div className={styles.RightTitle}>
                <h1> Webrazzi d??nyas??na ad??m at??n</h1>
                <p>
                  Giri?? yaparak etkinlik ve kampanyalarda ??yelik avantajlar??ndan
                  faydalan??n, size ??zel geli??melerden haberdar olun.{" "}
                </p>
              </div>
              <div className={styles.Form}>
                <h3> ??ye Ol</h3>
                <form onSubmit={onSubmit}>
                  <label for="Ad Soyad"> Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={onChange}
                  />
                  <label for="E-posta"> E-posta</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={onChange}
                  />
                  <div className={styles.passwordIcon}>
                    <label for="??ifre"> ??ifre</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={onChange}
                    />
                    <img
                      src={visibilityIcon}
                      alt="show password"
                      className="showPassword"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  </div>
                  <button className={styles.LoginBtn}> Kay??t Ol</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
