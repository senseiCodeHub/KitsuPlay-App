"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "./Icons";

export type FaqItem = { q: string; a: string };

/** Accordion with a measured-free height animation (grid 0fr → 1fr). */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div className={`faq${isOpen ? " is-open" : ""}`} key={item.q}>
            <h3 className="faq-heading">
              <button
                type="button"
                className="faq-q"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                <span className="faq-chevron" aria-hidden="true">
                  <ChevronDownIcon size={18} />
                </span>
              </button>
            </h3>
            <div
              className="faq-panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div className="faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
