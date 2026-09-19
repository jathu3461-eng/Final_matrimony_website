import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cmToFtIn, ftInToCm } from '../../lib/height';

function SearchableCombobox({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Type to search...',
  unitLabel = '',
  error
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);

  // Sync internal search query when value changes from outside
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      const found = options.find((o) => o.value === String(value));
      if (found) {
        setQuery(found.label);
      } else {
        setQuery(unitLabel ? `${value} ${unitLabel}` : String(value));
      }
    } else {
      setQuery('');
    }
  }, [value, options, unitLabel]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on user input
  const cleanQuery = query.toLowerCase().trim();
  const filteredOptions = options.filter((o) => {
    if (!cleanQuery) return true;
    const cleanLabel = o.label.toLowerCase();
    const cleanVal = o.value.toLowerCase();
    return cleanLabel.includes(cleanQuery) || cleanVal.includes(cleanQuery);
  });

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);

    const match = val.match(/\d+/);
    if (match) {
      onChange(match[0]);
    } else if (!val.trim()) {
      onChange('');
    }
  };

  const handleSelectOption = (opt) => {
    setQuery(opt.label);
    onChange(opt.value);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-1.5 w-full">
      {label && (
        <label className="block text-xs font-bold text-[var(--ink-soft)]">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type="text"
          className={`input-base pr-10 ${error ? 'input-error' : ''}`}
          placeholder={placeholder}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={handleInputChange}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ink-faint)] group-focus-within:text-[var(--primary)] transition-colors">
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </div>

      {/* Filtered Search Dropdown */}
      {isOpen && (
        <ul className="absolute left-0 right-0 top-full mt-1 max-h-56 overflow-y-auto bg-white border border-[var(--border)] rounded-xl shadow-lg z-50 py-1 text-xs">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelectOption(opt)}
                className={`px-3.5 py-2 cursor-pointer hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] font-medium transition-colors ${
                  String(value) === opt.value ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-bold' : 'text-[var(--ink)]'
                }`}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="px-3.5 py-2.5 text-[var(--ink-faint)] italic">
              No matching height. Custom value will be saved.
            </li>
          )}
        </ul>
      )}
      {error && <span className="text-[11px] font-semibold text-[var(--error)] mt-0.5">{error}</span>}
    </div>
  );
}

export default function HeightSelector({
  feetValue,
  inchesValue,
  onChange,
  errorFeet,
  errorInches
}) {
  const [unit, setUnit] = useState('cm');
  const [cmValue, setCmValue] = useState('');

  // Sync internal CM value when props change
  useEffect(() => {
    const f = Number(feetValue);
    const i = Number(inchesValue);
    if (!isNaN(f) && !isNaN(i) && f > 0) {
      setCmValue(String(ftInToCm(f, i)));
    }
  }, [feetValue, inchesValue]);

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit);
  };

  const handleCmChange = (valStr) => {
    setCmValue(valStr);
    const num = Number(valStr);
    if (valStr && !isNaN(num) && num > 0) {
      const { feet, inches } = cmToFtIn(num);
      onChange({ feet: String(feet), inches: String(inches) });
    } else {
      onChange({ feet: '', inches: '' });
    }
  };

  const handleFtChange = (valStr) => {
    onChange({ feet: valStr, inches: inchesValue || '0' });
  };

  const handleInChange = (valStr) => {
    onChange({ feet: feetValue || '5', inches: valStr });
  };

  // Generate CM options (90 - 230)
  const cmOptions = Array.from({ length: 141 }, (_, i) => 90 + i).map((n) => ({
    value: String(n),
    label: `${n} cm`,
  }));

  // Generate Ft options (3 - 7)
  const ftOptions = [3, 4, 5, 6, 7].map((n) => ({
    value: String(n),
    label: `${n} ft`,
  }));

  // Generate In options (0 - 11)
  const inOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i),
    label: `${i} in`,
  }));

  const feetNum = Number(feetValue);
  const inchesNum = Number(inchesValue);
  const hasValidHeight = !isNaN(feetNum) && feetNum > 0;
  const currentCm = hasValidHeight ? ftInToCm(feetNum, isNaN(inchesNum) ? 0 : inchesNum) : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Unit Toggle */}
      <div className="flex bg-[var(--surface-soft)] p-1 rounded-xl border border-[var(--border)] max-w-fit">
        <button
          type="button"
          onClick={() => handleUnitToggle('cm')}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            unit === 'cm'
              ? 'bg-[var(--primary)] text-white shadow-sm'
              : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
          }`}
        >
          Centimeters
        </button>
        <button
          type="button"
          onClick={() => handleUnitToggle('ft')}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            unit === 'ft'
              ? 'bg-[var(--primary)] text-white shadow-sm'
              : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
          }`}
        >
          Feet & Inches
        </button>
      </div>

      {/* Fields */}
      {unit === 'cm' ? (
        <SearchableCombobox
          label="Height (cm)"
          placeholder="Type e.g. 12 (filters 120cm, 121cm...) or 168 cm"
          options={cmOptions}
          value={cmValue}
          unitLabel="cm"
          onChange={handleCmChange}
          error={errorFeet || errorInches}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <SearchableCombobox
            label="Height (Feet)"
            placeholder="Search feet..."
            options={ftOptions}
            value={feetValue}
            unitLabel="ft"
            onChange={handleFtChange}
            error={errorFeet}
          />
          <SearchableCombobox
            label="Height (Inches)"
            placeholder="Search inches..."
            options={inOptions}
            value={inchesValue}
            unitLabel="in"
            onChange={handleInChange}
            error={errorInches}
          />
        </div>
      )}

      {/* Dynamic Summary Preview */}
      {hasValidHeight && (
        <div className="text-xs font-medium text-[var(--primary)] bg-[var(--primary-soft)] px-3 py-1.5 rounded-lg border border-[var(--primary-soft)] inline-flex items-center gap-1.5 max-w-fit">
          <span>Converted:</span>
          <span className="font-bold">
            {feetNum} ft {inchesNum || 0} in ({currentCm} cm)
          </span>
        </div>
      )}
    </div>
  );
}
