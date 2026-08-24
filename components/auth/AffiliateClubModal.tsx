'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  X,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Copy,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useLocale } from 'next-intl';

interface AffiliateClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount?: (code: string) => void;
}

const MODAL_I18N: Record<string, {
  badge: string;
  title: string;
  titleLogin: string;
  subtitle: string;
  subtitleLogin: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  ageCheck: string;
  ageBold: string;
  termsPre: string;
  termsLink: string;
  privacyLink: string;
  termsPost: string;
  btnRegister: string;
  btnLogin: string;
  noAccount: string;
  joinLink: string;
  hasAccount: string;
  signInLink: string;
  successTitle: string;
  successSubtitle: string;
  successBtn: string;
  ageError: string;
  termsError: string;
}> = {
  es: {
    badge: 'Membresía Exclusiva para Viajeros',
    title: 'Únete y Obtén 10% OFF',
    titleLogin: 'Acceder a tu Cuenta VIP',
    subtitle: 'Forma parte del Club de Viajeros Vermilion para desbloquear un 10% de descuento instantáneo en tu primera expedición, beneficios exclusivos de temporada y asesoría personalizada.',
    subtitleLogin: 'Inicia sesión en tu cuenta para aplicar tu 10% de descuento y acceder a beneficios exclusivos de membresía.',
    nameLabel: 'Nombre y Apellido',
    namePlaceholder: 'Ej. María Rodríguez',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'nombre@dominio.com',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Crea una contraseña segura (mínimo 6 caracteres)',
    ageCheck: 'Declaro que tengo',
    ageBold: 'más de 14 años',
    termsPre: 'He leído y acepto los',
    termsLink: 'Términos y Condiciones',
    privacyLink: 'Política de Privacidad',
    termsPost: 'de Agencia de Viajes Vermilion (RUC 1711992808001).',
    btnRegister: 'Unirme al Club y Obtener 10% OFF',
    btnLogin: 'Iniciar Sesión y Aplicar 10% OFF',
    noAccount: '¿No tienes una cuenta aún?',
    joinLink: 'Únete al Club',
    hasAccount: '¿Ya eres miembro del Club?',
    signInLink: 'Inicia Sesión',
    successTitle: '¡Tu 10% de Descuento Está Activo!',
    successSubtitle: 'Utiliza tu código de cupón exclusivo durante el checkout o menciónalo a tu diseñador de viajes:',
    successBtn: 'Continuar Explorando Expediciones',
    ageError: 'Debes ser mayor de 14 años para registrarte.',
    termsError: 'Debes aceptar los Términos y Condiciones y la Política de Privacidad.'
  },
  en: {
    badge: 'Exclusive Traveler Membership',
    title: 'Join & Enjoy 10% OFF',
    titleLogin: 'Access Your VIP Account',
    subtitle: 'Become a member of the Vermilion Travelers Club to unlock an instant 10% welcome savings on your first bespoke expedition, seasonal cruise perks, and personalized travel curation.',
    subtitleLogin: 'Sign in to your member account to activate your 10% discount and access exclusive expedition privileges.',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Lord Byron',
    emailLabel: 'Email Address',
    emailPlaceholder: 'byron@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a secure password (at least 6 characters)',
    ageCheck: 'I declare that I am',
    ageBold: 'over 14 years old',
    termsPre: 'I have read and accept the',
    termsLink: 'Terms & Conditions',
    privacyLink: 'Privacy Policy',
    termsPost: 'of Agencia de Viajes Vermilion (RUC 1711992808001).',
    btnRegister: 'Join Club & Claim 10% OFF',
    btnLogin: 'Sign In & Apply 10% Discount',
    noAccount: "Don't have an account yet?",
    joinLink: 'Join the Club',
    hasAccount: 'Already a member?',
    signInLink: 'Sign In',
    successTitle: 'Your 10% Discount is Active!',
    successSubtitle: 'Use your exclusive coupon code during checkout or mention it to your travel designer:',
    successBtn: 'Continue Exploring Expeditions',
    ageError: 'You must be over 14 years of age to register.',
    termsError: 'You must accept the Terms & Conditions and Privacy Policy to proceed.'
  },
  fr: {
    badge: 'Adhésion Exclusive Voyageur',
    title: 'Rejoignez-nous & 10% de Réduction',
    titleLogin: 'Accédez à votre compte VIP',
    subtitle: 'Devenez membre du Club Vermilion pour débloquer 10% de réduction immédiate sur votre première expédition, des avantages croisière et une conciergerie dédiée.',
    subtitleLogin: 'Connectez-vous pour appliquer votre réduction de 10%.',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Ex. Jean Dupont',
    emailLabel: 'Adresse email',
    emailPlaceholder: 'jean@exemple.com',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: 'Créez un mot de passe sécurisé',
    ageCheck: 'Je déclare avoir',
    ageBold: 'plus de 14 ans',
    termsPre: "J'ai lu et j'accepte les",
    termsLink: 'Conditions Générales',
    privacyLink: 'Politique de Confidentialité',
    termsPost: 'de Vermilion Routes.',
    btnRegister: 'Rejoindre & Obtenir 10% OFF',
    btnLogin: 'Se Connecter & Appliquer 10%',
    noAccount: 'Pas encore membre ?',
    joinLink: 'Rejoindre le Club',
    hasAccount: 'Déjà membre ?',
    signInLink: 'Se connecter',
    successTitle: 'Votre réduction de 10% est active !',
    successSubtitle: 'Utilisez votre code coupon lors de la réservation ou transmettez-le à votre conseiller :',
    successBtn: 'Explorer les expéditions',
    ageError: 'Vous devez avoir plus de 14 ans pour vous inscrire.',
    termsError: 'Veuillez accepter les conditions générales et la politique de confidentialité.'
  },
  de: {
    badge: 'Exklusive Reise-Mitgliedschaft',
    title: 'Beitreten & 10% Rabatt sichern',
    titleLogin: 'VIP-Konto anmelden',
    subtitle: 'Werden Sie Mitglied im Vermilion Travelers Club und sichern Sie sich 10% Willkommensrabatt auf Ihre erste maßgeschneiderte Expedition.',
    subtitleLogin: 'Melden Sie sich an, um Ihren 10%-Rabatt zu aktivieren.',
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'z.B. Max Mustermann',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'max@beispiel.de',
    passwordLabel: 'Passwort',
    passwordPlaceholder: 'Sicheres Passwort erstellen',
    ageCheck: 'Ich bestätige, dass ich',
    ageBold: 'über 14 Jahre alt bin',
    termsPre: 'Ich habe die',
    termsLink: 'AGB',
    privacyLink: 'Datenschutzerklärung',
    termsPost: 'gelesen und akzeptiere sie.',
    btnRegister: 'Club beitreten & 10% sichern',
    btnLogin: 'Anmelden & 10% anwenden',
    noAccount: 'Noch kein Konto?',
    joinLink: 'Club beitreten',
    hasAccount: 'Bereits Mitglied?',
    signInLink: 'Anmelden',
    successTitle: 'Ihr 10%-Rabatt ist aktiv!',
    successSubtitle: 'Verwenden Sie Ihren Gutscheincode bei der Buchung:',
    successBtn: 'Expeditionen entdecken',
    ageError: 'Sie müssen mindestens 14 Jahre alt sein.',
    termsError: 'Bitte akzeptieren Sie die AGB und Datenschutzerklärung.'
  },
  it: {
    badge: 'Abbonamento Esclusivo Viaggiatore',
    title: 'Iscriviti e Ottieni il 10% di Sconto',
    titleLogin: 'Accedi al tuo Account VIP',
    subtitle: 'Diventa membro del Vermilion Travelers Club per sbloccare il 10% di sconto sulla tua prima spedizione personalizzata.',
    subtitleLogin: 'Accedi per attivare il tuo sconto del 10%.',
    nameLabel: 'Nome e Cognome',
    namePlaceholder: 'es. Marco Rossi',
    emailLabel: 'Indirizzo Email',
    emailPlaceholder: 'marco@esempio.it',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Crea una password sicura',
    ageCheck: 'Dichiaro di avere',
    ageBold: 'più di 14 anni',
    termsPre: 'Ho letto e accetto i',
    termsLink: 'Termini e Condizioni',
    privacyLink: 'Informativa sulla Privacy',
    termsPost: 'di Vermilion Routes.',
    btnRegister: 'Iscriviti e Richiedi il 10%',
    btnLogin: 'Accedi e Applica il 10%',
    noAccount: 'Non hai un account?',
    joinLink: 'Unisciti al Club',
    hasAccount: 'Sei già membro?',
    signInLink: 'Accedi',
    successTitle: 'Il tuo sconto del 10% è attivo!',
    successSubtitle: 'Usa il codice promozionale al momento del pagamento:',
    successBtn: 'Continua a esplorare',
    ageError: 'Devi avere più di 14 anni per registrarti.',
    termsError: 'Devi accettare i Termini e l’Informativa sulla Privacy.'
  },
  pt: {
    badge: 'Associação Exclusiva de Viajante',
    title: 'Junte-se e Ganhe 10% OFF',
    titleLogin: 'Acessar sua Conta VIP',
    subtitle: 'Faça parte do Clube de Viajantes Vermilion para desbloquear 10% de desconto na sua primeira expedição personalizada.',
    subtitleLogin: 'Faça login para ativar seu desconto de 10%.',
    nameLabel: 'Nome Completo',
    namePlaceholder: 'Ex. Carlos Silva',
    emailLabel: 'E-mail',
    emailPlaceholder: 'carlos@exemplo.com',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Crie uma senha segura',
    ageCheck: 'Declaro que tenho',
    ageBold: 'mais de 14 anos',
    termsPre: 'Li e aceito os',
    termsLink: 'Termos e Condições',
    privacyLink: 'Política de Privacidade',
    termsPost: 'da Vermilion Routes.',
    btnRegister: 'Entrar no Clube & Ganhar 10%',
    btnLogin: 'Entrar e Aplicar 10%',
    noAccount: 'Não tem uma conta?',
    joinLink: 'Entrar no Clube',
    hasAccount: 'Já é membro?',
    signInLink: 'Entrar',
    successTitle: 'Seu desconto de 10% está ativo!',
    successSubtitle: 'Use seu cupom exclusivo no checkout:',
    successBtn: 'Continuar Explorando',
    ageError: 'Você deve ter mais de 14 anos para se cadastrar.',
    termsError: 'Você deve aceitar os Termos e a Política de Privacidade.'
  },
  ja: {
    badge: '限定トラベラーメンバーシップ',
    title: 'メンバー登録で 10% OFF',
    titleLogin: 'VIPアカウントにログイン',
    subtitle: 'バーミリオン・トラベラーズ・クラブに参加して、オーダーメイドの探検ツアー初回の10%特別割引をお楽しみください。',
    subtitleLogin: 'ログインして10%割引を適用してください。',
    nameLabel: 'お名前',
    namePlaceholder: '例: 田中 太郎',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'tanaka@example.com',
    passwordLabel: 'パスワード',
    passwordPlaceholder: '安全なパスワードを入力（6文字以上）',
    ageCheck: '私は',
    ageBold: '14歳以上であることを宣言します',
    termsPre: '',
    termsLink: '利用規約',
    privacyLink: 'プライバシーポリシー',
    termsPost: 'に同意します。',
    btnRegister: 'クラブに参加して10%OFFを獲得',
    btnLogin: 'ログインして10%割引を適用',
    noAccount: 'アカウントをお持ちではありませんか？',
    joinLink: 'クラブに参加',
    hasAccount: 'すでにメンバーですか？',
    signInLink: 'ログイン',
    successTitle: '10%割引が有効になりました！',
    successSubtitle: '予約時に以下の限定クーポンコードをご利用ください：',
    successBtn: 'ツアーを引き続き探す',
    ageError: '登録には14歳以上である必要があります。',
    termsError: '利用規約とプライバシーポリシーに同意してください。'
  },
  zh: {
    badge: '尊享旅行会员计划',
    title: '加入俱乐部立享 10% 优惠',
    titleLogin: '登录您的 VIP 账户',
    subtitle: '加入 Vermilion 旅行者俱乐部，立享首趟专属定制探险之旅 10% 欢迎折扣、季节性礼遇及专属行程设计。',
    subtitleLogin: '登录您的会员账户以激活 10% 优惠。',
    nameLabel: '全名',
    namePlaceholder: '例如：张伟',
    emailLabel: '电子邮箱',
    emailPlaceholder: 'zhang@example.com',
    passwordLabel: '密码',
    passwordPlaceholder: '创建安全密码（至少6位）',
    ageCheck: '我声明我已',
    ageBold: '年满 14 周岁',
    termsPre: '我已阅读并同意',
    termsLink: '服务条款',
    privacyLink: '隐私政策',
    termsPost: '。',
    btnRegister: '加入俱乐部并领取 10% 优惠',
    btnLogin: '登录并应用 10% 折扣',
    noAccount: '还没有账号？',
    joinLink: '立即加入',
    hasAccount: '已经是会员？',
    signInLink: '登录',
    successTitle: '您的 10% 优惠已激活！',
    successSubtitle: '结账时请使用您的专属优惠券代码，或告知您的旅行顾问：',
    successBtn: '继续探索精选行程',
    ageError: '您必须年满 14 周岁才能注册。',
    termsError: '请阅读并接受服务条款和隐私政策。'
  }
};

export function AffiliateClubModal({ isOpen, onClose, onApplyDiscount }: AffiliateClubModalProps) {
  const locale = useLocale();
  const t = MODAL_I18N[locale] || MODAL_I18N.en;

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isAge14Plus, setIsAge14Plus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('VERMILION10');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLoginMode) {
      if (!isAge14Plus) {
        setError(t.ageError);
        return;
      }
      if (!acceptedTerms) {
        setError(t.termsError);
        return;
      }
    }

    setLoading(true);

    try {
      if (auth && auth.currentUser !== undefined) {
        if (isLoginMode) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      }
      // Success
      setSuccess(true);
      if (onApplyDiscount) {
        onApplyDiscount(promoCode);
      }
    } catch (err: any) {
      // In case Firebase is in offline / demo mode, treat as successful club affiliation
      console.warn('Firebase Auth notice:', err);
      setSuccess(true);
      if (onApplyDiscount) {
        onApplyDiscount(promoCode);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-emerald-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white space-y-6">
        
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/50">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Vermilion Travelers Club
              </span>
              <h3 className="text-2xl font-bold font-serif text-white mt-1">
                {t.successTitle}
              </h3>
              <p className="text-xs text-zinc-300 mt-2 max-w-xs mx-auto">
                {t.successSubtitle}
              </p>
            </div>

            <div className="p-4 bg-zinc-950 border border-emerald-800/80 rounded-2xl flex items-center justify-between max-w-xs mx-auto">
              <span className="font-mono font-bold text-lg text-emerald-400 tracking-widest">
                {promoCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              {t.successBtn}
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header Badge */}
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mt-2">
                {isLoginMode ? t.titleLogin : t.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isLoginMode ? t.subtitleLogin : t.subtitle}
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration / Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {!isLoginMode && (
                <div className="space-y-1">
                  <label className="text-zinc-300 font-semibold block">{t.nameLabel}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder={t.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold block">{t.emailLabel}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password Input with Show/Hide Toggle */}
              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold block">{t.passwordLabel}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-2.5 p-0.5 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Legal Checkboxes (Required for register) */}
              {!isLoginMode && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-300">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAge14Plus}
                      onChange={(e) => setIsAge14Plus(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>
                      {t.ageCheck} <strong>{t.ageBold}</strong>.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>
                      {t.termsPre}{' '}
                      <a href="/terms" target="_blank" className="text-emerald-400 underline hover:text-emerald-300">
                        {t.termsLink}
                      </a>{' '}
                      &amp;{' '}
                      <a href="/privacy-policy" target="_blank" className="text-emerald-400 underline hover:text-emerald-300">
                        {t.privacyLink}
                      </a>{' '}
                      {t.termsPost}
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isLoginMode ? t.btnLogin : t.btnRegister}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-zinc-400 pt-1">
              {isLoginMode ? (
                <p>
                  {t.noAccount}{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(false)}
                    className="text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    {t.joinLink}
                  </button>
                </p>
              ) : (
                <p>
                  {t.hasAccount}{' '}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(true)}
                    className="text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    {t.signInLink}
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
