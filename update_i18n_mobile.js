const fs = require('fs');

const updateJson = (path, newKeys) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  Object.assign(data, newKeys);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`Updated ${path}`);
};

const enKeys = {
  "mob_create_account": "Create Account",
  "mob_register_subtitle": "Start your journey to find the perfect match",
  "mob_regular_user": "Regular User",
  "mob_broker": "Broker",
  "mob_username": "Username",
  "mob_username_placeholder": "e.g. john_95",
  "mob_email": "Email",
  "mob_email_placeholder": "e.g. john@gmail.com",
  "mob_phone": "Phone number",
  "mob_password": "Password",
  "mob_password_placeholder": "Create a strong password",
  "mob_confirm_password": "Confirm password",
  "mob_confirm_placeholder": "Re-enter password",
  "mob_pw_weak": "Weak",
  "mob_pw_good": "Good",
  "mob_pw_strong": "Strong",
  "mob_pw_rule_8chars": "At least 8 characters",
  "mob_pw_rule_upper": "1 uppercase letter",
  "mob_pw_rule_special": "1 special character",
  "mob_terms_agree": "I agree to the",
  "mob_terms_conditions": "Terms & Conditions",
  "mob_terms_and": "and",
  "mob_terms_privacy": "Privacy Policy",
  "mob_business_name": "Business name",
  "mob_business_placeholder": "Your agency name",
  "mob_already_account": "Already have an account?",
  "mob_log_in": "Log in",
  "mob_login_tagline": "Matrimony, made meaningful",
  "mob_welcome_back": "Welcome back",
  "mob_login_subtitle": "Sign in to continue your journey",
  "mob_email_tab": "Email",
  "mob_phone_tab": "Phone",
  "mob_email_hint": "Enter your registered email",
  "mob_email_login_placeholder": "you@example.com",
  "mob_phone_hint": "Enter your registered phone number",
  "mob_password_login_placeholder": "Your password",
  "mob_login_btn": "Log In",
  "mob_forgot_password": "Forgot password?",
  "mob_new_here": "New here?",
  "mob_create_account_link": "Create account",
  "mob_secure_private": "Secure & Private"
};

const taKeys = {
  "mob_create_account": "கணக்கை உருவாக்கு",
  "mob_register_subtitle": "உங்கள் சரியான துணையை கண்டறிய பயணத்தை தொடங்குங்கள்",
  "mob_regular_user": "பயனர்",
  "mob_broker": "தரகர்",
  "mob_username": "பயனர்பெயர்",
  "mob_username_placeholder": "எ.கா. john_95",
  "mob_email": "மின்னஞ்சல்",
  "mob_email_placeholder": "எ.கா. john@gmail.com",
  "mob_phone": "தொலைபேசி எண்",
  "mob_password": "கடவுச்சொல்",
  "mob_password_placeholder": "வலுவான கடவுச்சொல்லை உருவாக்கவும்",
  "mob_confirm_password": "கடவுச்சொல்லை உறுதிப்படுத்து",
  "mob_confirm_placeholder": "கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
  "mob_pw_weak": "பலவீனம்",
  "mob_pw_good": "நல்லது",
  "mob_pw_strong": "வலுவானது",
  "mob_pw_rule_8chars": "குறைந்தது 8 எழுத்துகள்",
  "mob_pw_rule_upper": "1 பெரிய எழுத்து",
  "mob_pw_rule_special": "1 சிறப்பு எழுத்து",
  "mob_terms_agree": "நான் ஒப்புக்கொள்கிறேன்",
  "mob_terms_conditions": "விதிமுறைகள் & நிபந்தனைகள்",
  "mob_terms_and": "மற்றும்",
  "mob_terms_privacy": "தனியுரிமைக் கொள்கை",
  "mob_business_name": "வணிகப் பெயர்",
  "mob_business_placeholder": "உங்கள் நிறுவனத்தின் பெயர்",
  "mob_already_account": "ஏற்கனவே கணக்கு உள்ளதா?",
  "mob_log_in": "உள்நுழை",
  "mob_login_tagline": "திருமணம், அர்த்தமுள்ளதாக",
  "mob_welcome_back": "மீண்டும் வருக",
  "mob_login_subtitle": "உங்கள் பயணத்தைத் தொடர உள்நுழையவும்",
  "mob_email_tab": "மின்னஞ்சல்",
  "mob_phone_tab": "தொலைபேசி",
  "mob_email_hint": "பதிவு செய்த மின்னஞ்சலை உள்ளிடவும்",
  "mob_email_login_placeholder": "you@example.com",
  "mob_phone_hint": "பதிவு செய்த தொலைபேசி எண்ணை உள்ளிடவும்",
  "mob_password_login_placeholder": "உங்கள் கடவுச்சொல்",
  "mob_login_btn": "உள்நுழை",
  "mob_forgot_password": "கடவுச்சொல் மறந்துவிட்டதா?",
  "mob_new_here": "புதியவரா?",
  "mob_create_account_link": "கணக்கை உருவாக்கு",
  "mob_secure_private": "பாதுகாப்பானது & தனிப்பட்டது"
};

updateJson('./mobile/src/i18n/en.json', enKeys);
updateJson('./mobile/src/i18n/ta.json', taKeys);
