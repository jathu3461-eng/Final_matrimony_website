import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-scale-ui'; // Wait, let's use standard react-native
import { View as RNView, Text as RNText, Pressable as RNPressable, StyleSheet as RNStyleSheet } from 'react-native';
import SelectField from './SelectField';
import { cmToFtIn, ftInToCm } from '../utils/height';
import { colors } from '../theme';

interface HeightSelectorProps {
  feetValue: string;
  inchesValue: string;
  onChange: (vals: { feet: string; inches: string }) => void;
  errorFeet?: string | null;
  errorInches?: string | null;
}

export default function HeightSelector({ feetValue, inchesValue, onChange, errorFeet, errorInches }: HeightSelectorProps) {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [cmValue, setCmValue] = useState<string>('');

  useEffect(() => {
    const f = Number(feetValue);
    const i = Number(inchesValue);
    if (!isNaN(f) && !isNaN(i) && f > 0) {
      setCmValue(String(ftInToCm(f, i)));
    }
  }, [feetValue, inchesValue]);

  const handleCmChange = (val: string) => {
    setCmValue(val);
    if (val) {
      const { feet, inches } = cmToFtIn(Number(val));
      onChange({ feet: String(feet), inches: String(inches) });
    } else {
      onChange({ feet: '', inches: '' });
    }
  };

  const cmOptions = Array.from({ length: 101 }, (_, i) => 120 + i).map((n) => ({
    value: String(n),
    label: `${n} cm`,
  }));

  const ftOptions = [4, 5, 6, 7].map((n) => ({
    value: String(n),
    label: `${n} ft`,
  }));

  const inOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i),
    label: `${i} in`,
  }));

  return (
    <RNView style={styles.container}>
      <RNView style={styles.toggleContainer}>
        <RNPressable
          style={[styles.toggleBtn, unit === 'cm' && styles.toggleBtnActive]}
          onPress={() => setUnit('cm')}
        >
          <RNText style={[styles.toggleText, unit === 'cm' && styles.toggleTextActive]}>Centimeters</RNText>
        </RNPressable>
        <RNPressable
          style={[styles.toggleBtn, unit === 'ft' && styles.toggleBtnActive]}
          onPress={() => setUnit('ft')}
        >
          <RNText style={[styles.toggleText, unit === 'ft' && styles.toggleTextActive]}>Feet & Inches</RNText>
        </RNPressable>
      </RNView>

      {unit === 'cm' ? (
        <SelectField
          label="Height (cm)"
          options={cmOptions}
          value={cmValue}
          onChange={handleCmChange}
          error={errorFeet || errorInches}
        />
      ) : (
        <RNView style={styles.row}>
          <RNView style={styles.half}>
            <SelectField
              label="Height (Feet)"
              options={ftOptions}
              value={feetValue}
              onChange={(val) => onChange({ feet: val, inches: inchesValue })}
              error={errorFeet}
            />
          </RNView>
          <RNView style={styles.half}>
            <SelectField
              label="Height (Inches)"
              options={inOptions}
              value={inchesValue}
              onChange={(val) => onChange({ feet: feetValue, inches: val })}
              error={errorInches}
            />
          </RNView>
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
});
