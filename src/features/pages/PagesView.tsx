import React, { useState } from 'react';
import type { Page } from '../../core/schema';
import {
  usePages,
  useChildPages,
  addPage,
  updatePage,
  deletePage,
} from '../../core/store';

/* ── Subnote list for a parent page ── */
const SubnoteList: React.FC<{
  parentId: string;
  selectedId: string | null;
  onSelect: (page: Page) => void;
}> = ({ parentId, selectedId, onSelect }) => {
  const children = useChildPages(parentId);
  if (children.length === 0) return null;
  return (
    <div className="ml-4 flex flex-col gap-0.5 mt-0.5">
      {children.map(child => (
        <button
          key={child.id}
          onClick={() => onSelect(child)}
          className={`text-left px-2 py-1.5 rounded-lg text-xs truncate transition-colors ${
            selectedId === child.id
              ? 'bg-[var(--color-accent)] text-white'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-canvas-bg)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          ↳ {child.title}
        </button>
      ))}
    </div>
  );
};

/* ── Main Pages view ── */
const PagesView: React.FC = () => {
  const pages = usePages();
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  /* Sync editor when selection changes */
  const handleSelect = (page: Page) => {
    if (isDirty && selectedPage) {
      // auto-save before switching
      updatePage(selectedPage.id, { title: editTitle, body: editBody });
    }
    setSelectedPage(page);
    setEditTitle(page.title);
    setEditBody(page.body);
    setIsDirty(false);
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    await updatePage(selectedPage.id, { title: editTitle.trim() || 'Untitled', body: editBody });
    setIsDirty(false);
  };

  const handleNewPage = async () => {
    const id = await addPage({ title: 'New Page' });
    // Select the new page immediately
    const page: Page = {
      id,
      title: 'New Page',
      body: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    handleSelect(page);
  };

  const handleNewSubnote = async () => {
    if (!selectedPage) return;
    const id = await addPage({ title: 'New Subnote', parentId: selectedPage.id });
    const sub: Page = {
      id,
      title: 'New Subnote',
      body: '',
      parentId: selectedPage.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    handleSelect(sub);
  };

  const handleDelete = async () => {
    if (!selectedPage) return;
    await deletePage(selectedPage.id);
    setSelectedPage(null);
    setEditTitle('');
    setEditBody('');
    setIsDirty(false);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Sidebar list ── */}
      <div className="w-64 flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-panel-bg)] flex flex-col">
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">Pages</span>
          <button
            onClick={handleNewPage}
            className="px-2.5 py-1 bg-[var(--color-accent)] text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
            title="New page"
          >
            + New
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
          {pages.length === 0 && (
            <p className="text-xs text-[var(--color-text-secondary)] text-center mt-8 px-4">
              No pages yet. Click <strong>+ New</strong> to create one.
            </p>
          )}
          {pages.map(page => (
            <div key={page.id}>
              <button
                onClick={() => handleSelect(page)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                  selectedPage?.id === page.id
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-canvas-bg)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                📄 {page.title}
              </button>
              <SubnoteList
                parentId={page.id}
                selectedId={selectedPage?.id ?? null}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Editor ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-canvas-bg)]">
        {selectedPage ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center gap-3 px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-panel-bg)]">
              <input
                value={editTitle}
                onChange={e => { setEditTitle(e.target.value); setIsDirty(true); }}
                onBlur={handleSave}
                className="flex-1 text-lg font-semibold bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]"
                placeholder="Page title"
              />
              <div className="flex items-center gap-2">
                {isDirty && (
                  <button
                    onClick={handleSave}
                    className="px-3 py-1.5 bg-[var(--color-accent)] text-white rounded-lg text-xs font-medium hover:opacity-90"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={handleNewSubnote}
                  className="px-3 py-1.5 bg-[var(--color-panel-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-lg text-xs font-medium hover:text-[var(--color-text-primary)] transition-colors"
                  title="Add subnote under this page"
                >
                  + Subnote
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1.5 border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-red-500 hover:border-red-400 rounded-lg text-xs font-medium transition-colors"
                  title="Delete this page"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Body */}
            <textarea
              value={editBody}
              onChange={e => { setEditBody(e.target.value); setIsDirty(true); }}
              onBlur={handleSave}
              placeholder={`Write your notes here…\n\nTip: Use [[Page Title]] to reference another page.`}
              className="flex-1 resize-none p-6 bg-transparent text-[var(--color-text-primary)] text-sm leading-relaxed outline-none placeholder-[var(--color-text-secondary)] font-mono"
              spellCheck={true}
            />

            {/* Footer meta */}
            <div className="px-6 py-2 text-xs text-[var(--color-text-secondary)] border-t border-[var(--color-border)] bg-[var(--color-panel-bg)] flex gap-4">
              <span>Created {new Date(selectedPage.createdAt).toLocaleDateString()}</span>
              <span>·</span>
              <span>Updated {new Date(selectedPage.updatedAt).toLocaleDateString()}</span>
              {selectedPage.parentId && <span className="text-[var(--color-accent)]">↳ subnote</span>}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
            <div className="text-5xl opacity-30">📄</div>
            <p className="text-[var(--color-text-secondary)] text-sm">Select a page from the list, or create a new one.</p>
            <button
              onClick={handleNewPage}
              className="px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              + New Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagesView;
