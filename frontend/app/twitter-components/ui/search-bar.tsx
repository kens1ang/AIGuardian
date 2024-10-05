import { useState, useRef } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";

export function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => setInputValue(value);

  return (
    <form className="hover-animation sticky top-0 z-10 -my-2 bg-main-background py-2">
      <label
        className="group flex items-center justify-between gap-4 rounded-full
                  bg-[rgb(32,35,39)] px-4 py-2 transition focus-within:bg-black
                  focus-within:ring-2 focus-within:ring-orange-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-light-secondary dark:text-dark-secondary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          className="peer flex-1 bg-transparent outline-none 
                     placeholder:text-light-secondary dark:placeholder:text-dark-secondary"
          type="text"
          placeholder="Search"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
