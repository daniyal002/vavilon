import React from "react";
import style from "./Footer.module.css";
import instagramIcon from "../../assets/icons/instagram.svg";
import telegramIcon from "../../assets/icons/telegram.svg";
import phone from "../../assets/icons/phone.svg";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerB}>
          <div className={style.footerMap}>
            <div className={style.footerMapAdress}>
              <address>
                Адрес: просп. Али-Гаджи Акушинского, 119, Махачкала
              </address>
            </div>
            {/* <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af618ca357d4d11049ffd45737a36e8c5de8d603c8c81fd368f77a37d877049b1&amp;source=constructor" width="100%" height="200" frameborder="0"></iframe> */}
          </div>

          <div className={style.footerContact}>
            <h2 className={style.footerContactTitle}>Контакты:</h2>
            <div className={style.footerContactSocial}>
              <div className={style.footerContactInst}>
                <img
                  src={instagramIcon}
                  alt=""
                  className={style.footerContactInstImg}
                  width={32}
                />
                <a
                  name="contacts"
                  href="https://www.instagram.com/kinoteatr_vavilon/"
                  target="_blank"
                  className={style.footerContactInstLink}
                >
                  kinoteatr_vavilon
                </a>
              </div>
              <div className={style.footerContactTelegram}>
                <img
                  src={telegramIcon}
                  alt=""
                  className={style.footerContactTelegramImg}
                  width={32}
                />
                <a
                  href="https://t.me/vavilon_kinoteatr"
                  target="_blank"
                  className={style.footerContactTelegramLink}
                >
                  vavilon_kinoteatr
                </a>
              </div>
              <div className={style.footerContactPhone}>
                <img
                  src={phone}
                  alt=""
                  className={style.footerContactPhoneImg}
                  width={32}
                />
                <a
                  href="tel:+79285439257"
                  className={style.footerContactPhoneLink}
                  type="tel"
                  target="_blank"
                >
                  +7 (928) 543-92-57
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
