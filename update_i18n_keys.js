const fs = require('fs');

const updateJson = (path, newKeys) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  Object.assign(data, newKeys);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`Updated ${path}`);
};

const enKeys = {
  "community_commitment_title": "Everyone belongs here",
  "community_commitment_intro": "When you join Mukurtham Matrimony, we ask you to agree to our Community Commitment:",
  "community_commitment_body": "\"I will treat everyone in the community—regardless of their race, religion, national origin, ethnicity, skin colour, disability, sex, gender identity, sexual orientation, or age—with respect, and without judgment or bias.\""
};

const taKeys = {
  "community_commitment_title": "அனைவருக்கும் இங்கு இடமுண்டு",
  "community_commitment_intro": "முகூர்த்தம் மேட்ரிமோனியில் நீங்கள் இணையும் போது, எங்கள் சமூக உறுதிப்பாட்டிற்கு நீங்கள் ஒப்புக்கொள்ளுமாறு கேட்டுக்கொள்கிறோம்:",
  "community_commitment_body": "\"சமூகத்தில் உள்ள அனைவரையும்—அவர்களின் இனம், மதம், தேசியம், தோல் நிறம், இயலாமை, பாலினம், பாலின அடையாளம், பாலியல் நாட்டம் அல்லது வயது ஆகியவற்றைப் பொருட்படுத்தாமல்—நான் மரியாதையுடன், பாரபட்சம் அல்லது தீர்ப்பு இல்லாமல் நடத்துவேன்.\""
};

updateJson('./matrimony-app/frontend/src/i18n/en.json', enKeys);
updateJson('./matrimony-app/frontend/src/i18n/ta.json', taKeys);
updateJson('./mobile/src/i18n/en.json', enKeys);
updateJson('./mobile/src/i18n/ta.json', taKeys);
