export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  metric: string;
}

export interface NicheData {
  id: 'watchmaker' | 'automotive' | 'architecture' | 'resort';
  brand: string;
  tagline: string;
  description: string;
  videoUri: string;
  primaryColor: string;
  accentColor: string;
  textColor: string;
  services: ServiceItem[];
  contactPlaceholder: string;
}

export const INITIAL_NICHES: Record<string, NicheData> = {
  watchmaker: {
    id: 'watchmaker',
    brand: 'CHRONOS ÉLITE',
    tagline: 'Crafting Eternity in Perpetual Motion',
    description: 'Precision engineering meets haute horology. Every timepiece is a handcrafted symphony of gears, sapphire crystals, and exquisite gold leaf, made to endure for generations.',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-mechanical-movement-of-a-pocket-watch-close-up-41908-large.mp4',
    primaryColor: '#0E0F11',
    accentColor: '#D4AF37', // Luxury Gold
    textColor: '#E5E7EB',
    services: [
      { id: 'w1', title: 'The Atelier Commision', description: 'Collaborate with a master horologist to design a bespoke movement personal to your heritage.', metric: '1 of 1' },
      { id: 'w2', title: 'Grand Complications', description: 'Indulge in perpetual calendars, tourbillons, and minute repeaters meticulously assembled by hand.', metric: '400+ Parts' },
      { id: 'w3', title: 'Heritage Preservation', description: 'Restoring archival timepieces from the 18th and 19th centuries with original techniques and metals.', metric: 'Lifetime' },
    ],
    contactPlaceholder: 'Inquire about Private Showroom Viewing',
  },
  automotive: {
    id: 'automotive',
    brand: 'APEX BESPOKE',
    tagline: 'Sculpted Aerodynamics. Pure Performance.',
    description: 'Bespoke carbon-composite hypercars optimized for emotional resonance, sound acoustics, and track dominance. The ultimate expression of modern mechanical power.',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-front-of-a-luxurious-sports-car-parked-42614-large.mp4',
    primaryColor: '#08090C',
    accentColor: '#EE2A24', // Racing Red
    textColor: '#F3F4F6',
    services: [
      { id: 'a1', title: 'Monocoque Customization', description: 'Formulated in active aerospace autoclaves, tailored perfectly to your weight and ergonomic posture.', metric: '1,100 kg' },
      { id: 'a2', title: 'Engine Calibration', description: 'Bespoke quad-turbocharged flat-plane V8 or high-density electric drivetrains tuned for sound pitch.', metric: '1500+ HP' },
      { id: 'a3', title: 'Trackside Concierge', description: 'Dedicated engineers dispatched globally to support your track days, diagnostics, and tire optimization.', metric: '24/7 Team' },
    ],
    contactPlaceholder: 'Schedule Private Track Assessment',
  },
  architecture: {
    id: 'architecture',
    brand: 'ATELIER MONOLITH',
    tagline: 'Monolithic Form. Organic Sanctuary.',
    description: 'We carve luxury spaces from raw concrete, floor-to-ceiling structural glass, and structural timber. Spaces designed to frame light, breeze, and quietude.',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-futuristic-concrete-building-44023-large.mp4',
    primaryColor: '#1E2022',
    accentColor: '#D1C2A5', // Warm Sand / Concrete
    textColor: '#FAFAFA',
    services: [
      { id: 'r1', title: 'Topographical Integration', description: 'Architectural designs that float over cliff faces, blend into forestry, or burrow in desert dunes.', metric: 'Organic' },
      { id: 'r2', title: 'Circadian Light Framing', description: 'Strategically modeled skylights and orientation designed around the daily journey of the solar arc.', metric: '100% Passive' },
      { id: 'r3', title: 'Sovereign Off-Grid Systems', description: 'Industrial solar, high-pressure rainwater filtration, and thermal loops matching premium aesthetics.', metric: 'Zero Carbon' },
    ],
    contactPlaceholder: 'Begin Topographical Consultation',
  },
  resort: {
    id: 'resort',
    brand: 'ELYSIAN HIDEAWAY',
    tagline: 'Secluded Splendor. Uncharted Waters.',
    description: 'A private archipelago of pristine beaches, overwater concrete residences, and unconditioned luxury. Deep connection with ocean rhythms and culinary masteristry.',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-overwater-villas-in-a-resort-43093-large.mp4',
    primaryColor: '#021B1C',
    accentColor: '#4DE6D9', // Turquoise Water
    textColor: '#EBFDFC',
    services: [
      { id: 's1', title: 'Overwater Sanctuary', description: 'Expansive private pavilions with saltwater plunge pools, direct lagoon reefs, and dedicated butlers.', metric: '300 m²' },
      { id: 's2', title: 'Gastronomy Atelier', description: 'Daily bespoke tasting menu curated by Michelin-star chefs, sourced strictly within 2 kilometers.', metric: 'Tailored' },
      { id: 's3', title: 'Yacht Expeditions', description: 'Daily charters to uninhabited sandbanks, remote dive reefs, and dynamic ocean whale watching.', metric: '65ft Riva' },
    ],
    contactPlaceholder: 'Secure Your Sanctuary Dates',
  },
};

export const REACT_NATIVE_FILES = {
  'App.tsx': `import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import Svg, { Path, Rect } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const [currentNiche, setCurrentNiche] = useState('watchmaker');
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Background Video scale animation on pull-down stretch
  const bgAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-150, 0, 400], [1.3, 1, 1.05], 'clamp');
    const opacity = interpolate(scrollY.value, [0, 300, 700], [0.65, 0.45, 0.25], 'clamp');
    return { transform: [{ scale }], opacity };
  });

  // Hero Parallax text moving and fading out on scroll
  const heroAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 300], [0, 120], 'clamp');
    const opacity = interpolate(scrollY.value, [0, 250], [1, 0], 'clamp');
    const scale = interpolate(scrollY.value, [-100, 0], [1.15, 1], 'clamp');
    return { transform: [{ translateY }, { scale }], opacity };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />
      <Animated.View style={[styles.videoContainer, bgAnimatedStyle]}>
        <Video
          source={{ uri: 'https://assets.mixkit.co/videos/preview/...' }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          repeat={true}
          muted={true}
        />
        <View style={styles.overlay} />
      </Animated.View>

      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.heroSection, heroAnimatedStyle]}>
          <Text style={styles.brandTitle}>CHRONOS ÉLITE</Text>
          <Text style={styles.taglineText}>Crafting Eternity in Perpetual Motion</Text>
        </Animated.View>
        
        {/* Additional service cards and contact forms styled natively */}
      </Animated.ScrollView>
    </View>
  );
}`,
  'package.json': `{
  "name": "BusinessShowcase",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-native": "0.75.2",
    "react-native-reanimated": "^3.15.0",
    "react-native-video": "^6.4.3",
    "react-native-svg": "^15.6.0",
    "lucide-react-native": "^0.436.0"
  },
  "devDependencies": {
    "typescript": "5.0.4",
    "eslint": "^8.57.0"
  }
}`,
  'metro.config.js': `const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);`,
  'babel.config.js': `module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Listed last
  ],
};`
};
