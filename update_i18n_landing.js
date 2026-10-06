const fs = require('fs');

const updateJson = (path, newKeys) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  Object.assign(data, newKeys);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`Updated ${path}`);
};

const enKeys = {
  "landing_trusted": "Trusted by Millions. Loved for Happiness.",
  "landing_hero_title1": "Find Your Perfect Life Partner",
  "landing_hero_title2": "Begin Your Beautiful Journey",
  "landing_hero_desc": "Lakhs of happy couples. Find your perfect life partner today rooted in Tamil culture and diaspora values — with verified profiles and AI-powered smart matching.",
  "landing_btn_create": "Create Profile Free",
  "landing_btn_search": "Search Matches",
  "landing_feat1": "100% Verified Profiles",
  "landing_feat2": "AI Smart Matching",
  "landing_feat3": "Privacy First",
  "landing_stat1": "Success Stories",
  "landing_stat2": "Verified Profiles",
  "landing_stat3": "Matches / Day",
  "landing_stat4": "Member Satisfaction",
  "landing_find_match_title": "Find Your Match",
  "landing_find_match_desc": "Search lakhs of verified Tamil profiles",
  "landing_advanced_search": "Advanced Search",
  "landing_handpicked": "Handpicked For You",
  "landing_featured_profiles": "Featured Profiles 💖",
  "landing_featured_desc": "Meet verified members ready for a beautiful journey ahead",
  "landing_view_all": "View All",
  "landing_stories_tag": "Real Stories, Real Happiness",
  "landing_stories_title": "Couples Who Found Forever 💕",
  "landing_stories_desc": "Every week, more couples write their love stories with us.",
  "landing_verified_couple": "Verified Couple",
  "onboarding_skip": "Skip",
  "onboarding_get_started": "Get Started",
  "onboarding_next": "Next",
  "onboarding_title1": "Find your\nperfect match",
  "onboarding_desc1": "Browse genuine profiles curated for the Tamil community, worldwide.",
  "onboarding_title2": "Verified\nprofiles only",
  "onboarding_desc2": "Every profile is reviewed by our team so you connect with confidence.",
  "onboarding_title3": "Meaningful\nconversations",
  "onboarding_desc3": "Send interests, chat safely once you match. Your privacy stays protected."
};

const taKeys = {
  "landing_trusted": "மில்லியன் கணக்கானவர்களால் நம்பப்படுகிறது.",
  "landing_hero_title1": "உங்கள் சரியான வாழ்க்கைத்துணையை கண்டறியுங்கள்",
  "landing_hero_title2": "உங்கள் அழகான பயணத்தை தொடங்குங்கள்",
  "landing_hero_desc": "லட்சக்கணக்கான மகிழ்ச்சியான தம்பதிகள். தமிழ் பண்பாடு மற்றும் மதிப்புகளுடன், சரிபார்க்கப்பட்ட சுயவிவரங்கள் மற்றும் AI மூலம் உங்கள் சரியான வாழ்க்கைத்துணையை இன்று கண்டறியுங்கள்.",
  "landing_btn_create": "இலவசமாக பதிவு செய்க",
  "landing_btn_search": "வரன்களைத் தேடுக",
  "landing_feat1": "100% சரிபார்க்கப்பட்ட சுயவிவரங்கள்",
  "landing_feat2": "AI தொழில்நுட்பம்",
  "landing_feat3": "தனியுரிமைக்கு முன்னுரிமை",
  "landing_stat1": "வெற்றிக் கதைகள்",
  "landing_stat2": "சரிபார்க்கப்பட்ட சுயவிவரங்கள்",
  "landing_stat3": "தினசரி பொருத்தங்கள்",
  "landing_stat4": "உறுப்பினர் திருப்தி",
  "landing_find_match_title": "உங்கள் துணையை தேடுங்கள்",
  "landing_find_match_desc": "லட்சக்கணக்கான சரிபார்க்கப்பட்ட தமிழ் சுயவிவரங்களை தேடுங்கள்",
  "landing_advanced_search": "மேம்பட்ட தேடல்",
  "landing_handpicked": "உங்களுக்காக தேர்ந்தெடுக்கப்பட்டவை",
  "landing_featured_profiles": "சிறப்பு வரன்கள் 💖",
  "landing_featured_desc": "அழகான பயணத்திற்கு தயாராக உள்ள சரிபார்க்கப்பட்ட உறுப்பினர்களை சந்தியுங்கள்",
  "landing_view_all": "அனைத்தையும் காண்க",
  "landing_stories_tag": "உண்மையான கதைகள், உண்மையான மகிழ்ச்சி",
  "landing_stories_title": "என்றென்றும் இணைந்த தம்பதிகள் 💕",
  "landing_stories_desc": "ஒவ்வொரு வாரமும், மேலும் பல தம்பதிகள் தங்கள் காதல் கதைகளை எங்களுடன் பகிர்ந்து கொள்கின்றனர்.",
  "landing_verified_couple": "சரிபார்க்கப்பட்ட தம்பதி",
  "onboarding_skip": "தவிர்",
  "onboarding_get_started": "தொடங்குங்கள்",
  "onboarding_next": "அடுத்து",
  "onboarding_title1": "உங்கள் சரியான\nதுணையைக் கண்டறியவும்",
  "onboarding_desc1": "உலகளாவிய தமிழ் சமூகத்திற்காக உருவாக்கப்பட்ட உண்மையான சுயவிவரங்களை உலாவவும்.",
  "onboarding_title2": "சரிபார்க்கப்பட்ட\nசுயவிவரங்கள் மட்டுமே",
  "onboarding_desc2": "ஒவ்வொரு சுயவிவரமும் எங்கள் குழுவால் சரிபார்க்கப்படுவதால் நீங்கள் நம்பிக்கையுடன் இணையலாம்.",
  "onboarding_title3": "அர்த்தமுள்ள\nஉரையாடல்கள்",
  "onboarding_desc3": "விருப்பங்களை அனுப்புங்கள், பொருத்தம் ஏற்பட்டவுடன் பாதுகாப்பாக அரட்டை அடியுங்கள். உங்கள் தனியுரிமை பாதுகாக்கப்படுகிறது."
};

updateJson('./matrimony-app/frontend/src/i18n/en.json', enKeys);
updateJson('./matrimony-app/frontend/src/i18n/ta.json', taKeys);
updateJson('./mobile/src/i18n/en.json', enKeys);
updateJson('./mobile/src/i18n/ta.json', taKeys);
