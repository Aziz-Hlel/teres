import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import type { CategoriesSelection } from './FoodV2';

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

      <Button
        className={cn('cursor-pointer text-primary underline outline-primary border-primary border')}
        variant="secondary"
      >
        <a href="/menu/Teres_menu.pdf" target="_blank" rel="noopener noreferrer">
          View All
        </a>
      </Button>
    </div>
  );
};

export default CategoryTab;
