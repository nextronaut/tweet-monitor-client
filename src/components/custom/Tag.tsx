import React from "react";

interface TagProps {
  tags: string[];
}

const Tag: React.FC<TagProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <span key={index} className="mx-1 p-1 border border-sky-500">
          {tag}
        </span>
      ))}
    </>
  );
};

export default Tag;
