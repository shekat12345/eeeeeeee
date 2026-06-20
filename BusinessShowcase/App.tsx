import React, { useState, useRef } from 'react';
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
import Svg, { Path, Rect, Circle } from 'react-native-svg';
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

// Define our premium design niches
type NicheType = 'automotive' | 'watchmaker' | 'architecture' | 'resort';

interface NicheDetails {
  id: NicheType;
  brand: string;
  tagline: string;
  description: string;
  videoUri: string;
  primaryColor: string;
  accentColor: string;
  textColor: string;
  services: {
    id: string;
    title: string;
    description: string;
    metric: string;
  }[];
  contactPlaceholder: string;
}

const NICHES: Record<NicheType, NicheDetails> = {
  watchmaker: {
    id: 'watchmaker',
    brand: 'CHRONOS ÉLITE',
    tagline: 'Crafting Eternity in Perpetual Motion',
    description: 'Precision engineering meets haute horology. Every timepiece is a handcrafted symphony of gears, sapphire crystals, and exquisite gold leaf, made to endure for generations.',
    videoUri: 'https://assets.mixkit.co/videos/preview/mixkit-mechanical-movement-of-a-pocket-watch-close-up-41908-large.mp4',
    primaryColor: '#0E0F11',
    accentColor: '#D4AF37', // Gold
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

export default function App() {
  const [currentNiche, setCurrentNiche] = useState<NicheType>('watchmaker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const niche = NICHES[currentNiche];

  // Reanimated scroll tracker for Parallax and scaling cards
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated style for Hero Parallax and blur out effect
  const heroAnimatedStyle = useAnimatedStyle(() => {
    // Translate the hero text slightly slower than the scroll speed (Parallax)
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [0, 120],
      'clamp'
    );
    // Smoothly fade out the hero content as you scroll down
    const opacity = interpolate(
      scrollY.value,
      [0, 250],
      [1, 0],
      'clamp'
    );
    // Scale down the hero layout slightly as you scroll past
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.15, 1],
      'clamp'
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  // Background Video scale animation on pull-down stretch
  const bgAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-150, 0, 400],
      [1.3, 1, 1.05],
      'clamp'
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 300, 700],
      [0.65, 0.45, 0.25],
      'clamp'
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  // Quick navigation indicator style
  const indicatorAnimatedStyle = (id: NicheType) => {
    return useAnimatedStyle(() => {
      const isSelected = currentNiche === id;
      const width = withSpring(isSelected ? 28 : 8);
      const backgroundColor = withTiming(
        isSelected ? niche.accentColor : 'rgba(255, 255, 255, 0.35)'
      );
      return {
        width,
        backgroundColor,
      };
    });
  };

  const handleInquirySubmit = () => {
    if (!name || !email) {
      Alert.alert('Incomplete Inquiry', 'Please include your name and direct contact email to connect.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      Alert.alert(
        'Inquiry Transmitted',
        `Thank you ${name}. Your request is registered. A concierge specialist from our ${niche.brand} executive team will contact you in confidence within 4 hours.`
      );
      setName('');
      setEmail('');
      setInquiry('');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <View style={[styles.container, { backgroundColor: niche.primaryColor }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* --- BACKGROUND VIDEO (loops securely) --- */}
      <Animated.View style={[styles.videoContainer, bgAnimatedStyle]}>
        <Video
          source={{ uri: niche.videoUri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          repeat={true}
          muted={true}
          playWhenInactive={true}
          playInBackground={false}
          disableFocus={true}
          // fallback component representation for setup
          poster="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200"
          posterResizeMode="cover"
        />
        {/* Dark overlay to balance the backdrop for text contrast */}
        <View style={styles.overlay} />
      </Animated.View>

      {/* --- FLOATING NICHE NAVIGATOR --- */}
      <View style={styles.floatingNav}>
        {Object.keys(NICHES).map((key) => {
          const item = NICHES[key as NicheType];
          const active = currentNiche === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navTab,
                active && { borderColor: niche.accentColor, backgroundColor: 'rgba(0,0,0,0.45)' },
              ]}
              onPress={() => {
                setCurrentNiche(item.id);
                // Reset scroll to top smoothly when switching niches
                scrollRef.current?.scrollTo({ y: 0, animated: true });
              }}
            >
              <Text
                style={[
                  styles.navText,
                  { color: active ? niche.textColor : 'rgba(255,255,255,0.5)' },
                  active && { fontWeight: '700' },
                ]}
              >
                {item.id.toUpperCase()}
              </Text>
              <Animated.View style={[styles.navIndicator, indicatorAnimatedStyle(item.id)]} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* --- SCROLL CONTAINER --- */}
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- 1. HERO SECTION (Immersive Parallax Layout) --- */}
        <Animated.View style={[styles.heroSection, heroAnimatedStyle]}>
          <View style={styles.badgeContainer}>
            <View style={[styles.badgeLine, { backgroundColor: niche.accentColor }]} />
            <Text style={[styles.badgeText, { color: niche.accentColor }]}>
              ESTABLISHED CRAFT
            </Text>
          </View>

          <Text style={[styles.brandTitle, { color: niche.textColor }]}>
            {niche.brand}
          </Text>

          <Text style={styles.taglineText}>
            {niche.tagline}
          </Text>

          {/* Elegant SVG divider accent */}
          <Svg height="14" width="100" viewBox="0 0 100 14" style={styles.dividerSvg}>
            <Path
              d="M0 7 C 25 2, 25 12, 50 7 C 75 2, 75 12, 100 7"
              fill="none"
              stroke={niche.accentColor}
              strokeWidth="2.5"
            />
          </Svg>

          {/* Hint Indicator to drag downwards */}
          <Text style={styles.scrollHint}>PULL UP TO EXPLORE COMMISSIONS</Text>
        </Animated.View>

        {/* Spacer before content overlay to let parallax show off */}
        <View style={styles.heroSpacing} />

        {/* --- 2. FOCUS CARD (Story / Manifesto) --- */}
        <View style={styles.cardContainer}>
          <View style={[styles.brandGlassCard, { borderColor: niche.accentColor + '40' }]}>
            <Text style={[styles.sectionTitle, { color: niche.accentColor }]}>OUR CREATIVE ETHOS</Text>
            <Text style={styles.storyText}>{niche.description}</Text>
          </View>
        </View>

        {/* --- 3. SERVICES SECTION --- */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionPre}>ELITE COMMISSIONS</Text>
            <View style={[styles.headerUnderline, { backgroundColor: niche.accentColor }]} />
            <Text style={[styles.sectionLabel, { color: niche.textColor }]}>Exquisite Pillars of Excellence</Text>
          </View>

          {niche.services.map((service, index) => {
            return (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                accentColor={niche.accentColor}
                textColor={niche.textColor}
                scrollY={scrollY}
              />
            );
          })}
        </View>

        {/* --- 4. SECURE INQUIRY FOOTER (Contact & Booking Interface) --- */}
        <View style={styles.footerSection}>
          <View style={[styles.contactCard, { borderColor: niche.accentColor + '30', backgroundColor: niche.primaryColor + 'E6' }]}>
            <Text style={[styles.contactTitle, { color: niche.accentColor }]}>SECURE BRIDGING PORTAL</Text>
            <Text style={styles.contactSubtitle}>
              Our global desk handles relationships directly. Register your contact details below to begin consultation.
            </Text>

            <TextInput
              style={[styles.inputField, { borderColor: 'rgba(255,255,255,0.15)', color: niche.textColor }]}
              placeholder="YOUR NAME"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={[styles.inputField, { borderColor: 'rgba(255,255,255,0.15)', color: niche.textColor }]}
              placeholder="CONFIDENTIAL EMAIL ADDRESS"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={[
                styles.inputField,
                styles.textAreaField,
                { borderColor: 'rgba(255,255,255,0.15)', color: niche.textColor },
              ]}
              placeholder={niche.contactPlaceholder}
              placeholderTextColor="rgba(255,255,255,0.4)"
              multiline={true}
              numberOfLines={3}
              value={inquiry}
              onChangeText={setInquiry}
            />

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: niche.accentColor }]}
              onPress={handleInquirySubmit}
              disabled={isSubmitting}
            >
              <Text style={[styles.submitButtonText, { color: '#0E0F11' }]}>
                {isSubmitting ? 'SECURED TRANSMISSION IN PROGRESS...' : 'TRANSMIT SECURE INQUIRY'}
              </Text>
            </TouchableOpacity>

            <View style={styles.securitySeal}>
              <Svg height="14" width="14" viewBox="0 0 24 24" style={styles.lockSvg}>
                <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                <Path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              </Svg>
              <Text style={styles.sealText}>256-BIT ENCRYPTED CLIENT PORTAL • ARCHIVAL ASSURED</Text>
            </View>
          </View>

          {/* Subheader branding */}
          <View style={styles.legalBranding}>
            <Text style={styles.legalBrandingText}>© 2026 {niche.brand}. ALL RIGHTS MANIFESTED GLOBALLY.</Text>
            <Text style={styles.legalBrandingSub}>GENEVA • TOKYO • NEW YORK • MONACO</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// Separate component for scrolling service cards to leverage individual useAnimatedStyles
interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    metric: string;
  };
  index: number;
  accentColor: string;
  textColor: string;
  scrollY: Animated.SharedValue<number>;
}

function ServiceCard({ service, index, accentColor, textColor, scrollY }: ServiceCardProps) {
  // We want to trigger scaling/fade in as this component gets near the viewport range.
  // We calculate a relative scroll range for each item
  const itemTop = SCREEN_HEIGHT * 0.7 + index * 180;

  const animatedStyle = useAnimatedStyle(() => {
    // Reveal item when scrollY is approaching the item's custom start position
    const opacity = interpolate(
      scrollY.value,
      [itemTop - 380, itemTop - 180, itemTop + 150],
      [0.2, 1, 0.9],
      'clamp'
    );

    const scale = interpolate(
      scrollY.value,
      [itemTop - 380, itemTop - 180, itemTop + 150],
      [0.92, 1, 0.98],
      'clamp'
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.serviceCard, animatedStyle, { borderColor: accentColor + '20' }]}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.metricContainer}>
          <Text style={[styles.metricLabel, { color: accentColor }]}>{service.metric}</Text>
        </View>
        <Text style={styles.cardNumber}>0{index + 1}/03</Text>
      </View>
      <Text style={[styles.cardTitle, { color: textColor }]}>{service.title}</Text>
      <Text style={styles.cardDesc}>{service.description}</Text>

      {/* Detail accent bar */}
      <View style={[styles.accentIndicator, { backgroundColor: accentColor }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Dynamic ambient dark shield
  },
  floatingNav: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 32,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 100,
    backgroundColor: 'rgba(10, 11, 14, 0.65)',
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  navTab: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  navText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'sans-serif-condensed',
    letterSpacing: 1.5,
  },
  navIndicator: {
    height: 2,
    borderRadius: 1,
    marginTop: 3,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  heroSection: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeLine: {
    width: 16,
    height: 1.5,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Courier-Bold' : 'monospace',
  },
  brandTitle: {
    fontSize: 38,
    textAlign: 'center',
    letterSpacing: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia-Bold' : 'normal',
    fontWeight: '800',
    marginBottom: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  taglineText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    letterSpacing: 2,
    fontStyle: 'italic',
    paddingHorizontal: 32,
    marginBottom: 40,
    lineHeight: 22,
  },
  dividerSvg: {
    marginBottom: 40,
  },
  scrollHint: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2.5,
    fontWeight: '500',
    position: 'absolute',
    bottom: 40,
  },
  heroSpacing: {
    height: 0,
  },
  cardContainer: {
    paddingHorizontal: 16,
    marginBottom: 48,
  },
  brandGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier-Bold' : 'monospace',
  },
  storyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: 25,
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  servicesSection: {
    paddingHorizontal: 16,
    marginBottom: 60,
  },
  sectionHeader: {
    marginBottom: 28,
  },
  sectionPre: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 3,
    marginBottom: 4,
  },
  headerUnderline: {
    width: 32,
    height: 2,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    marginBottom: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricContainer: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.3)',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 20,
    paddingRight: 12,
  },
  accentIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  footerSection: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  contactCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    marginBottom: 32,
  },
  contactTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  contactSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.55)',
    lineHeight: 20,
    marginBottom: 20,
  },
  inputField: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
    marginBottom: 12,
    letterSpacing: 1,
  },
  textAreaField: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  securitySeal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  lockSvg: {
    marginRight: 6,
  },
  sealText: {
    fontSize: 7.5,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
  },
  legalBranding: {
    alignItems: 'center',
  },
  legalBrandingText: {
    fontSize: 8.5,
    color: 'rgba(255, 255, 255, 0.35)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  legalBrandingSub: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.25)',
    letterSpacing: 3,
  },
});
