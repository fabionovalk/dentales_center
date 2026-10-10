import { useLanguage } from '@/context/LanguageContext';

const PERIODS = ['all', 'today', 'upcoming', 'past'];
const PERIOD_KEYS = {
  all: 'periodAll',
  today: 'periodToday',
  upcoming: 'periodUpcoming',
  past: 'periodPast',
};

const SORTS = ['default', 'dateAsc', 'dateDesc', 'nameAsc', 'createdDesc'];
const SORT_KEYS = {
  default: 'sortDefault',
  dateAsc: 'sortDateAsc',
  dateDesc: 'sortDateDesc',
  nameAsc: 'sortName',
  createdDesc: 'sortCreated',
};

const INPUT_CLASS = 'w-full border-2 border-gold-light rounded-md h-10 px-3 text-sm text-gold-dark bg-white outline-none focus:border-gold';
const LABEL_CLASS = 'text-xs text-gold-dark/60 block mb-1';

export default function AppointmentFilters({ filters, onChange, onReset, statuses, resultCount, isDirty }) {
  const { t } = useLanguage();

  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3 xl:flex xl:items-end">
          <label className="sm:col-span-2 lg:col-span-3 xl:flex-1 xl:min-w-40">
            <span className={LABEL_CLASS}>{t('admin.filters.searchLabel')}</span>
            <input
              type="search"
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              placeholder={t('admin.filters.search')}
              className={INPUT_CLASS}
            />
          </label>

          <label className="xl:w-36">
            <span className={LABEL_CLASS}>{t('admin.filters.status')}</span>
            <select value={filters.status} onChange={(e) => update('status', e.target.value)} className={INPUT_CLASS}>
              <option value="all">{t('admin.filters.allStatuses')}</option>
              {statuses.map(s => (
                <option key={s} value={s}>{t(`status.${s}`)}</option>
              ))}
            </select>
          </label>

          <label className="xl:w-32">
            <span className={LABEL_CLASS}>{t('admin.filters.period')}</span>
            <select value={filters.period} onChange={(e) => update('period', e.target.value)} className={INPUT_CLASS}>
              {PERIODS.map(p => (
                <option key={p} value={p}>{t(`admin.filters.${PERIOD_KEYS[p]}`)}</option>
              ))}
            </select>
          </label>

          <label className="xl:w-36">
            <span className={LABEL_CLASS}>{t('admin.filters.from')}</span>
            <input
              type="date"
              value={filters.from}
              max={filters.to || undefined}
              onChange={(e) => update('from', e.target.value)}
              className={INPUT_CLASS}
            />
          </label>

          <label className="xl:w-36">
            <span className={LABEL_CLASS}>{t('admin.filters.to')}</span>
            <input
              type="date"
              value={filters.to}
              min={filters.from || undefined}
              onChange={(e) => update('to', e.target.value)}
              className={INPUT_CLASS}
            />
          </label>

          <label className="xl:w-48">
            <span className={LABEL_CLASS}>{t('admin.filters.sort')}</span>
            <select value={filters.sort} onChange={(e) => update('sort', e.target.value)} className={INPUT_CLASS}>
              {SORTS.map(s => (
                <option key={s} value={s}>{t(`admin.filters.${SORT_KEYS[s]}`)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <span className="text-sm text-gold-dark">
          {resultCount} {t('admin.filters.results')}
        </span>
        {isDirty && (
          <button onClick={onReset} className="text-sm font-semibold text-gold-dark hover:underline">
            {t('admin.filters.clear')}
          </button>
        )}
      </div>
    </div>
  );
}
