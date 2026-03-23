import { type CategoriesName } from './foodData';
import { useEffect, useState } from 'react';
import CategoryTab from './CategoryTabsComp';
import ItemCard from './ItemCard';
import useEmblaCarousel from 'embla-carousel-react';
import FoodCarousel from './FoodCarousel';
import { cocktailCategories, type CocktailItem } from './cocktailData2';

export type CategoriesSelection = CategoriesName | 'ALL';

const FoodV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoriesSelection>('ALL');
  const [selectedItem, setSelectedItem] = useState<CocktailItem | null>(null);

  const categories: CategoriesSelection[] = ['ALL', ...(Object.keys(cocktailCategories) as CategoriesName[])];

  const onCategorySelect = (category: CategoriesSelection) => {
    setSelectedCategory(category);
    const index = categories.indexOf(category);
    ScrollTo(index);
  };

  const onItemSelect = (item: CocktailItem | null) => {
    setSelectedItem(item);
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
  });

  const ScrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    emblaApi.slidesInView();
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      const nextCategory = categories[index];

      setSelectedCategory((prev) => (prev === nextCategory ? prev : nextCategory));
    };

    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, categories, setSelectedCategory]);

  return (
    <div className="flex flex-col gap-4  w-screen items-center justify-center overflow-hidden  bg-transparent z-50">
      <div className="h-[75dvh] w-full space-y-4 overflow-hidden">
        <CategoryTab categories={categories} onCategorySelect={onCategorySelect} selectedCategory={selectedCategory} />
        <div className=" h-[75dvh] ">
          <FoodCarousel emblaRef={emblaRef} setSelectedItem={onItemSelect} onCategorySelect={onCategorySelect} />
        </div>
      </div>
      <ItemCard item={selectedItem} onItemSelect={onItemSelect} />
    </div>
  );
};

export default FoodV2;
