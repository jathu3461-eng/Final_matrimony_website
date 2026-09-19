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

interface SearchableSelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  required?: boolean;
  containerStyle?: ViewStyle;
}

export function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select…',
  error,
  required,
  containerStyle,
}: SearchableSelectProps) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');

  const selected = options.find((o) => String(o.value) === String(value));
  const showError = !!error;

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { color: colors.inkSoft }]}>
        {label}
        {required && <Text style={{ color: colors.error }}> *</Text>}
      </Text>

      <Pressable
        onPress={() => { setVisible(true); setFocused(true); }}
        style={[
          styles.field,
          { borderColor: colors.border, backgroundColor: colors.surface },
          focused && { borderColor: colors.primary },
          showError && { borderColor: colors.error, backgroundColor: colors.errorSoft },
          selected && { borderColor: colors.success },
        ]}
      >
        <Text
          style={[
            styles.value,
            { color: selected ? colors.ink : colors.inkFaint },
          ]}
          numberOfLines={1}
        >
          {selected ? selected.label : placeholder}
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
                const isSelected = String(item.value) === String(value);
                return (
                  <Pressable
                    onPress={() => {
                      onChange(item.value);
                      setVisible(false);
                      setFocused(false);
                      setSearch('');
                    }}
                    style={[
                      styles.option,
                      { borderBottomColor: colors.borderSoft },
                      isSelected && { backgroundColor: colors.primaryLight },
                    ]}
                  >
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
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color={colors.primaryDark} />
                    )}
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
    marginBottom: spacing.fieldGap,
  },
  label: {
    ...typography.caption,
    fontWeight: '700',
    marginBottom: spacing.sm,
    letterSpacing: 0.2,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
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
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  modalTitle: {
    ...typography.h3,
  },
  searchContainer: {
    padding: spacing.lg,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
