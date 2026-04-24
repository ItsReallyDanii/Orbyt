import React from 'react';
import { useCategories } from '../../core/store';
import { tailwindColors } from '../../core/colors';

const CategoriesView: React.FC = () => {
  const categories = useCategories();

  return (
    <div className="flex-1 flex flex-col p-8 bg-[var(--color-canvas-bg)] overflow-y-auto">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Categories</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">
        These are your local entry categories. They are seeded automatically and stored in IndexedDB.
      </p>

      <div className="grid grid-cols-1 gap-3 max-w-md">
        {categories.map(cat => {
          const hex = tailwindColors[cat.color] || tailwindColors.gray;
          return (
            <div
              key={cat.id}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[var(--color-panel-bg)] border border-[var(--color-border)] shadow-sm"
            >
              <span
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: hex }}
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{cat.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Color: {cat.color}</p>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: hex + '22', color: hex }}
              >
                {cat.visible ? 'Visible' : 'Hidden'}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] mt-8 max-w-md">
        Category editing (rename, recolor, add/remove) is planned for a future release.
      </p>
    </div>
  );
};

export default CategoriesView;
