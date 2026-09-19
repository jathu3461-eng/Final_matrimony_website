import { forwardRef, useState, useEffect, useRef, useId } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import FieldMessage from './FieldMessage';
import { COUNTRIES, parsePhoneNumber } from '../../lib/countries';

const PhoneNumberField = forwardRef(function PhoneNumberField(
  {
    label,
    error,
    success,
    help,
    required,
    className = '',
    inputClassName = '',
    id,
    value,
    onChange,
    onBlur,
    name,
    ...rest
  },
  ref
) {
  const autoId = useId();
  const inputId = id || `pn-${autoId}`;
  const msgId = `${inputId}-msg`;
  const hasMsg = !!(error || success || help);
  const stateClass = error ? 'input-error' : success ? 'input-success' : '';

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  // Parse initial value to set state
  const initialParsed = parsePhoneNumber(value || '');
  const [selectedCountry, setSelectedCountry] = useState(initialParsed.country);
  const [localNumber, setLocalNumber] = useState(initialParsed.localNumber);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    // If external value changes (e.g. form reset), update internal state
    if (value === '' && localNumber !== '') {
      setLocalNumber('');
      setSelectedCountry(COUNTRIES[0]);
    } else if (value && typeof value === 'string') {
      const parsed = parsePhoneNumber(value);
      // Only update if it's different to prevent loops
      if (parsed.localNumber !== localNumber || parsed.country.dialCode !== selectedCountry.dialCode) {
        setSelectedCountry(parsed.country);
        setLocalNumber(parsed.localNumber);
      }
    }
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocalNumberChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d+]/g, '');
    
    // If user pasted something like +94771234567, parse it
    if (rawValue.startsWith('+')) {
      const parsed = parsePhoneNumber(rawValue);
      if (parsed.country.dialCode === selectedCountry.dialCode) {
        rawValue = parsed.localNumber;
      } else {
        // Option: switch to the newly pasted country code
        setSelectedCountry(parsed.country);
        rawValue = parsed.localNumber;
      }
    } else {
      // Sometimes users paste the dial code without +, like 94771234567
      const dialCodeNoPlus = selectedCountry.dialCode.replace('+', '');
      if (rawValue.startsWith(dialCodeNoPlus)) {
        // Be careful: what if the local number actually starts with those digits?
        // In many places, it's safer to just strip it if it looks like they pasted the full number
        // We'll leave it simple for now and rely on the '+' paste logic mostly.
      }
      rawValue = rawValue.replace(/[^\d]/g, '');
    }

    setLocalNumber(rawValue);
    triggerChange(selectedCountry, rawValue);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch('');
    triggerChange(country, localNumber);
  };

  const triggerChange = (country, number) => {
    if (onChange) {
      // Create a synthetic event object for react-hook-form
      const fullNumber = number ? `${country.dialCode}${number}` : '';
      const event = {
        target: { name, value: fullNumber },
      };
      onChange(event);
    }
  };

  const handleBlur = (e) => {
    if (onBlur) {
      const fullNumber = localNumber ? `${selectedCountry.dialCode}${localNumber}` : '';
      onBlur({ target: { name, value: fullNumber } });
    }
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search)
  );

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-[var(--ink-soft)] mb-1.5">
          {label}
          {required && <span className="text-[var(--error)]"> *</span>}
        </label>
      )}
      
      <div className={`relative flex items-center border rounded-lg transition-colors bg-white ${
        error ? 'border-[var(--error)] ring-1 ring-[var(--error)]' 
        : success ? 'border-[var(--success)] ring-1 ring-[var(--success)]'
        : 'border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-1 focus-within:ring-[var(--primary)]'
      }`}>
        
        {/* Country Selector Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-3 h-full bg-[var(--surface-soft)] rounded-l-lg border-r border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="text-lg leading-none" aria-hidden="true">{selectedCountry.flag}</span>
            <span className="text-sm font-semibold text-[var(--ink)]">{selectedCountry.dialCode}</span>
            <ChevronDown className="w-4 h-4 text-[var(--ink-faint)]" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-1 w-64 max-h-72 bg-white rounded-xl shadow-xl border border-[var(--border)] z-50 flex flex-col overflow-hidden"
              >
                <div className="p-2 border-b border-[var(--border)]">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-faint)]" />
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-1.5 text-sm bg-[var(--surface-soft)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--primary)]"
                      placeholder="Search country..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <ul className="overflow-y-auto flex-1 p-1" role="listbox">
                  {filteredCountries.map((c) => (
                    <li key={c.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selectedCountry.code === c.code}
                        onClick={() => handleCountrySelect(c)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                          selectedCountry.code === c.code
                            ? 'bg-[var(--primary-light)] text-[var(--primary-dark)] font-bold'
                            : 'hover:bg-[var(--surface-soft)] text-[var(--ink)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg leading-none">{c.flag}</span>
                          <span className="truncate max-w-[120px] text-left">{c.name}</span>
                        </div>
                        <span className="text-[var(--ink-faint)]">{c.dialCode}</span>
                      </button>
                    </li>
                  ))}
                  {filteredCountries.length === 0 && (
                    <li className="px-3 py-4 text-center text-sm text-[var(--ink-faint)]">
                      No countries found.
                    </li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Local Number Input */}
        <input
          id={inputId}
          ref={ref}
          type="tel"
          name={name}
          value={localNumber}
          onChange={handleLocalNumberChange}
          onBlur={handleBlur}
          placeholder="77 123 4567"
          className={`flex-1 min-w-0 px-3 py-3 bg-transparent text-sm font-semibold text-[var(--ink)] focus:outline-none placeholder:text-[var(--ink-faint)] placeholder:font-normal ${inputClassName}`}
          aria-invalid={!!error}
          aria-describedby={hasMsg ? msgId : undefined}
          required={required}
          {...rest}
        />
      </div>
      
      <FieldMessage error={error} success={success} help={help} id={msgId} />
    </div>
  );
});

export default PhoneNumberField;
