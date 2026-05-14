import './contactInfo.scss';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <section className="contact-info">
      <h2>📞 Свяжитесь с нами</h2>
      <div className="contacts">
        <div className="contact-item">
          <FaPhone className="icon" />
          <a href="tel:88137153474">8 (81371) 53-474</a>
        </div>
        <div className="contact-item">
          <FaPhone className="icon" />
          <a href="tel:+79112305032">+7 (911) 230-50-32</a>
        </div>
        <div className="contact-item">
          <FaPhone className="icon" />
          <a href="tel:+79817980803">+7 (981) 798-08-03</a>
        </div>
        <div className="contact-item">
          <FaEnvelope className="icon" />
          <a href="mailto:petrokarton@yandex.ru">petrokarton@yandex.ru</a>
        </div>
        <div className="contact-item">
          <FaEnvelope className="icon" />
          <a href="mailto:piter.polenok@yandex.ru">piter.polenok@yandex.ru</a>
        </div>
      </div>
    </section>
  );
}