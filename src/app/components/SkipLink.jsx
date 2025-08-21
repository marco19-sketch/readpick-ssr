export default function SkipLink() {
  return (
    <a tabIndex="0" href="#main-content" className="skip-link">
      "Vai al contenuto principale"
      {/* {t("skipToMain", {
        defaultValue: "Vai al contenuto principale",
      })} */}
    </a>
  );
}
