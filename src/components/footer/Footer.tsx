import './footer.scss';
import {UseTg} from '../../hooks/useTg';

const Footer = () => {
  const {user} = UseTg();
  return (
    <div className={user.id ? 'footer' : 'footer-desk'}>
      <a href={'mailto:support@stockhub12.ru'}>@StockHub12</a>
      <div className="footer__info">
        <a href="https://telegra.ph/Dogovor-oferty-na-okazanie-uslugi-11-27" target={'_blank'}>Договор
          оферты</a>
        <a href="https://telegra.ph/Instrukciya-po-ispolzovaniyu-StockHubBot-12-13" target={'_blank'}>Иструкция
          пользователя</a>
        <a href="mailto:support@stockhub12.ru" target={'_blank'}>support@stockhub12.ru</a>
      </div>
    </div>

  );
};

export default Footer;