# 🎨 Centralized Styles Architecture Guide

## 📋 Overview

This architecture pattern centralizes all component styles into dedicated `Styles.tsx` files within each feature folder. This approach provides better organization, reusability, and maintainability.

## 🏗️ Folder Structure

```
src/components/
├── screens/
│   ├── home/
│   │   ├── Styles.tsx          ← Centralized styles for home components
│   │   ├── FeaturedPackageCard.tsx
│   │   ├── PackageFilters.tsx
│   │   ├── PackageListItem.tsx
│   │   └── index.ts
│   ├── account/
│   │   ├── Styles.tsx          ← Centralized styles for account components
│   │   ├── PromoCard.tsx
│   │   ├── ProfileForm.tsx
│   │   └── MenuList.tsx
│   └── packages/
│       ├── Styles.tsx          ← Centralized styles for package components
│       ├── PackageCard.tsx
│       └── PackageTabHeader.tsx
└── shared/
    ├── Styles.tsx              ← Centralized styles for shared components
    ├── CustomButton.tsx
    ├── CustomTextInput.tsx
    └── CustomHeader.tsx
```

## 📝 Styles.tsx File Structure

### 1. **Static Styles** (StyleSheet.create)

```typescript
// Static styles that don't depend on theme
export const homeStyles = StyleSheet.create({
  featuredCardIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: mS(48),
    height: mS(48),
  },
  featuredCardCustomerName: {
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: mS(18),
  },
});
```

### 2. **Dynamic Styles** (Functions)

```typescript
// Dynamic styles that depend on theme/props
export const createHomeStyles = {
  featuredCard: {
    container: (Colors: any) => ({
      backgroundColor: Colors.primary,
    }),
    statusText: (Colors: any) => ({
      color: Colors.white,
      lineHeight: mS(16),
    }),
  },
};
```

### 3. **Exported Component Styles**

```typescript
export const featuredCardStyles = {
  static: {
    iconContainer: homeStyles.featuredCardIconContainer,
    customerName: homeStyles.featuredCardCustomerName,
  },
  dynamic: createHomeStyles.featuredCard,
};
```

## 🔧 Usage in Components

### Before (Individual Component Styles)

```typescript
const FeaturedPackageCard = () => {
  const { Colors, Layout, Fonts, Gutters } = useTheme();

  return (
    <View
      style={[
        Gutters.xTinyPadding,
        { backgroundColor: Colors.primary }, // ❌ Inline style
      ]}
    >
      <Text
        style={[
          Fonts.POPPINS_MEDIUM_16,
          { color: Colors.white }, // ❌ Inline style
        ]}
      >
        Title
      </Text>
    </View>
  );
};

// ❌ Styles defined in same file
const styles = StyleSheet.create({
  container: { backgroundColor: "blue" },
});
```

### After (Centralized Styles)

```typescript
import { featuredCardStyles } from "./Styles";

const FeaturedPackageCard = () => {
  const { Colors, Layout, Fonts, Gutters } = useTheme();

  return (
    <View
      style={[
        Gutters.xTinyPadding,
        featuredCardStyles.dynamic.container(Colors), // ✅ Centralized style
      ]}
    >
      <Text
        style={[
          Fonts.POPPINS_MEDIUM_16,
          featuredCardStyles.dynamic.statusText(Colors), // ✅ Centralized style
        ]}
      >
        Title
      </Text>
    </View>
  );
};

// ✅ No styles in component file - all centralized
```

## 🎯 Benefits

### 1. **📦 Centralized Management**

- All styles for related components in one place
- Easy to find and modify styles
- Consistent naming conventions

### 2. **♻️ Reusability**

```typescript
// Share styles across multiple components
export const cardStyles = {
  static: {
    shadow: homeStyles.cardShadow,
    border: homeStyles.cardBorder,
  }
};

// Use in multiple components
<ComponentA style={cardStyles.static.shadow} />
<ComponentB style={cardStyles.static.shadow} />
```

### 3. **🧹 Cleaner Components**

- Components focus on logic, not styling
- Easier to read and maintain
- Better separation of concerns

### 4. **🔄 Easier Maintenance**

- Update styles in one place
- Affects all components using those styles
- Reduces code duplication

### 5. **🎨 Consistency**

- Ensures uniform styling across related components
- Prevents style drift between components
- Enforces design system compliance

## 📚 Best Practices

### 1. **Naming Conventions**

```typescript
// Static styles: {componentName}{StyleName}
featuredCardIconContainer: { /* ... */ }
packageListItemContainer: { /* ... */ }

// Dynamic functions: organized by component
featuredCard: {
  container: (Colors) => ({ /* ... */ }),
  text: (Colors) => ({ /* ... */ })
}
```

### 2. **File Organization**

```typescript
// 1. Imports
import { StyleSheet } from "react-native";
import { mS } from "@/src/utils/helper";

// 2. Static styles
export const screenStyles = StyleSheet.create({
  /* ... */
});

// 3. Dynamic styles
export const createScreenStyles = {
  /* ... */
};

// 4. Exported component styles
export const componentStyles = {
  /* ... */
};
```

### 3. **Theme Integration**

```typescript
// ✅ Still use theme-based values
export const createHomeStyles = {
  featuredCard: {
    container: (Colors: any) => ({
      backgroundColor: Colors.primary, // Theme color
    }),
  },
};

// ✅ Combine with Gutters and Layout
<View
  style={[
    Layout.row, // Theme layout
    Gutters.smallPadding, // Theme spacing
    featuredCardStyles.dynamic.container(Colors), // Custom style
  ]}
/>;
```

### 4. **TypeScript Support**

```typescript
// Define types for better intellisense
interface HomeStylesProps {
  Colors: any;
  isActive?: boolean;
}

export const createHomeStyles = {
  filterButton: (Colors: any, isActive: boolean) => ({
    backgroundColor: isActive ? Colors.primary : Colors.background,
  }),
};
```

## 🚀 Migration Strategy

### Step 1: Create Styles.tsx

```bash
# Create styles file in each feature folder
touch src/components/screens/home/Styles.tsx
touch src/components/screens/account/Styles.tsx
touch src/components/screens/packages/Styles.tsx
```

### Step 2: Move Existing Styles

```typescript
// From component file
const styles = StyleSheet.create({
  container: { backgroundColor: "blue" },
});

// To Styles.tsx
export const homeStyles = StyleSheet.create({
  featuredCardContainer: { backgroundColor: "blue" },
});
```

### Step 3: Update Imports

```typescript
// Add to component
import { featuredCardStyles } from "./Styles";

// Update usage
style={featuredCardStyles.static.container}
```

### Step 4: Remove Old Styles

```typescript
// Remove from component
// const styles = StyleSheet.create({ ... });  ❌
// const createStyles = { ... };               ❌
```

## ✅ Implementation Checklist

- [ ] Create `Styles.tsx` in each feature folder
- [ ] Move static styles to `StyleSheet.create()`
- [ ] Move dynamic styles to function objects
- [ ] Export component-specific style objects
- [ ] Update component imports
- [ ] Update style usage in components
- [ ] Remove old style definitions
- [ ] Test all components
- [ ] Verify no linting errors

## 🎯 Result

Your project now has:

- ✅ **Centralized style management**
- ✅ **Better code organization**
- ✅ **Improved reusability**
- ✅ **Easier maintenance**
- ✅ **Consistent styling**
- ✅ **Performance optimized with StyleSheet.create()**
- ✅ **Theme system compatibility**

This architecture scales well as your project grows and makes it easy for team members to find and modify styles! 🚀
