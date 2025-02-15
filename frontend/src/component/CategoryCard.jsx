import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {

  return (
    <Link to={`/category/${category.name}`}>
      <div className="border rounded-lg p-4 text-center">
        <div className="w-full h-32 flex items-center justify-center mb-2">
          <span className="text-6xl">{category.icon}</span>
        </div>
        <h3 className="text-lg font-semibold">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;