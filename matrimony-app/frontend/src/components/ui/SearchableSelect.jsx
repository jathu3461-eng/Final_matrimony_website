import React, { useState, useEffect, useRef, useId } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import FieldMessage from './FieldMessage';

export default function SearchableSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Search...',
  error,
  help,
  success,
  required,
  icon,
  className = '',
  name,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const autoId = useId();
  const inputId = `search-sf-${autoId}`;
  const msgId = `${inputId}-msg`;
  const hasMsg = !!(error || success || help);
  const stateClass = error ? 'input-error' : success ? 'input-success' : '';

  // Sync internal search query when value changes from outside
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      const found = options.find((o) => String(o.value) === String(value));
      setQuery(found ? found.label : String(value));
    } else {
      setQuery('');
    }
  }, [value, options]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        // If they typed something but didn't select, revert query back to selected value label
        const found = options.find((o) => String(o.value) === String(value));
        setQuery(found ? found.label : (value ? String(value) : ''));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, options]);

  // Filter options based on user input
  const cleanQuery = query.toLowerCase().trim();
  const filteredOptions = options.filter((o) => {
    // If the query exactly matches the current selected value's label, show all options
    const selectedOpt = options.find(opt => String(opt.value) === String(value));
    if (selectedOpt && query === selectedOpt.label) return true;

    if (!cleanQuery) return true;
    const cleanLabel = String(o.label).toLowerCase();
    return cleanLabel.includes(cleanQuery);
  });

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (opt) => {
    setQuery(opt.label);
    if (onChange) {
      onChange({ target: { name, value: opt.value } });
    }
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setQuery('');
    if (onChange) {
      onChange({ target: { name, value: '' } });
    }
    inputRef.current?.focus();
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className={`relative flex flex-col w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-[var(--ink-soft)] mb-1.5">
          {label}
          {required && <span className="text-[var(--error)]"> *</span>}
        </label>
      )}
      
      <div className="relative group">
        {icon ? (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-faint)] pointer-events-none" aria-hidden="true">
            {icon}
          </span>
        ) : (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-faint)] pointer-events-none" aria-hidden="true">
            <Search className="w-4 h-4" />
          </span>
        )}
        
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          className={`input-base pl-10 pr-16 ${stateClass} group-focus-within:border-[var(--primary)] text-ellipsis whitespace-nowrap overflow-hidden`}
          placeholder={placeholder}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={handleInputChange}
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={hasMsg ? msgId : undefined}
          required={required && !value}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[var(--ink-faint)] hover:text-[var(--error)] p-1 rounded-full transition-colors focus:outline-none"
              aria-label="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[var(--ink-faint)] group-focus-within:text-[var(--primary)] transition-colors pointer-events-none border-l border-[var(--border)] pl-1.5 ml-0.5">
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </div>

      {/* Filtered Search Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto bg-[var(--surface)] border border-[var(--border-strong)] rounded-xl shadow-[var(--shadow-elevated)] z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => {
              const isSelected = String(value) === String(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between group/item ${
                    isSelected 
                      ? 'bg-[var(--primary-soft)] text-[var(--primary-strong)] font-bold' 
                      : 'text-[var(--ink)] hover:bg-[var(--surface-soft)] font-medium hover:text-[var(--primary)]'
                  }`}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  {isSelected && (
                    <span className="text-[var(--primary)]">✓</span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-4 text-center text-sm font-medium text-[var(--ink-faint)]">
              No results found
            </div>
          )}
        </div>
      )}
      
      <FieldMessage error={error} success={success} help={help} id={msgId} />
    </div>
  );
}
