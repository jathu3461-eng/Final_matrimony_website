import React, { useState, useEffect } from 'react';
import { View as RNView, Text as RNText, Pressable as RNPressable, StyleSheet as RNStyleSheet } from 'react-native';
import SelectField from './SelectField';
import { FormField } from './FormField';
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
    const num = Number(val);
    if (val && !isNaN(num) && num > 0) {
      const { feet, inches } = cmToFtIn(num);
      onChange({ feet: String(feet), inches: String(inches) });
    } else {
      onChange({ feet: '', inches: '' });
    }
  };

  const handleFtChange = (val: string) => {
    onChange({ feet: val, inches: inchesValue || '0' });
  };

  const handleInChange = (val: string) => {
    onChange({ feet: feetValue || '5', inches: val });
  };

  const cmOptions = Array.from({ length: 101 }, (_, i) => 120 + i).map((n) => ({
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
        <RNView style={styles.col}>
          <FormField
            label="Type Height (cm)"
            placeholder="e.g. 168"
            keyboardType="numeric"
            value={cmValue}
            onChangeText={handleCmChange}
            error={errorFeet || errorInches}
          />
          <SelectField
            label="Or Select (cm)"
            options={cmOptions}
            value={cmValue}
            onChange={handleCmChange}
            error={errorFeet || errorInches}
          />
        </RNView>
      ) : (
        <RNView style={styles.col}>
          <RNView style={styles.row}>
            <RNView style={styles.half}>
              <FormField
                label="Feet"
                placeholder="e.g. 5"
                keyboardType="numeric"
                value={feetValue}
                onChangeText={handleFtChange}
                error={errorFeet}
              />
              <SelectField
                label="Or Select Feet"
                options={ftOptions}
                value={feetValue}
                onChange={handleFtChange}
                error={errorFeet}
              />
            </RNView>
            <RNView style={styles.half}>
              <FormField
                label="Inches"
                placeholder="e.g. 6"
                keyboardType="numeric"
                value={inchesValue}
                onChangeText={handleInChange}
                error={errorInches}
              />
              <SelectField
                label="Or Select Inches"
                options={inOptions}
                value={inchesValue}
                onChange={handleInChange}
                error={errorInches}
              />
            </RNView>
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
  col: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
    gap: 4,
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

