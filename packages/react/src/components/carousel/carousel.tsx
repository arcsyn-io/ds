import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";

export interface CarouselProps {
  items: ReactNode[];
  label: string;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  loop?: boolean;
  className?: string;
}

export function Carousel({ items, label, initialIndex = 0, index, onIndexChange, loop = false, className }: CarouselProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0)));
  const activeIndex = index ?? uncontrolledIndex;
  const id = useId();
  const canGoPrevious = loop ? items.length > 1 : activeIndex > 0;
  const canGoNext = loop ? items.length > 1 : activeIndex < items.length - 1;

  function move(next: number) {
    if (items.length === 0) return;
    const resolved = loop ? (next + items.length) % items.length : Math.min(Math.max(next, 0), items.length - 1);
    if (index === undefined) setUncontrolledIndex(resolved);
    onIndexChange?.(resolved);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(activeIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(activeIndex + 1); }
    if (event.key === "Home") { event.preventDefault(); move(0); }
    if (event.key === "End") { event.preventDefault(); move(items.length - 1); }
  }

  return (
    <section className={cx("arcsyn-carousel", className)} aria-roledescription="carrossel" aria-label={label} onKeyDown={onKeyDown}>
      <div className="arcsyn-carousel__viewport" aria-live="polite">
        {items.map((item, itemIndex) => <div id={`${id}-${itemIndex}`} key={itemIndex} className="arcsyn-carousel__slide" role="group" aria-roledescription="slide" aria-label={`${itemIndex + 1} de ${items.length}`} hidden={itemIndex !== activeIndex}>{item}</div>)}
      </div>
      <div className="arcsyn-carousel__controls">
        <button className="arcsyn-carousel__button" type="button" onClick={() => move(activeIndex - 1)} disabled={!canGoPrevious} aria-label="Slide anterior"><ArrowLeftIcon aria-hidden size={16} /></button>
        <span className="arcsyn-carousel__status">{items.length === 0 ? "0 de 0" : `${activeIndex + 1} de ${items.length}`}</span>
        <button className="arcsyn-carousel__button" type="button" onClick={() => move(activeIndex + 1)} disabled={!canGoNext} aria-label="Próximo slide"><ArrowRightIcon aria-hidden size={16} /></button>
      </div>
    </section>
  );
}
