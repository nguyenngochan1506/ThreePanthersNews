type TopBannerProps = {
  imageSrc?: string;
  href?: string;
  alt?: string;
};

const TopBanner = ({
  imageSrc = "/top-banner.jpg",
  href = "#",
  alt = "Top advertisement",
}: TopBannerProps) => {
  return (
    <div className="w-full bg-white border-b">
      <div className="mx-auto px-4 py-3">
        
        <div className="mx-auto max-w-[1300px]">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src={imageSrc}
              alt={alt}
              loading="lazy"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "970 / 250" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
