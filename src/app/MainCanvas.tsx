

const MainCanvas: React.FC = () => {
  return (
    <main className="flex-1 overflow-auto bg-[var(--color-canvas-bg)] flex items-center justify-center p-8">
      <div className="text-[var(--color-text-secondary)] text-lg border border-dashed border-[var(--color-border)] rounded-xl p-12 text-center w-full max-w-3xl aspect-square flex items-center justify-center bg-[var(--color-panel-bg)] opacity-70">
        Chronodisc will render here.
      </div>
    </main>
  );
};

export default MainCanvas;
