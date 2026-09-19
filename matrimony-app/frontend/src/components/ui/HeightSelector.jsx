import React, { useState, useEffect } from 'react';
import SelectField from './SelectField';
import TextField from './TextField';
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

  const handleCmChange = (e) => {
    const val = e.target.value;
    setCmValue(val);
    const num = Number(val);
    if (val && !isNaN(num) && num > 0) {
      const { feet, inches } = cmToFtIn(num);
      onChange({ feet: String(feet), inches: String(inches) });
    } else {
      onChange({ feet: '', inches: '' });
    }
  };

  const handleFtChange = (e) => {
    const val = e.target.value;
    onChange({ feet: val, inches: inchesValue || '0' });
  };

  const handleInChange = (e) => {
    const val = e.target.value;
    onChange({ feet: feetValue || '5', inches: val });
  };

  // Generate CM options (120 - 220)
  const cmOptions = Array.from({ length: 101 }, (_, i) => 120 + i).map((n) => ({
    value: String(n),
    label: `${n} cm`,
  }));

  // Generate Ft options (4 - 7)
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
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField
              label="Type Height (cm)"
              type="number"
              min="90"
              max="250"
              placeholder="e.g. 168"
              value={cmValue}
              onChange={handleCmChange}
              floating={false}
              error={errorFeet || errorInches}
              right={
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--ink-faint)] pointer-events-none">
                  cm
                </span>
              }
            />
            <SelectField
              label="Or Select from List"
              options={cmOptions}
              value={cmValue}
              onChange={handleCmChange}
              error={errorFeet || errorInches}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <SelectField
                label="Height (Feet)"
                options={ftOptions}
                value={feetValue}
                onChange={handleFtChange}
                error={errorFeet}
              />
              <input
                type="number"
                min="3"
                max="8"
                placeholder="Type feet (e.g. 5)"
                value={feetValue}
                onChange={handleFtChange}
                className="input-base text-xs py-1.5 px-3"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <SelectField
                label="Height (Inches)"
                options={inOptions}
                value={inchesValue}
                onChange={handleInChange}
                error={errorInches}
              />
              <input
                type="number"
                min="0"
                max="11"
                placeholder="Type inches (e.g. 6)"
                value={inchesValue}
                onChange={handleInChange}
                className="input-base text-xs py-1.5 px-3"
              />
            </div>
          </div>
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

