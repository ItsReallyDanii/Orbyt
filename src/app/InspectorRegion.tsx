

const InspectorRegion: React.FC = () => {
  return (
    <aside className="w-80 flex-shrink-0 bg-[var(--color-panel-bg)] border-l border-[var(--color-border)] p-6 overflow-y-auto">
      <div className="text-[var(--color-text-secondary)] text-center mt-12 p-6 border border-dashed border-[var(--color-border)] rounded-lg">
        Select a day to inspect.
      </div>
    </aside>
  );
};

export default InspectorRegion;
