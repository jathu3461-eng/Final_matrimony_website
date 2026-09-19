import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  SafeAreaView,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { radius, spacing, typography } from '@/theme';
import { COUNTRIES, Country, parsePhoneNumber } from '@/lib/countries';

interface PhoneNumberInputProps extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  error?: string | null;
  hint?: string;
  containerStyle?: ViewStyle;
  value?: string;
  onChangeText?: (value: string) => void;
}

export function PhoneNumberInput({
  label,
  error,
  hint,
  containerStyle,
  value,
  onChangeText,
  ...rest
}: PhoneNumberInputProps) {
  const { colors } = useTheme();
  
  const initialParsed = parsePhoneNumber(value || '');
  const [selectedCountry, setSelectedCountry] = useState<Country>(initialParsed.country);
  const [localNumber, setLocalNumber] = useState(initialParsed.localNumber);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);

  const showError = !!error;
  const showHint = !error && !!hint && !value;

  useEffect(() => {
    if (value === '' && localNumber !== '') {
      setLocalNumber('');
      setSelectedCountry(COUNTRIES[0]);
    } else if (value && typeof value === 'string') {
      const parsed = parsePhoneNumber(value);
      if (parsed.localNumber !== localNumber || parsed.country.dialCode !== selectedCountry.dialCode) {
        setSelectedCountry(parsed.country);
        setLocalNumber(parsed.localNumber);
      }
    }
  }, [value]);

  const handleLocalNumberChange = (text: string) => {
    let rawValue = text.replace(/[^\d+]/g, '');
    
    if (rawValue.startsWith('+')) {
      const parsed = parsePhoneNumber(rawValue);
      if (parsed.country.dialCode === selectedCountry.dialCode) {
        rawValue = parsed.localNumber;
      } else {
        setSelectedCountry(parsed.country);
        rawValue = parsed.localNumber;
      }
    } else {
      rawValue = rawValue.replace(/[^\d]/g, '');
    }

    setLocalNumber(rawValue);
    
    if (onChangeText) {
      onChangeText(rawValue ? `${selectedCountry.dialCode}${rawValue}` : '');
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearch('');
    
    if (onChangeText) {
      onChangeText(localNumber ? `${country.dialCode}${localNumber}` : '');
    }
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search)
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { color: colors.inkSoft }]}>{label}</Text>

      <View
        style={[
          styles.field,
          { borderColor: colors.border, backgroundColor: colors.surface },
          focused && { borderColor: colors.primary },
          showError && { borderColor: colors.error, backgroundColor: colors.errorSoft },
        ]}
      >
        <Pressable 
          style={[styles.countrySelector, { borderRightColor: colors.border }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={[styles.dialCode, { color: colors.ink }]}>{selectedCountry.dialCode}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.inkFaint} />
        </Pressable>

        <TextInput
          style={[styles.input, { color: colors.ink }]}
          placeholder="77 123 4567"
          placeholderTextColor={colors.inkFaint}
          keyboardType="phone-pad"
          value={localNumber}
          onChangeText={handleLocalNumberChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
      </View>

      {showError && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={13} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      )}
      {!showError && showHint && (
        <Text style={[styles.hintText, { color: colors.inkFaint }]}>{hint}</Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.ink }]}>Select Country</Text>
            <Pressable onPress={() => setModalVisible(false)} hitSlop={10}>
              <Ionicons name="close" size={24} color={colors.ink} />
            </Pressable>
          </View>
          
          <View style={styles.searchContainer}>
            <View style={[styles.searchInputWrapper, { backgroundColor: colors.surfaceSoft, borderColor: colors.border }]}>
              <Ionicons name="search" size={18} color={colors.inkFaint} />
              <TextInput
                style={[styles.searchInput, { color: colors.ink }]}
                placeholder="Search country..."
                placeholderTextColor={colors.inkFaint}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.countryItem,
                  { borderBottomColor: colors.borderSoft },
                  selectedCountry.code === item.code && { backgroundColor: colors.primaryLight }
                ]}
                onPress={() => handleCountrySelect(item)}
              >
                <View style={styles.countryItemLeft}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={[
                    styles.countryName, 
                    { color: selectedCountry.code === item.code ? colors.primaryDark : colors.ink },
                    selectedCountry.code === item.code && { fontWeight: 'bold' }
                  ]}>
                    {item.name}
                  </Text>
                </View>
                <Text style={[styles.countryDialCode, { color: colors.inkFaint }]}>{item.dialCode}</Text>
              </Pressable>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: radius.md,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRightWidth: 1,
    gap: 4,
  },
  flag: {
    fontSize: 20,
  },
  dialCode: {
    ...typography.body,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    fontSize: typography.body.fontSize,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  errorText: {
    ...typography.label,
    flex: 1,
  },
  hintText: {
    ...typography.label,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  modalTitle: {
    ...typography.h3,
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  countryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  countryName: {
    ...typography.body,
  },
  countryDialCode: {
    ...typography.body,
  }
});
