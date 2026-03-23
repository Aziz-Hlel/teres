import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { CocktailItem } from './cocktailData2';

const ItemCard = ({
  item,
  onItemSelect,
}: {
  item: CocktailItem | null;
  onItemSelect: (item: CocktailItem | null) => void;
}) => {
  return (
    <Dialog open={item !== null} onOpenChange={() => onItemSelect(null)}>
      <DialogContent className=" p-0 lg:mt-0 rounded-xl max-h-[90dvh] z-[1000]">
        <Card className=" p-0 m-0  max-w-2xl h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          {item && (
            <CardContent className="flex flex-col h-fit p-0 m-0  ">
              <img src={item.src} alt={item.title} className=" w-full h-[65dvh] rounded-t-xl  object-cover  " />
              <div className="px-0.5 sm:px-4 overflow-y-auto max-h-[25dvh] h-fit flex flex-col py-4  space-y-2 overscroll-contain scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400">
                <DialogTitle className="font-semibold  uppercase text-primary text-4xl  text-center">
                  {item.title}
                </DialogTitle>
                <div className=" flex flex-col items-center space-y-2 h-fit">
                  <DialogDescription className=" text-white text-md pl-2 h-fit text-center tracking-tight leading-tight whitespace-pre-line">
                    {item.description}
                  </DialogDescription>
                  <span className=" text-white text-2xl pl-2 h-fit text-center">{item.price} BD</span>

                  <div className=" w-fit mx-auto text-muted-foreground text-center text-xs lg:text-sm">
                    *All Prices Are In Bahraini Dinars & Subject To 10% Service Charge, 10% Vat & 5% Gov. Levy
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ItemCard;
