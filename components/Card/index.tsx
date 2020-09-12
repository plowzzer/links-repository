import React from "react";

interface CardLink {
  image?: string;
  title?: string;
  icon?: string;
  description?: string;
  tags?: Array<string>;
}

const Card: React.FC<CardLink> = ({
  image,
  title,
  icon,
  description,
  tags,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {image && <img className="w-full" src={image} alt={title} />}
      <div className="px-6 py-4">
        <div className="flex items-center font-bold text-xl mb-2">
          {icon && (
            <div className="mr-2">
              <img src={icon} style={{ maxWidth: 16, maxHeight: 16 }} />
            </div>
          )}
          <div>{title}</div>
        </div>
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
