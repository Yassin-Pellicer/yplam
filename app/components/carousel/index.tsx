import { t } from "i18next";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { getCarouselIcon } from "@/app/lib/icon-map";

type CarouselItem = {
  icon: string;
  title: string;
  subtitle: string;
  incoming?: boolean;
};

export const Carousel = ({ items }: { items: CarouselItem[] }) => {
  const baseX = useMotionValue(0);
  const itemHeight = 300;
  const totalHeight = items.length * itemHeight;

  useAnimationFrame((t) => {
    baseX.set((t / 20) % (totalHeight + itemHeight / 2 - 20));
  });

  return (
    <div className="flex relative items-center justify-center h-[325px] overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, 
          var(--background) 0%, 
          transparent 5%, 
          transparent 95%, 
          var(--background) 100%)`,
        }}
      />
      <motion.div
        className="flex flex-row gap-6"
        style={{
          x: useTransform(baseX, (val) => -(val + itemHeight / 2)),
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="w-[300px] bg-foreground/5 h-[300px] rounded-xl shadow-sm border-foreground/50 px-6 py-4 flex flex-col justify-center relative">
            {(() => {
              const Icon = getCarouselIcon(item.icon);
              return (
                <div className="text-8xl mb-4 text-center border-b border-foreground/20 pb-4 flex justify-center">
                  <Icon className="h-24 w-24 text-foreground!" strokeWidth={1} />
                </div>
              );
            })()}
            {item.incoming === true && (
              <div className="absolute top-4 right-4 flex flex-row items-center justify-center gap-2 bg-background w-fit rounded-full px-1 text-foreground! font-bold tracking-tighter shadow-sm">
                <div className="relative h-2 w-2 rounded-full bg-red-500 animate-pulse">
                  <div className="absolute h-2 w-2 rounded-full bg-red-500 animate-[ping_0.75s_infinite]"></div>
                </div>
                <span className="text-xs">{t("carousel.dev")}</span>
              </div>
            )}
            <div className="text-2xl font-bold text-foreground! mb-2">
              {item.title}
            </div>
            <div className="text-sm text-muted-foreground">{item.subtitle}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
