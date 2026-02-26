import { useState } from "react";

function SearchResult() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-[1100]"
        onClick={handleClose}
      ></div>

      <section className="w-full max-w-[500px] bg-red-500 fixed top-[150px] left-1/2 -translate-x-1/2 z-[1200] px-4 py-5 rounded-lg">
        Results
      </section>
    </>
  );
}

export default SearchResult;
