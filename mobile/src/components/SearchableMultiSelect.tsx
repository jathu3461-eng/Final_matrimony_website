import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { radius, spacing, typography } from '@/theme';

interface SelectOption {
  value: string;
  label: string;
}

interface SearchableMultiSelectProps {
  label: string;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string | null;
  required?: boolean;
  containerStyle?: ViewStyle;
}

export function SearchableMultiSelect({
  label,
  options,
  value = [],
  onChange,
  placeholder = 'Select…',
  error,
  required,
  containerStyle,
}: SearchableMultiSelectProps) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');

  const showError = !!error;

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabels = value
    .map(v => options.find((o) => String(o.value) === String(v))?.label)
    .filter(Boolean);

  const toggleOption = (val: string) => {
    const isSelected = value.includes(val);
    if (isSelected) {
      onChange(value.filter(v => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.inkSoft }]}>
          {label}
          {required && <Text style={{ color: colors.error }}> *</Text>}
        </Text>
        {value.length > 0 && (
          <Pressable onPress={() => onChange([])}>
            <Text style={[styles.clearText, { color: colors.primary }]}>Clear All</Text>
          </Pressable>
        )}
      </View>

      <Pressable
        onPress={() => { setVisible(true); setFocused(true); }}
        style={[
          styles.field,
          { borderColor: colors.border, backgroundColor: colors.surface },
          focused && { borderColor: colors.primary },
          showError && { borderColor: colors.error, backgroundColor: colors.errorSoft },
          value.length > 0 && { borderColor: colors.success },
        ]}
      >
        <Text
          style={[
            styles.value,
            { color: value.length > 0 ? colors.ink : colors.inkFaint },
          ]}
          numberOfLines={1}
        >
          {value.length > 0 ? selectedLabels.join(', ') : placeholder}
        </Text>
        <Ionicons
          name="search"
          size={18}
          color={colors.inkFaint}
        />
      </Pressable>

      {showError && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={13} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      )}

      {value.length > 0 && !visible && (
        <View style={styles.badgesContainer}>
          {selectedLabels.map((lbl, idx) => (
            <View key={idx} style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="checkmark" size={12} color={colors.primaryStrong} />
              <Text style={[styles.badgeText, { color: colors.primaryStrong }]}>{lbl}</Text>
            </View>
          ))}
        </View>
      )}

      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setVisible(false)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.flex1}
          >
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.ink }]}>{label}</Text>
              <Pressable onPress={() => setVisible(false)} hitSlop={10}>
                <Ionicons name="close" size={24} color={colors.ink} />
              </Pressable>
            </View>
            
            <View style={styles.searchContainer}>
              <View style={[styles.searchInputWrapper, { backgroundColor: colors.surfaceSoft, borderColor: colors.border }]}>
                <Ionicons name="search" size={18} color={colors.inkFaint} />
                <TextInput
                  style={[styles.searchInput, { color: colors.ink }]}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  placeholderTextColor={colors.inkFaint}
                  value={search}
                  onChangeText={setSearch}
                  autoCorrect={false}
                />
                {search.length > 0 && (
                  <Pressable onPress={() => setSearch('')}>
                    <Ionicons name="close-circle" size={16} color={colors.inkFaint} />
                  </Pressable>
                )}
              </View>
            </View>

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => String(item.value)}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = value.includes(String(item.value));
                return (
                  <Pressable
                    onPress={() => toggleOption(String(item.value))}
                    style={[
                      styles.option,
                      { borderBottomColor: colors.borderSoft },
                      isSelected && { backgroundColor: colors.primaryLight },
                    ]}
                  >
                    <View style={styles.optionLeft}>
                      <View style={[
                        styles.checkbox,
                        { borderColor: isSelected ? colors.primaryDark : colors.borderStrong },
                        isSelected && { backgroundColor: colors.primaryDark }
                      ]}>
                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          { color: isSelected ? colors.primaryDark : colors.ink },
                          isSelected && { fontWeight: '700' },
                        ]}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: colors.inkFaint }]}>No results found</Text>
                </View>
              }
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
  },
  clearText: {
    ...typography.caption,
    fontWeight: '600',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  value: {
    flex: 1,
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
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
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
  option: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: typography.body.fontSize,
    flex: 1,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
  }
});
