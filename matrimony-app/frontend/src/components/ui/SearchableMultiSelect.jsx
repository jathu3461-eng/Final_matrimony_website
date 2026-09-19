import React, { useState, useEffect, useRef, useId } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';
import FieldMessage from './FieldMessage';

export default function SearchableMultiSelect({
  label,
  options = [],
  value = [],
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
  const inputId = `search-msf-${autoId}`;
  const msgId = `${inputId}-msg`;
  const hasMsg = !!(error || success || help);
  const stateClass = error ? 'input-error' : success ? 'input-success' : '';

  const selectedValues = Array.isArray(value) ? value : [];
  
  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on user input
  const cleanQuery = query.toLowerCase().trim();
  const filteredOptions = options.filter((o) => {
    if (!cleanQuery) return true;
    return String(o.label).toLowerCase().includes(cleanQuery);
  });

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleToggleOption = (opt) => {
    let newValues;
    if (selectedValues.includes(opt.value)) {
      newValues = selectedValues.filter(v => v !== opt.value);
    } else {
      newValues = [...selectedValues, opt.value];
    }
    
    if (onChange) {
      onChange({ target: { name, value: newValues } });
    }
    // Don't close so they can select multiple
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (query) {
      setQuery('');
    } else {
      if (onChange) {
        onChange({ target: { name, value: [] } });
      }
    }
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const selectedLabels = selectedValues
    .map(val => options.find(o => String(o.value) === String(val))?.label)
    .filter(Boolean);

  return (
    <div ref={wrapperRef} className={`relative flex flex-col w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-[var(--ink-soft)] mb-1.5 flex justify-between">
          <span>{label}{required && <span className="text-[var(--error)]"> *</span>}</span>
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange && onChange({ target: { name, value: [] } }); }}
              className="text-[10px] text-[var(--primary)] hover:underline"
            >
              Clear All
            </button>
          )}
        </label>
      )}
      
      <div className="relative group">
        {icon ? (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-faint)] pointer-events-none" aria-hidden="true">
            {icon}
          </span>
        ) : (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-faint)] pointer-events-none" aria-hidden="true">
            <Search className="w-[18px] h-[18px]" />
          </span>
        )}
        
        <div 
          className={`input-base !pl-11 !pr-16 ${stateClass} group-focus-within:border-[var(--primary)] flex flex-wrap gap-1 items-center min-h-[56px] h-auto py-1.5 cursor-text`}
          onClick={() => { inputRef.current?.focus(); setIsOpen(true); }}
        >
          {selectedLabels.length > 0 && !query && !isOpen ? (
            <span className="text-sm truncate max-w-full">
              {selectedLabels.join(', ')}
            </span>
          ) : (
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none min-w-[60px] text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)]"
              placeholder={selectedValues.length > 0 ? '' : placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              autoComplete="off"
              aria-invalid={!!error}
              aria-describedby={hasMsg ? msgId : undefined}
            />
          )}
        </div>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {(query || selectedValues.length > 0) && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[var(--ink-faint)] hover:text-[var(--error)] p-1 rounded-full transition-colors focus:outline-none"
              aria-label="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[var(--ink-faint)] group-focus-within:text-[var(--primary)] transition-colors pointer-events-none border-l border-[var(--border)] pl-1.5 ml-0.5">
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </div>

      {/* Selected Items Badges below input */}
      {selectedLabels.length > 0 && !isOpen && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selectedLabels.map((sl, idx) => (
             <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--primary-soft)] text-[var(--primary-strong)] text-[11px] font-bold">
               <Check className="w-3 h-3" />
               {sl}
             </span>
          ))}
        </div>
      )}

      {/* Filtered Search Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto bg-[var(--surface)] border border-[var(--border-strong)] rounded-xl shadow-[var(--shadow-elevated)] z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleToggleOption(opt)}
                  className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center gap-3 group/item ${
                    isSelected 
                      ? 'bg-[var(--primary-soft)] text-[var(--primary-strong)] font-bold' 
                      : 'text-[var(--ink)] hover:bg-[var(--surface-soft)] font-medium hover:text-[var(--primary)]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-[var(--border-strong)]'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="truncate">{opt.label}</span>
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
