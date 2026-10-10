import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { typography, radius, spacing } from '@/theme';

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string | null;
  hint?: string;
}

export function DatePickerField({ label, value, onChangeText, onBlur, error, hint }: DatePickerFieldProps) {
  const { colors } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      onChangeText(`${year}-${month}-${day}`);
    } else if (Platform.OS === 'ios' && selectedDate) {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        onChangeText(`${year}-${month}-${day}`);
  const handleTextChange = (text: string) => {
    if (/[\/\.\ ]/.test(text)) {
      onChangeText(text);
      return;
    }
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,2})(\d{0,2})$/);
    if (match) {
      let formatted = match[1];
      if (match[2]) formatted += '-' + match[2];
      if (match[3]) formatted += '-' + match[3];
      onChangeText(formatted);
    } else {
      onChangeText(text.substring(0, 10));
    }
  };

  const handleBlur = () => {
    let finalVal = value.trim().replace(/[\/\.\s_]/g, '-');
    const parts = finalVal.split('-');
    if (parts.length === 3) {
      let y = parts[0];
      let m = parts[1];
      let d = parts[2];
      if (d.length === 4 && y.length <= 2) {
        const temp = y;
        y = d;
        d = temp;
      }
      if (y.length === 4) {
        m = m.padStart(2, '0');
        d = d.padStart(2, '0');
        finalVal = `${y}-${m}-${d}`;
      }
    }
    if (finalVal !== value) {
      onChangeText(finalVal);
    }
    if (onBlur) onBlur();
  };

  const parsedDate = value && !isNaN(Date.parse(value)) ? new Date(value) : new Date(2000, 0, 1);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.ink }]}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        { backgroundColor: colors.surface, borderColor: error ? colors.error : colors.border }
      ]}>
        <TextInput
          style={[styles.input, { color: colors.ink }]}
          value={value}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.inkFaint}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
        />
        <Pressable onPress={() => setShowPicker(true)} style={styles.iconButton}>
          <Ionicons name="calendar-outline" size={24} color={colors.primary} />
        </Pressable>
      </View>
      {error ? (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      ) : hint ? (
        <Text style={[styles.hint, { color: colors.inkFaint }]}>{hint}</Text>
      ) : null}

      {showPicker && (
        <DateTimePicker
          value={parsedDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    ...typography.body,
  },
  iconButton: {
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  error: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  hint: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});

