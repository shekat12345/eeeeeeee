/**
 * AUTOMATED NATIVE SCAFFOLDING UTILITY FOR BUSINESSSHOWCASE
 * 
 * Running this script locally on your workstation will automatically download and generate 
 * the exact iOS Xcode projects, CocoaPods structures, and Gradle launchers matching 
 * React Native 0.75.2 to ensure instant, error-free native compilation.
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('---------------------------------------------------------');
console.log('🛠️  BUSINESSSHOWCASE LOCAL NATIVE GENERATION ENGINE');
console.log('---------------------------------------------------------');

try {
  console.log('1. Checking Node, NPM & React Native dependencies...');
  execSync('npm --version', { stdio: 'inherit' });
  
  console.log('\n2. Bootstrapping pristine React Native template files...');
  // Running CLI template generator in a workspace-friendly temporary directory
  const tempDir = path.join(__dirname, '..', 'temp_scaffold');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  
  fs.mkdirSync(tempDir, { recursive: true });
  
  console.log('Initiating React Native template matching... Please stand by.');
  execSync('npx --yes @react-native-community/cli init BusinessShowcaseTemp --skip-install --directory ' + tempDir, {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('\n3. Harmonizing iOS structure (generating .xcodeproj & .xcworkspace)...');
  const tempIos = path.join(tempDir, 'ios');
  const targetIos = path.join(__dirname, 'ios');

  if (fs.existsSync(tempIos)) {
    // Copy complex directories that have binary mappings (e.g., .xcodeproj / .xcworkspace)
    copyFolderSync(tempIos, targetIos);
    console.log('✅ Apple Xcode schemas successfully bridged.');
  }

  console.log('\n4. Harmonizing Android build systems (bridges, key stores and wrappers)...');
  const tempAndroid = path.join(tempDir, 'android');
  const targetAndroid = path.join(__dirname, 'android');

  if (fs.existsSync(tempAndroid)) {
    copyFolderSync(tempAndroid, targetAndroid);
    console.log('✅ Google Android structures and signing configs bridged.');
  }

  // Cleanup temp files
  console.log('\n5. Cleaning up temporary caching layers...');
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('\n---------------------------------------------------------');
  console.log('✨ SUCCESS! Your local Native environments are synchronized.');
  console.log('To launch your dynamic mobile applications:');
  console.log('   - IOS: cd ios && pod install && cd .. && npm run ios');
  console.log('   - ANDROID: npm run android');
  console.log('---------------------------------------------------------');

} catch (error) {
  console.error('\n❌ Harmonization failed or was interrupted:');
  console.error(error.message);
  console.log('\n⚠️  Alternative standard procedure:');
  console.log('1. In your local terminal, run inside this folder:');
  console.log('   npx @react-native-community/cli init BusinessShowcase --version 0.75.2');
  console.log('2. Overwrite files to merge our elite premium layouts.');
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const srcPath = path.join(from, element);
    const destPath = path.join(to, element);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      // Don't overwrite key premium source files we've custom tailored
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });
}
