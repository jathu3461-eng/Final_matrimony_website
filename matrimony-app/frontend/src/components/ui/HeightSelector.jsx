import React, { useState, useEffect } from 'react';
import SelectField from './SelectField';
import { cmToFtIn, ftInToCm } from '../../lib/height';

export default function HeightSelector({
  feetValue,
  inchesValue,
  onChange,
  errorFeet,
  errorInches
}) {
  const [unit, setUnit] = useState('cm'); // 'cm' or 'ft'
  const [cmValue, setCmValue] = useState('');

  // Sync internal CM value when props change, but only if they are valid
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

  const handleCmChange = (e) => {
    const val = e.target.value;
    setCmValue(val);
    if (val) {
      const { feet, inches } = cmToFtIn(Number(val));
      onChange({ feet: String(feet), inches: String(inches) });
    } else {
      onChange({ feet: '', inches: '' });
    }
  };

  const handleFtChange = (e) => {
    onChange({ feet: e.target.value, inches: inchesValue });
  };

  const handleInChange = (e) => {
    onChange({ feet: feetValue, inches: e.target.value });
  };

  // Generate CM options (120 - 220)
  const cmOptions = Array.from({ length: 101 }, (_, i) => 120 + i).map((n) => ({
    value: String(n),
    label: `${n} cm`,
  }));

  // Generate Ft options (4 - 7)
  const ftOptions = [4, 5, 6, 7].map((n) => ({
    value: String(n),
    label: `${n} ft`,
  }));

  // Generate In options (0 - 11)
  const inOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i),
    label: `${i} in`,
  }));

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
        <SelectField
          label="Height (cm)"
          options={cmOptions}
          value={cmValue}
          onChange={handleCmChange}
          error={errorFeet || errorInches}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Height (Feet)"
            options={ftOptions}
            value={feetValue}
            onChange={handleFtChange}
            error={errorFeet}
          />
          <SelectField
            label="Height (Inches)"
            options={inOptions}
            value={inchesValue}
            onChange={handleInChange}
            error={errorInches}
          />
        </div>
      )}
    </div>
  );
}
