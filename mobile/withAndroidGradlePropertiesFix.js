const { withGradleProperties } = require('@expo/config-plugins');

module.exports = function withAndroidGradlePropertiesFix(config) {
  return withGradleProperties(config, async (config) => {
    const props = config.modResults;

    // Set compileSdkVersion and targetSdkVersion
    let compileSdkFound = false;
    let targetSdkFound = false;
    let newArchFound = false;

    for (const prop of props) {
      if (prop.type === 'property' && prop.key === 'android.compileSdkVersion') {
        prop.value = '34';
        compileSdkFound = true;
      }
      if (prop.type === 'property' && prop.key === 'android.targetSdkVersion') {
        prop.value = '34';
        targetSdkFound = true;
      }
      if (prop.type === 'property' && prop.key === 'newArchEnabled') {
        prop.value = 'false';
        newArchFound = true;
      }
    }

    if (!compileSdkFound) {
      props.push({ type: 'property', key: 'android.compileSdkVersion', value: '34' });
    }
    if (!targetSdkFound) {
      props.push({ type: 'property', key: 'android.targetSdkVersion', value: '34' });
    }
    if (!newArchFound) {
      props.push({ type: 'property', key: 'newArchEnabled', value: 'false' });
    }

    return config;
  });
};
