import { useNavigate } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { getImageUrl } from "@/redux/getBaseUrl";

interface ServiceCardProps {
  id: string;
  title: string;
  desc: string;
  image: string;
  available?: boolean;
  count?: number;
  price?: number;
}

export function ServiceCard({
  id,
  title,
  desc,
  image,
  available = false,
  count = 0,
  price = 0,
}: ServiceCardProps) {
  const { t } = useI18n();
  const navigate = useNavigate();


  const imageUrl = image?.startsWith("http") ? image : `${getImageUrl(image)}`;

  const handleClick = () => {
    if (!available) return;

    navigate(`${id}/providers`);
  };

  return (
    <article
      onClick={handleClick}
      className={`group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-sm transition-transform duration-500 ${
        available
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl"
          : "cursor-default"
      }`}
    >
      {/* Coming Soon Overlay */}
      {!available && <div className="absolute inset-0 z-10 bg-black/60" />}

      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

      {/* Coming Soon Text */}
      {!available && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="font-serif text-3xl font-bold italic text-white drop-shadow-lg sm:text-6xl">
            {t("services.comingSoon")}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-3xl font-bold sm:text-4xl">{title}</h3>

        <p className="mt-2 max-w-md text-sm font-medium">{desc}</p>

        {/* Provider Stats */}
        {available && (
          <p className="mt-3 font-bold uppercase tracking-wider text-white/90">
            {count.toLocaleString()} {t("services.providers")} ·{" "}
            {t("services.from")} {price}
            {t("services.perHr")}
          </p>
        )}
      </div>
    </article>
  );
}
