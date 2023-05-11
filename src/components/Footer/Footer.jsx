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
          </div>
          <script
            type="text/javascript"
            charset="utf-8"
            async
            src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Acc51fbe3c62d0748105f81393a29f718b25efebc71bd23c8b7cb39f13a0b2cef&amp;width=100%25&amp;height=512&amp;lang=ru_RU&amp;scroll=true"
          ></script>
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
