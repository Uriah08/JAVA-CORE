import React from "react";

interface BreadcrumbProps {
  breadcrumb: string[];
  handleBreadcrumbClick: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb,
  handleBreadcrumbClick,
}) => {
  return (
    <div className="font-base flex mb-3">
      {breadcrumb.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className={`cursor-pointer text-gray-600 hover:underline ${
              index === breadcrumb.length - 1
                ? "font-bold text-sm text-gray-800"
                : ""
            }`}
            onClick={() => handleBreadcrumbClick(index)}
          >
            {item}
          </span>
          {index < breadcrumb.length - 1 && (
            <span className="font-bold text-sm text-gray-600 mx-1"> &gt; </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
