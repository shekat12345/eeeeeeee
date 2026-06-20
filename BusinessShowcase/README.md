# BusinessShowcase

A stunning, modular, high-fidelity premium single-page React Native application built to showcase elite businesses with rich animations, looping immersive background videos, and custom styling.

## ✨ Core Architecture Features
- **Looping Immersion Backgrounds**: Full-screen video system built on `react-native-video` with automated contrast/readability shields.
- **Scroll-Driven Animation Cascades**: Crafted with `react-native-reanimated` (v3+) mapping viewport interpolations to content card scales, header translated opacities, and swipe indicators.
- **Elite Dynamic Themes**: Seamless switching between four distinct luxury business categories:
  - **Premium Watchmaker** (*Chronos Élite*) - Deep carbon slate paired with classic luxurious gold accents.
  - **Bespoke Hypercars** (*Apex Bespoke*) - Stealth obsidian paired with intense racing red lines.
  - **Architectural Monolith** (*Atelier Monolith*) - Organic stone concrete with soothing desert warm sand hues.
  - **Resort Hideaway** (*Elysian Hideaway*) - Rich marine lagoons matched with custom vibrant turquoise light.
- **Confidential Inquiry Bridge**: Double-layered glassmorphism secure lead capture form.

---

## 🚀 Setup & Execution

### 1. Prerequisites
Ensure your local developer workstation is fully configured for React Native:
- **Node.js** (>= 18)
- **Yarn** or **npm**
- **iOS Developers**: macOS with Xcode, CocoaPods installed.
- **Android Developers**: Java Development Kit (JDK 17), Android Studio, and Android SDK.

### 2. Install Native Dependencies
From inside the `BusinessShowcase` directory, run:
```bash
npm install
# or
yarn install
```

### 3. Native Platform Integrations & Configuration

#### A. React Native Reanimated (Animations)
No manual native steps are needed for modern React Native (> 0.73). However, you must ensure that **Babel** registers the plugin correctly. This is already fully automated inside `babel.config.js`:
```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Listed last
  ],
};
```
*Note: Make sure to reset your Metro bundler cache afterward:* `npm start -- --reset-cache`.

#### B. React Native Video (Looping Media)
To ensure smooth background looping on Android/iOS, standard linkage is automatic. 
- **iOS**: Run `pod install` inside the `ios` directory before building.
- **Android**: Supports standard ExoPlayer out of the box in React Native 0.74+.

#### C. React Native Svg (Dividers & Vectors)
Installed and ready to support paths, lines, and structural custom symbols.

---

## 📱 Launching the App

### Step 1: Start the Metro Bundler
Boot the server so it compiles your TypeScript files into runtime bundles:
```bash
npm start
```

### Step 2: Build & Launch on Device

#### For iOS (Simulator or Physical Device)
In a secondary terminal:
```bash
npm run ios
```

#### For Android (Emulator or Connected phone)
In a secondary terminal:
```bash
npm run android
```

---

## 🛠️ Folder Structure
```
BusinessShowcase/
├── App.tsx             # Master component containing scroll animation formulas, video configs, and state
├── package.json        # Dependencies (reanimated, video, svg)
├── babel.config.js     # Config registering Reanimated compiler instructions
├── metro.config.js     # Metro bundler details
└── tsconfig.json       # Type strictness presets
```
