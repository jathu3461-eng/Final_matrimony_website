const { withMainActivity } = require('@expo/config-plugins');

module.exports = function withAndroidMainActivityCrashFix(config) {
  return withMainActivity(config, async (config) => {
    const mainActivity = config.modResults;
    const contents = mainActivity.contents;

    if (!contents.includes('import android.os.Bundle')) {
      mainActivity.contents = contents.replace(
        'import com.facebook.react.ReactActivity',
        'import com.facebook.react.ReactActivity\nimport android.os.Bundle'
      );
    }

    if (!contents.includes('super.onCreate(null)')) {
      mainActivity.contents = mainActivity.contents.replace(
        'class MainActivity : ReactActivity() {',
        'class MainActivity : ReactActivity() {\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(null)\n  }'
      );
    }

    return config;
  });
};
