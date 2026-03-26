"use client";

export default function CategoryFilter({ categories, activeCategory, setActiveCategory }: any) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => setActiveCategory("Toutes")}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
          activeCategory === "Toutes" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Toutes
      </button>
      {categories.map((cat: string) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
            activeCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}