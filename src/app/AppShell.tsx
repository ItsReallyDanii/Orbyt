import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MainCanvas from './MainCanvas';
import InspectorRegion from './InspectorRegion';
import PagesView from '../features/pages/PagesView';
import CategoriesView from '../features/categories/CategoriesView';
import ReviewView from '../features/review/ReviewView';
import TemplatesView from '../features/templates/TemplatesView';
import SettingsView from '../features/settings/SettingsView';

export type ViewMode = 'annual' | 'month' | 'daily';
export type SectionId = 'planner' | 'pages' | 'templates' | 'categories' | 'review' | 'settings';

const AppShell: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState<SectionId>('planner');

  // Planner state — only active in planner section
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('annual');
  const [focusedMonth, setFocusedMonth] = useState<number | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleGoToAnnual = () => { setViewMode('annual'); };

  const handleMonthFocus = (month: number) => {
    setFocusedMonth(month);
    setViewMode('month');
  };

  const handleGoToToday = () => {
    setSelectedDate(new Date());
    setViewMode('annual');
    setFocusedMonth(null);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    if (mode === 'annual') setFocusedMonth(null);
    if (mode === 'month' && selectedDate) setFocusedMonth(selectedDate.getMonth());
    setViewMode(mode);
  };

  const isPlannerSection = activeSection === 'planner';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-canvas-bg)] text-[var(--color-text-primary)]">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar only shows planner nav when in planner section */}
        <Topbar
          toggleTheme={toggleTheme}
          theme={theme}
          viewMode={viewMode}
          selectedDate={selectedDate}
          onViewModeChange={handleViewModeChange}
          showPlannerNav={isPlannerSection}
        />
        <div className="flex flex-1 overflow-hidden">
          {isPlannerSection ? (
            <>
              <MainCanvas
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                viewMode={viewMode}
                focusedMonth={focusedMonth}
                onViewModeChange={handleViewModeChange}
                onMonthFocus={handleMonthFocus}
                onGoToAnnual={handleGoToAnnual}
              />
              <InspectorRegion
                selectedDate={selectedDate}
                onGoToToday={handleGoToToday}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
              />
            </>
          ) : (
            <div className="flex flex-1 overflow-hidden">
              {activeSection === 'pages'      && <PagesView />}
              {activeSection === 'templates'  && <TemplatesView />}
              {activeSection === 'categories' && <CategoriesView />}
              {activeSection === 'review'     && <ReviewView />}
              {activeSection === 'settings'   && <SettingsView />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppShell;
