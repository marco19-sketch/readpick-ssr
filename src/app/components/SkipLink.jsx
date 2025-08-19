import { useTranslation } from 'react-i18next';

export default function SkipLink() {
    const { t } = useTranslation();
  return (
    <a tabIndex="0" href="#main-content" className="skip-link">
      {t("skipToMain", {
        defaultValue: "Vai al contenuto principale",
      })}
    </a>
  );
}
