"use client";

import { useEffect, useState } from "react";

const queries = ["anime", "movies", "series"];

export function TypingSearch() {
  const [text, setText] = useState(queries[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let query = 0;
    let index = queries[0].length;
    let deleting = true;

    const step = () => {
      const word = queries[query];

      if (deleting) {
        index -= 1;
        if (index <= 0) {
          index = 0;
          deleting = false;
          query = (query + 1) % queries.length;
          setText("");
          timer = window.setTimeout(step, 260);
          return;
        }
      } else {
        index += 1;
        if (index >= word.length) {
          index = word.length;
          setText(word);
          deleting = true;
          timer = window.setTimeout(step, 1600);
          return;
        }
      }

      setText(queries[query].slice(0, index));
      timer = window.setTimeout(step, deleting ? 48 : 92);
    };

    timer = window.setTimeout(step, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className="typing">
      <span>{text}</span>
      <i className="typing-caret" aria-hidden="true" />
    </span>
  );
}
