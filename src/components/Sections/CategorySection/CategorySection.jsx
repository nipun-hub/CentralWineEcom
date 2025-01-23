import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom';

const categories = [
  'Red Wine',
  'White Wine',
  'Rose Wine',
  'Champagne & Sparkling',
  'Sake',
  'Spirits',
  'Cans & Cocktails',
];

const CategorySection = ({ categoryImage }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <section
      className="w-full h-auto bg-cover bg-center py-8"
      style={{ backgroundImage: `url('${categoryImage}')` }}
    >
      <div className="container mx-auto px-6 flex flex-wrap justify-center gap-6">
        {categories.map((category, index) => (
          <button
            onClick={() => navigate(`shop#${category.replace(" ", "")}`, { state: { navigateCategory: category } })}
            key={index}
            className="
        category-button
        w-auto h-auto
        px-[30px] py-[15px]
        bg-transparent
        border-colorBlack950 border-1
        rounded-full
        hover:scale-105
        transition-all duration-300 ease-in-out
        opacity-100
        "
            style={{ color: theme.gold950 }}
          >
            {category}
          </button>
        ))}
      </div>
    </section >
  );
};

export default CategorySection;
