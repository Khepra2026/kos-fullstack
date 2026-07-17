import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const COMMUNITY_LANGS = ['sw', 'ha', 'ig', 'am', 'wo', 'ln', 'mos', 'ewo', 'dua', 'fmp'];

const LANG_NAMES: Record<string, { fr: string; native: string; type: 'nmt' | 'community' }> = {
  sw: { fr: 'Kiswahili', native: 'Kiswahili', type: 'nmt' },
  ha: { fr: 'Hausa', native: 'Hausa', type: 'nmt' },
  ig: { fr: 'Igbo', native: 'Igbo', type: 'nmt' },
  am: { fr: 'Amharique', native: 'አማርኛ', type: 'nmt' },
  wo: { fr: 'Wolof', native: 'Wolof', type: 'nmt' },
  ln: { fr: 'Lingála', native: 'Lingála', type: 'nmt' },
  mos: { fr: 'Mòoré', native: 'Mòoré', type: 'community' },
  ewo: { fr: 'Ewondo', native: 'Ewondo', type: 'community' },
  dua: { fr: 'Duálá', native: 'Duálá', type: 'community' },
  fmp: { fr: 'Fè\'éfě\'è', native: 'Fè\'éfě\'è', type: 'community' },
};

const BANNER_MESSAGES: Record<string, { title: string; subtitle: string; cta: string }> = {
  sw: { title: 'Tafsiri hii inahitaji macho yako! Saidia kuboresha Kiswahili kwenye KHEPRA EXPERTS.', subtitle: 'Kama mzungumzaji asilia, mapendekezo yako yanaboresha uzoefu kwa mamilioni ya Watanzania na Waafrika Mashariki.', cta: 'Saidia kuboresha tafsiri' },
  ha: { title: 'Wannan fassarar tana buƙatar idanunka! Taimaka inganta Hausa akan KHEPRA EXPERTS.', subtitle: 'A matsayinka na mai magana da harshen asali, shawarwarinka suna inganta ƙwarewa ga miliyoyin \'yan Najeriya da Nijar.', cta: 'Taimaka inganta fassarar' },
  ig: { title: 'Ntụgharị asụsụ a chọrọ anya gị! Nyere aka melite Igbo na KHEPRA EXPERTS.', subtitle: 'Dịka onye na-asụ asụsụ ala, aro gị na-eme ka ahụmahụ dị mma maka nde nde ndị Naijiria.', cta: 'Nyere aka melite ntụgharị asụsụ' },
  am: { title: 'ይህ ትርጉም ዓይኖችዎን ይፈልጋል! አማርኛን በKHEPRA EXPERTS ላይ ለማሻሻል ያግዙ።', subtitle: 'እንደ ተወላጅ ተናጋሪ፣ ምክረ-ሀሳብዎ ለሚሊዮኖች ኢትዮጵያውያን ልምዱን ያሻሽላል።', cta: 'ትርጉሙን ለማሻሻል ያግዙ' },
  wo: { title: 'Bii tëggin wii soxla sa xel! Dimbalal ngir yokk Wolof ci KHEPRA EXPERTS.', subtitle: 'Niki nit ku laa ko dal, sa yëngu-yëngu day yokk xelal bu baax ci milyoŋi Senegaal.', cta: 'Dimbalal ngir yokk tëggin yi' },
  ln: { title: 'Bobóngoli boye esɛngɛlɛ míso na yɔ̌! Sungisa mpó na kobɔngɔla Lingála na KHEPRA EXPERTS.', subtitle: 'Lokóla moto ya monɔkɔ mwa mbóka, litámbwisi na yɔ̌ ezalí kobɔngisa bomɛli mpó na bankóto ya bato ya Kongó.', cta: 'Sungisa mpó na kobɔngɔla' },
  mos: { title: 'Yaa siglg sẽn be minim pʋgẽ. Sõng-y tõnd n maneg n leok koeesã ne sõma!', subtitle: 'D siglg minim ratame tɩ b maneg koe-toaadsã. Sõng-y tõnd tɩ d paam manegr sẽn zems ne sõma!', cta: 'Sõng-y tõnd n maneg koeesã' },
  ewo: { title: 'A ne kalara beti a kal a mfôn. Wulu bia nti bôngô!', subtitle: 'Bikôn éyiñ bia bômes é ne éyoñ. Wulu bia kalara a mfôn nti bôngô bité!', cta: 'Wulu bia nti bôngô' },
  dua: { title: 'Di be̱ o mwemba ma tumba la bwambi. Mo̱ngwane̱ biso̱ o be̱le̱ beteledi!', subtitle: 'Bedangwedi ba tumba be ná bwambi. Mo̱ngwane̱ biso̱ o timbise̱le̱ mambenda ma bwam!', cta: 'Mo̱ngwane̱ biso̱ o be̱le̱' },
  fmp: { title: 'Ŋkwî\'h\'ā ywî ndáp ncwô ncʉk. Kwǎ\' pê tê nè ŋkù\' mfák ntsʉ\'m ncʉk!', subtitle: 'Pê nsî ndáp ncwô ywî tʉmndā. Kwǎ\' pê tê nde cā\'ntâ nè ŋkù\' mfák ncʉk!', cta: 'Kwǎ\' pê tê nè sâ\' ntʉsí\'' },
};

export default function CommunityReviewBanner() {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (COMMUNITY_LANGS.includes(i18n.language) && !dismissed) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [i18n.language, dismissed]);

  useEffect(() => {
    setDismissed(false);
    setVisible(false);
  }, [i18n.language]);

  const langInfo = LANG_NAMES[i18n.language];
  const messages = BANNER_MESSAGES[i18n.language];
  const isNmt = langInfo?.type === 'nmt';

  if (!COMMUNITY_LANGS.includes(i18n.language) || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm animate-fadeSlideUp">
      <div className="bg-foreground-950 text-white rounded-2xl shadow-2xl p-5 border border-foreground-800">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-amber-500/20">
            <i className="ri-translate-2 text-xl text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">
                {langInfo?.native || i18n.language}
              </span>
              {isNmt ? (
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide">NMT + COMMUNAUTAIRE</span>
              ) : (
                <span className="text-[10px] text-foreground-400 font-bold uppercase tracking-wide">BETA</span>
              )}
            </div>
            <p className="text-xs font-bold text-white leading-snug">
              {messages?.title || 'Aidez-nous à améliorer cette traduction !'}
            </p>
            <p className="text-[10px] text-foreground-400 mt-1.5 leading-relaxed">
              {messages?.subtitle || 'Vos suggestions de locuteur natif améliorent l\'expérience pour des millions d\'utilisateurs.'}
            </p>
          </div>
          <button onClick={() => { setVisible(false); setDismissed(true); }} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-foreground-800 cursor-pointer flex-shrink-0 transition-colors">
            <i className="ri-close-line text-sm text-foreground-400" />
          </button>
        </div>
        <Link to="/contribution-communautaire/" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-amber-500 text-foreground-950 font-bold text-xs cursor-pointer whitespace-nowrap hover:bg-amber-400 transition-colors">
          <i className="ri-edit-line text-sm" />
          {messages?.cta || 'Proposer une correction'}
        </Link>
      </div>
    </div>
  );
}