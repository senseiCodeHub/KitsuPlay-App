"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CheckIcon, ChevronDownIcon } from "./Icons";

type Option<T extends string> = { value: T; label: string };

type SortMenuProps<T extends string> = {
  value: T;
  options: readonly Option<T>[];
  onChange: (value: T) => void;
  label: string;
};

export function SortMenu<T extends string>({ value, options, onChange, label }: SortMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex((option) => option.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelectorAll<HTMLButtonElement>("[data-option]")[activeIndex]?.focus();
  }, [open, activeIndex]);

  const openMenu = (index = Math.max(0, options.findIndex((option) => option.value === value))) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const select = (next: T) => {
    onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + options.length) % options.length);
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
      return;
    }
    if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className="sort-menu" ref={rootRef}>
      <button
        type="button"
        ref={buttonRef}
        className="sort-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${current.label}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu();
          }
        }}
      >
        <span>{current.label}</span>
        <ChevronDownIcon size={14} />
      </button>

      {open && (
        <div className="sort-list" role="listbox" aria-label={label} ref={listRef} onKeyDown={onListKeyDown}>
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              role="option"
              data-option
              aria-selected={option.value === value}
              tabIndex={index === activeIndex ? 0 : -1}
              className={`sort-option${option.value === value ? " is-selected" : ""}`}
              onPointerEnter={() => setActiveIndex(index)}
              onClick={() => select(option.value)}
            >
              <span>{option.label}</span>
              {option.value === value && <CheckIcon size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
