import React, { useState, useEffect } from 'react';
import {
  View as RNView,
  Text as RNText,
  Pressable as RNPressable,
  TextInput as RNTextInput,
  ScrollView as RNScrollView,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cmToFtIn, ftInToCm } from '../utils/height';
import { colors } from '../theme';

interface Option {
  value: string;
  label: string;
}

interface SearchableComboboxProps {
  label: string;
  placeholder?: string;
  options: Option[];
  value: string;
  unitLabel?: string;
  onChange: (val: string) => void;
  error?: string | null;
}

function SearchableCombobox({
  label,
  placeholder = 'Type to search...',
  options,
  value,
  unitLabel = '',
  onChange,
  error,
}: SearchableComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

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

  const cleanQuery = query.toLowerCase().trim();
  const filteredOptions = options.filter((o) => {
    if (!cleanQuery) return true;
    const cleanLabel = o.label.toLowerCase();
    const cleanVal = o.value.toLowerCase();
    return cleanLabel.includes(cleanQuery) || cleanVal.includes(cleanQuery);
  });

  const handleInputChange = (text: string) => {
    setQuery(text);
    setIsOpen(true);

    const match = text.match(/\d+/);
    if (match) {
      onChange(match[0]);
    } else if (!text.trim()) {
      onChange('');
    }
  };

  const handleSelect = (opt: Option) => {
    setQuery(opt.label);
    onChange(opt.value);
    setIsOpen(false);
  };

  return (
    <RNView style={comboboxStyles.container}>
      {label && <RNText style={comboboxStyles.label}>{label}</RNText>}
      <RNView style={[comboboxStyles.inputWrap, error ? comboboxStyles.inputError : null]}>
        <RNTextInput
          style={comboboxStyles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.inkFaint}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
        <RNPressable onPress={() => setIsOpen((prev) => !prev)} style={comboboxStyles.iconBtn}>
          <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.inkFaint} />
        </RNPressable>
      </RNView>

      {isOpen && (
        <RNView style={comboboxStyles.dropdown}>
          <RNScrollView style={comboboxStyles.scroll} keyboardShouldPersistTaps="handled">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <RNPressable
                  key={opt.value}
                  style={[
                    comboboxStyles.item,
                    String(value) === opt.value && comboboxStyles.itemSelected,
                  ]}
                  onPress={() => handleSelect(opt)}
                >
                  <RNText
                    style={[
                      comboboxStyles.itemText,
                      String(value) === opt.value && comboboxStyles.itemTextSelected,
                    ]}
                  >
                    {opt.label}
                  </RNText>
                </RNPressable>
              ))
            ) : (
              <RNView style={comboboxStyles.empty}>
                <RNText style={comboboxStyles.emptyText}>No matching height found</RNText>
              </RNView>
            )}
          </RNScrollView>
        </RNView>
      )}
      {error && <RNText style={comboboxStyles.errorText}>{error}</RNText>}
    </RNView>
  );
}

const comboboxStyles = RNStyleSheet.create({
  container: {
    marginBottom: 12,
    zIndex: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.inkSoft,
    marginBottom: 4,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.ink,
  },
  iconBtn: {
    padding: 4,
  },
  dropdown: {
    maxHeight: 180,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  scroll: {
    maxHeight: 180,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.surfaceSoft,
  },
  itemSelected: {
    backgroundColor: colors.primarySoft,
  },
  itemText: {
    fontSize: 13,
    color: colors.ink,
  },
  itemTextSelected: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  empty: {
    padding: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: colors.inkFaint,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 11,
    color: colors.error,
    marginTop: 2,
  },
});

interface HeightSelectorProps {
  feetValue: string;
  inchesValue: string;
  onChange: (vals: { feet: string; inches: string }) => void;
  errorFeet?: string | null;
  errorInches?: string | null;
}

export default function HeightSelector({
  feetValue,
  inchesValue,
  onChange,
  errorFeet,
  errorInches,
}: HeightSelectorProps) {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [cmValue, setCmValue] = useState<string>('');

  useEffect(() => {
    const f = Number(feetValue);
    const i = Number(inchesValue);
    if (!isNaN(f) && !isNaN(i) && f > 0) {
      setCmValue(String(ftInToCm(f, i)));
    }
  }, [feetValue, inchesValue]);

  const handleCmChange = (valStr: string) => {
    setCmValue(valStr);
    const num = Number(valStr);
    if (valStr && !isNaN(num) && num > 0) {
      const { feet, inches } = cmToFtIn(num);
      onChange({ feet: String(feet), inches: String(inches) });
    } else {
      onChange({ feet: '', inches: '' });
    }
  };

  const handleFtChange = (valStr: string) => {
    onChange({ feet: valStr, inches: inchesValue || '0' });
  };

  const handleInChange = (valStr: string) => {
    onChange({ feet: feetValue || '5', inches: valStr });
  };

  const cmOptions = Array.from({ length: 141 }, (_, i) => 90 + i).map((n) => ({
    value: String(n),
    label: `${n} cm`,
  }));

  const ftOptions = [3, 4, 5, 6, 7].map((n) => ({
    value: String(n),
    label: `${n} ft`,
  }));

  const inOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i),
    label: `${i} in`,
  }));

  const feetNum = Number(feetValue);
  const inchesNum = Number(inchesValue);
  const hasValidHeight = !isNaN(feetNum) && feetNum > 0;
  const currentCm = hasValidHeight ? ftInToCm(feetNum, isNaN(inchesNum) ? 0 : inchesNum) : null;

  return (
    <RNView style={styles.container}>
      {/* Unit Selector Toggle */}
      <RNView style={styles.toggleContainer}>
        <RNPressable
          style={[styles.toggleBtn, unit === 'cm' && styles.toggleBtnActive]}
          onPress={() => setUnit('cm')}
        >
          <RNText style={[styles.toggleText, unit === 'cm' && styles.toggleTextActive]}>
            Centimeters
          </RNText>
        </RNPressable>
        <RNPressable
          style={[styles.toggleBtn, unit === 'ft' && styles.toggleBtnActive]}
          onPress={() => setUnit('ft')}
        >
          <RNText style={[styles.toggleText, unit === 'ft' && styles.toggleTextActive]}>
            Feet & Inches
          </RNText>
        </RNPressable>
      </RNView>

      {unit === 'cm' ? (
        <SearchableCombobox
          label="Height (cm)"
          placeholder="Type e.g. 12 (filters 120cm, 121cm...) or 168"
          options={cmOptions}
          value={cmValue}
          unitLabel="cm"
          onChange={handleCmChange}
          error={errorFeet || errorInches}
        />
      ) : (
        <RNView style={styles.row}>
          <RNView style={styles.half}>
            <SearchableCombobox
              label="Height (Feet)"
              placeholder="Search feet..."
              options={ftOptions}
              value={feetValue}
              unitLabel="ft"
              onChange={handleFtChange}
              error={errorFeet}
            />
          </RNView>
          <RNView style={styles.half}>
            <SearchableCombobox
              label="Height (Inches)"
              placeholder="Search inches..."
              options={inOptions}
              value={inchesValue}
              unitLabel="in"
              onChange={handleInChange}
              error={errorInches}
            />
          </RNView>
        </RNView>
      )}

      {hasValidHeight && (
        <RNView style={styles.previewContainer}>
          <RNText style={styles.previewLabel}>Converted: </RNText>
          <RNText style={styles.previewValue}>
            {feetNum} ft {inchesNum || 0} in ({currentCm} cm)
          </RNText>
        </RNView>
      )}
    </RNView>
  );
}

const styles = RNStyleSheet.create({
  container: {
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.inkSoft,
  },
  toggleTextActive: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  previewLabel: {
    fontSize: 12,
    color: colors.primary,
  },
  previewValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
