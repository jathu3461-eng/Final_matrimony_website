const fs = require('fs');

const frontendEnPath = './matrimony-app/frontend/src/i18n/en.json';
const frontendTaPath = './matrimony-app/frontend/src/i18n/ta.json';
const mobileEnPath = './mobile/src/i18n/en.json';
const mobileTaPath = './mobile/src/i18n/ta.json';

const translations = {
  auth_email_label: { en: 'Email Address', ta: 'மின்னஞ்சல் முகவரி' },
  auth_email_placeholder: { en: 'name@example.com', ta: 'name@example.com' },
  auth_password_label: { en: 'Password', ta: 'கடவுச்சொல்' },
  auth_password_placeholder: { en: 'Enter your password', ta: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்' },
  auth_mobile_label: { en: 'Mobile Number', ta: 'கைபேசி எண்' },
  auth_valid: { en: 'Valid', ta: 'சரியானது' },
  auth_hide_password: { en: 'Hide Password', ta: 'கடவுச்சொல்லை மறை' },
  auth_show_password: { en: 'Show Password', ta: 'கடவுச்சொல்லை காட்டு' },
  auth_login_button: { en: 'Login to Continue', ta: 'உள்நுழையவும்' },
  auth_secure_private: { en: 'Secure & Private', ta: 'பாதுகாப்பானது & தனிப்பட்டது' },
  auth_create_account: { en: 'Create Account', ta: 'கணக்கை உருவாக்கவும்' },
  auth_new_to: { en: 'New to Mukurtham?', ta: 'முகூர்த்தத்திற்கு புதியவரா?' },
  auth_already_have: { en: 'Already have an account?', ta: 'ஏற்கனவே கணக்கு உள்ளதா?' },
  auth_login_here: { en: 'Login here', ta: 'இங்கே உள்நுழையவும்' },
  auth_signup_title: { en: 'Create an Account', ta: 'கணக்கை உருவாக்கவும்' },
  auth_signup_subtitle: { en: 'Join us today.', ta: 'இன்றே இணையுங்கள்.' },
  auth_full_name: { en: 'Full Name', ta: 'முழு பெயர்' },
  auth_full_name_placeholder: { en: 'John Doe', ta: 'ஜான் டோ' },
  auth_create_password: { en: 'Create Password', ta: 'கடவுச்சொல்லை உருவாக்கவும்' },
  auth_looks_strong: { en: 'Looks strong!', ta: 'வலுவாக உள்ளது!' },
  auth_confirm_password: { en: 'Confirm Password', ta: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்' },
  auth_confirm_placeholder: { en: 'Re-enter your password', ta: 'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்' },
  auth_business_name: { en: 'Business Name', ta: 'வணிகத்தின் பெயர்' },
  auth_business_placeholder: { en: 'Your Agency Name', ta: 'உங்கள் ஏஜென்சியின் பெயர்' },
  auth_terms_i_agree: { en: 'I agree to the', ta: 'நான் ஒப்புக்கொள்கிறேன்' },
  auth_terms_conditions: { en: 'Terms and Conditions', ta: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்' },
  auth_and: { en: 'and', ta: 'மற்றும்' },
  auth_privacy_policy: { en: 'Privacy Policy', ta: 'தனியுரிமைக் கொள்கை' },
  auth_register_broker: { en: 'Register as Broker', ta: 'தரகராக பதிவு செய்யவும்' },
  auth_register_individual: { en: 'Register Account', ta: 'கணக்கை பதிவு செய்யவும்' },
  auth_encrypted_note: { en: 'Your data is encrypted and secure.', ta: 'உங்கள் தரவு குறியாக்கம் செய்யப்பட்டு பாதுகாக்கப்படுகிறது.' },
  auth_individual: { en: 'Individual', ta: 'தனிப்பட்டவர்' },
  auth_broker: { en: 'Broker', ta: 'தரகர்' },
  auth_strength_strong: { en: 'Strong', ta: 'வலுவானது' },
  auth_strength_good: { en: 'Good', ta: 'நல்லது' },
  auth_strength_weak: { en: 'Weak', ta: 'பலவீனமானது' },
  auth_rule_min8: { en: 'Min 8 chars', ta: 'குறைந்தபட்சம் 8 எழுத்துக்கள்' },
  auth_rule_upper: { en: '1 Uppercase', ta: '1 பெரிய எழுத்து' },
  auth_rule_special: { en: '1 Special char', ta: '1 சிறப்பு எழுத்து' },
  tab_my_profiles: { en: 'My Profiles', ta: 'எனது சுயவிவரங்கள்' },
  tab_interests: { en: 'Interests', ta: 'விருப்பங்கள்' },
  tab_shortlist: { en: 'Shortlist', ta: 'சுருக்கப்பட்டியல்' },
  tab_messages: { en: 'Messages', ta: 'செய்திகள்' },
  tab_brokers: { en: 'Brokers', ta: 'தரகர்கள்' },
  broker_dashboard: { en: 'Broker Dashboard', ta: 'தரகர் டாஷ்போர்டு' },
  welcome_back: { en: 'Welcome back', ta: 'மீண்டும் வருக' },
  managing: { en: 'Managing', ta: 'நிர்வகிக்கிறது' },
  client_profiles: { en: 'client profiles', ta: 'வாடிக்கையாளர் சுயவிவரங்கள்' },
  continue_journey: { en: 'Continue your journey to find your perfect life partner', ta: 'உங்கள் சரியான வாழ்க்கைத் துணையைத் தேட உங்கள் பயணத்தைத் தொடரவும்' },
};

function updateFile(path, langKey) {
  if (fs.existsSync(path)) {
    let data = JSON.parse(fs.readFileSync(path, 'utf8'));
    for (const [key, langs] of Object.entries(translations)) {
      data[key] = langs[langKey];
    }
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log('Updated ' + path);
  }
}

updateFile(frontendEnPath, 'en');
updateFile(frontendTaPath, 'ta');
updateFile(mobileEnPath, 'en');
updateFile(mobileTaPath, 'ta');
