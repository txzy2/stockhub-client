import {motion} from 'framer-motion';
import './footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <motion.div
        whileHover={{scale: 1.1}}
        transition={{type: 'spring', stiffness: 400, damping: 10}}
      >
        <a href={'mailto:support@stockhub12.ru'}>@StockHubTech12</a>
      </motion.div>
    </div>

  );
};

export default Footer;
