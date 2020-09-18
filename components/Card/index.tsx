import React from "react";

interface CardLink {
  url?: string;
  image?: string;
  title?: string;
  icon?: string;
  description?: string;
  tags?: Array<string>;
}

const Card: React.FC<CardLink> = ({
  url,
  image,
  title,
  icon,
  description,
  tags,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {image && (
        <a href={url} target="_blank">
          <img className="w-full" src={image} alt={title} />
        </a>
      )}
      <div className="px-6 py-4">
        <a
          href={url}
          target="_blank"
          className="flex items-center font-bold text-xl mb-2"
        >
          <div>
            {icon && (
              <div className="mr-2 mt-2 float-left">
                <img src={icon} style={{ maxWidth: 16, maxHeight: 16 }} />
              </div>
            )}
            {title}
          </div>
        </a>
        {description && (
          <p className="text-gray-700 text-base">{description}</p>
        )}
      </div>
      {tags &&
        tags.map((tag) => {
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tag}
            </span>
          </div>;
        })}
    </div>
  );
};

export default Card;
