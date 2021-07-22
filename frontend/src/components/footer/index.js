import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import {
  FooterLogo,
  Footer,
  FooterCol,
  FooterBottom,
  Ul,
  Row,
  Container,
} from "./styles/footer";




const FooterComponent = () => {

  const {t} = useTranslation()


  return (
    <Fragment>
      <Footer>
        <FooterLogo>
          <a href="#"></a>
        </FooterLogo>
        <Container>
          <Row>
            <FooterCol>
              <h4>{t("footer.company")}</h4>
              <Ul>
                <li>
                  <a href="#">{t("footer.aboutUs")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.ourServices")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.privacyPolicy")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.contract")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.termsOfUse")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.affiliateProgram")}</a>
                </li>
              </Ul>
            </FooterCol>
            <FooterCol>
              <h4>{t("footer.getHelp")}</h4>
              <Ul>
                <li>
                  <a href="#">{t("drawer.faq")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.shipping")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.returns")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.orderStatus")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.paymentOptions")}</a>
                </li>
              </Ul>
            </FooterCol>
            <FooterCol>
              <h4>{t("footer.explore")}</h4>
              <Ul>
              <li>
                  <a href="#">{t("footer.ourTeam")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.careers")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.investors")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.joinOurTeam")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.ourVideos")}</a>
                </li>
                <li>
                  <a href="#">{t("footer.getCoupon")}</a>
                </li>
              </Ul>
            </FooterCol>
            <FooterCol>
              <h4>{t("footer.onlineShop")}</h4>
              <Ul>
                <li>
                  <a href="#">{t("menuHeader.home&living")}</a>
                </li>
                <li>
                  <a href="#">{t("menuHeader.electronic&technology")}</a>
                </li>
                <li>
                  <a href="#">{t("menuHeader.beauty&cosmetics")}</a>
                </li>
                <li>
                  <a href="#">{t("menuHeader.clothing&shoes")}</a>
                </li>
                <li>
                  <a href="#">{t("menuHeader.art&collectibles")}</a>
                </li>
                <li>
                  <a href="#">{t("menuHeader.jewelery&accessories")}</a>
                </li>
                <li>
                  <a href="#">{t("menuHeader.vintage")}</a>
                </li>
              </Ul>
            </FooterCol>
            <FooterCol>
              <h4>{t("footer.followUs")}</h4>
              <div class="social-links">
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i class="fab fa-youtube"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </FooterCol>

            <FooterBottom>
              <h5 style={{color:'#fff'}}>
                copyright &copy;
                <script>document.write(new Date().getFullYear())</script>
                Company designed by <span>Creator</span>
              </h5>
            </FooterBottom>
          </Row>
        </Container>
      </Footer>
    </Fragment>
  );
};

export default FooterComponent;
