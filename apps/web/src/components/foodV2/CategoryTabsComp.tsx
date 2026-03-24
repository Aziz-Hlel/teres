import { Button } from '@/components/ui/button';
import React from 'react';
import type { CategoriesSelection } from './FoodV2';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const CategoryTab = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: {
  categories: CategoriesSelection[];
  selectedCategory: CategoriesSelection;
  onCategorySelect: (category: CategoriesSelection) => void;
}) => {
  return (
    <div className=" flex items-center gap-4 w-full overflow-x-auto py-4">
      {categories.map((category) => (
        <Button
          key={category}
          className={cn(
            'cursor-pointer text-white border bg-transparent hover:bg-primary/20 ',
            selectedCategory === category && 'border-primary  bg-primary/80 text-white hover:bg-primary/80 ',
          )}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </Button>
      ))}

      <Link to="/menu/all">
        <Button className={cn('cursor-pointer text-primary underline  ')} variant="link">
          View All
        </Button>
      </Link>
    </div>
  );
};

export default CategoryTab;
