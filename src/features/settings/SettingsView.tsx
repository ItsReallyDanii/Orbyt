import React from 'react';

const PKG_VERSION = '0.0.0'; // matches package.json

const SettingsView: React.FC = () => {
  const row = (label: string, value: string, accent = false) => (
    <div className="flex items-center justify-between px-5 py-4 rounded-xl bg-[var(--color-panel-bg)] border border-[var(--color-border)]">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className={`text-sm font-medium ${accent ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`}>{value}</span>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-8 bg-[var(--color-canvas-bg)] overflow-y-auto">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Settings</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">App configuration and status.</p>

      <div className="max-w-lg space-y-8">
        {/* App info */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">App</h2>
          <div className="space-y-2">
            {row('Name', 'Orbyt')}
            {row('Version', `v${PKG_VERSION}`)}
            {row('Stack', 'React + Vite + Dexie (IndexedDB)')}
          </div>
        </section>

        {/* Data */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">Data & Storage</h2>
          <div className="space-y-2">
            {row('Storage', 'IndexedDB (local browser only)', true)}
            {row('Cloud Sync', 'Disabled — local-first only')}
            {row('Auth / Login', 'None — no accounts required')}
            {row('External API Calls', 'None — fully offline')}
          </div>
        </section>

        {/* Theme */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">Theme</h2>
          <div className="space-y-2">
            {row('Theme Toggle', 'Top-right corner (☀️ / 🌙)')}
            {row('Default Theme', 'Dark')}
            {row('Color Tokens', 'CSS variables — see src/index.css')}
          </div>
        </section>

        {/* Integrations */}
        <section>
          <h2 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">Integrations</h2>
          <div className="space-y-2">
            {row('Google Calendar', 'NOT IMPLEMENTED — stub only')}
            {row('Duckbill', 'NOT IMPLEMENTED — stub only')}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-3 leading-relaxed">
            Integration stubs exist in <code className="font-mono text-xs">src/integrations/</code> and define future adapter interfaces. No OAuth, no API calls, no data is sent externally.
            See <code className="font-mono text-xs">docs/INTEGRATION_BOUNDARIES.md</code> for the full boundary spec.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
