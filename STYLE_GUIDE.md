# Shri Krishna Leela Enterprises - Style Guide

## 🎨 **Brand Color Palette**

### Primary Colors
- **Saddle Brown**: `#8b4513` - Main brand color, used for headings and primary elements
- **Dark Goldenrod**: `#b8860b` - Secondary brand color, used for accents and highlights
- **Khaki**: `#f0e68c` - Accent color, used for highlights and active states

### Background Colors
- **Warm White**: `#f8f6f3` - Main background color
- **Light Beige**: `#ede8e0` - Secondary background (gradients)
- **Soft Beige**: `#e2ddd5` - Tertiary background (gradients)

### Text Colors
- **Dark Brown**: `#3a3530` - Primary text color
- **Medium Brown**: `#8b7d6b` - Secondary text and descriptions
- **Light Brown**: `#8b7d6b` - Subtle text elements

### Functional Colors
- **Navigation**: `rgba(139, 125, 107, 0.95)` - Header background with transparency
- **Hover Effects**: `rgba(240, 230, 140, 0.2)` - Background for active/hover states
- **Shadows**: `rgba(0,0,0,0.1)` to `rgba(139,69,19,0.3)` - Various shadow intensities

## 📝 **Typography**

### Font Family
- **Primary**: `'Georgia', serif` - Used for all text, headings, and body content
- **Fallback**: `serif` - System serif font as fallback

### Font Sizes
- **Hero Titles**: `clamp(2.5rem, 5vw, 3.5rem)`
- **Section Headings**: `clamp(2rem, 4vw, 3rem)`
- **Subheadings**: `clamp(1.1rem, 2.5vw, 1.4rem)`
- **Body Text**: `1rem` (16px)
- **Navigation**: `1rem`

### Font Weights
- **Bold**: `700` - Hero titles and important headings
- **Semi-Bold**: `600` - Section headings and buttons
- **Medium**: `500` - Navigation and labels
- **Regular**: `400` - Body text

## 🧩 **Component Styles**

### Navigation Bar
```css
background: rgba(139, 125, 107, 0.95);
backdrop-filter: blur(10px);
box-shadow: 0 2px 20px rgba(0,0,0,0.1);
```

### Buttons
```css
background: linear-gradient(45deg, #8b4513, #b8860b);
border-radius: 25px to 50px;
box-shadow: 0 8px 25px rgba(139,69,19,0.3);
transition: transform 0.3s ease;
```

### Cards/Sections
```css
background: #fff;
border-radius: 15px to 25px;
box-shadow: 0 20px 60px rgba(0,0,0,0.05);
border-left: 5px solid #b8860b;
```

### Hero Sections
```css
background: linear-gradient(135deg, #f8f6f3 0%, #ede8e0 50%, #e2ddd5 100%);
border-bottom: 3px solid rgba(139,69,19,0.2);
```

### Content Containers
```css
background: rgba(248,246,243,0.85);
backdrop-filter: blur(10px);
border-radius: 15px;
box-shadow: 0 8px 25px rgba(0,0,0,0.1);
```

## 🎭 **Animation & Effects**

### Hover Effects
- **Transform**: `translateY(-2px)` to `translateY(-10px)`
- **Scale**: `scale(1.02)` to `scale(1.1)`
- **Shadow Enhancement**: Increase shadow intensity on hover
- **Color Transitions**: Smooth color changes with `transition: all 0.3s ease`

### Gradient Patterns
- **Hero Backgrounds**: Light to slightly darker warm tones
- **Buttons**: Brown to golden gradient
- **Icons**: Same as buttons for consistency

## 📱 **Responsive Design**

### Breakpoints
- **Mobile**: `max-width: 768px`
- **Tablet**: `768px to 1024px`
- **Desktop**: `1024px+`

### Responsive Typography
- Uses `clamp()` function for fluid scaling
- Maintains readability across all devices
- Consistent line-height: `1.6` to `1.7`

## 🎯 **Brand Consistency Rules**

1. **Always use Georgia serif font** for brand consistency
2. **Stick to the defined color palette** - no arbitrary colors
3. **Use gradients consistently** - especially for buttons and hero sections
4. **Maintain consistent spacing** - 15px, 20px, 30px increments
5. **Apply consistent border-radius** - 15px to 25px for modern look
6. **Use backdrop-filter: blur()** for glass-morphism effects
7. **Consistent box-shadows** with warm brown tones
8. **Active states** should use khaki (#f0e68c) highlights

## 🔧 **Implementation Notes**

- All pages now follow this consistent design system
- Contact modals maintain same styling across all pages
- Navigation highlights current page with khaki background
- Hover effects are smooth and consistent
- Professional construction/interior design aesthetic maintained

This style guide ensures all pages of the Shri Krishna Leela Enterprises website maintain visual consistency and professional branding.