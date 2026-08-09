const fs = require('fs');
const path = require('path');

const translations = {
  es: {
    meta: {
      title: "Vermilion Routes | Viajes de Lujo a Medida",
      description: "Experimenta Sudamérica con itinerarios a medida, cruceros de lujo en las Islas Galápagos, expediciones a la selva amazónica y caminatas por los volcanes andinos."
    },
    nav: {
      home: "Inicio",
      destinations: "Destinos",
      galapagos: "Islas Galápagos",
      ecuador: "Ecuador Continental",
      peru: "Perú Místico",
      tours: "Tours Destacados",
      about: "Nosotros",
      contact: "Contacto",
      quote: "Solicitar Cotización",
      banner: {
        tagline: "Expediciones a Medida y Grupos Pequeños Privados",
        badge: "Viajes de Lujo Exclusivos"
      }
    },
    hero: {
      badge: "Viajes de Lujo Premiados",
      title: "Lo Más Extraordinario",
      subtitle: "Expediciones a medida a las Islas Galápagos, los Andes, la Selva Amazónica y Machu Picchu — diseñadas por guías locales expertos.",
      cta: { explore: "Explorar Tours", quote: "Cotización Gratis" },
      stats: { tours: "Tours a Medida", reviews: "Reseñas de 5 Estrellas", naturalists: "Naturalistas Expertos", support: "Soporte 24/7" }
    },
    destinations: {
      badge: "¿A dónde irás?",
      title: "Explora Nuestros Destinos",
      subtitle: "Desde los picos volcánicos de los Andes hasta los arrecifes prístinos de Galápagos — te llevamos a donde pocos viajeros se atreven a ir.",
      cta: "Explorar Tours"
    },
    tours: {
      badge: "Carrusel Interactivo 3D",
      title: "Viajes Destacados",
      subtitle: "Experiencias seleccionadas lideradas por expertos naturalistas locales con logística impecable, estancias boutique y el equilibrio perfecto entre lujo y aventura.",
      cta: {
        label: "¿Buscas algo 100% personalizado?",
        title: "Diseñamos tu Itinerario a Medida sin Costo Extra",
        subtitle: "Nuestros especialistas en destinos personalizarán fechas, ritmo, nivel de lujo y excursiones privadas según tus preferencias.",
        button: "Solicitar Itinerario Personalizado"
      },
      filter: { all: "Todas las Expediciones", galapagos: "Islas Galápagos", ecuador: "Ecuador Continental", peru: "Cusco y Perú" },
      card: { from: "Desde", person: "/ persona", view: "Ver Detalles", bestseller: "Más Vendido" },
      showing: "Mostrando", of: "de", journeys: "viajes"
    },
    about: {
      badge: "Quiénes Somos",
      title: "Expertos en Viajes Boutique",
      subtitle: "Somos un operador turístico boutique certificado con sede en Quito, Ecuador, especializado en expediciones de lujo a medida.",
      cta: "Planificar Mi Viaje"
    },
    experience: {
      badge: "Sobre Vermilion Routes",
      title: "Experiencia Inigualable, Excelencia Absoluta",
      text: "En Vermilion Routes, no solo reservamos tours. Creamos expediciones únicas, inolvidables y totalmente personalizadas.",
      certified: "Operador Certificado", sustainable: "Impacto Sostenible"
    },
    reviews: { badge: "Experiencias de Huéspedes", title: "Lo que dicen nuestros viajeros", verified: "Verificado en TripAdvisor" },
    faq: { badge: "Preguntas Frecuentes", title: "Preguntas Frecuentes", subtitle: "Todo lo que necesitas saber para planificar tu expedición de lujo." },
    contact: {
      badge: "Planifiquemos tu Viaje", title: "Solicita tu Cotización", subtitle: "Cuéntanos sobre la expedición de tus sueños.",
      name: "Nombre Completo", email: "Correo Electrónico", destination: "Destino de Interés", travelers: "Número de Viajeros", message: "Cuéntanos sobre la expedición de tus sueños...", send: "Enviar Solicitud", sending: "Enviando...", success: "¡Gracias! Nos pondremos en contacto en 24 horas."
    },
    tour: {
      overview: "Resumen", itinerary: "Itinerario", includes: "Qué Incluye", optional: "Opcionales", day: "Día", book: "Reservar este Tour", download: "Descargar PDF", group: { price: "Tarifa Grupal" }, from: "Desde", per: { person: "por persona" }, duration: "Duración", destination: "Destino", rating: "Calificación", gallery: "Galería de Fotos", highlights: "Destacados", included: "Incluido", excluded: "No Incluido", meals: "Comidas", accommodation: "Alojamiento"
    },
    footer: {
      tagline: "Especialistas principales en expediciones boutique de lujo en Ecuador, Galápagos y Perú desde 2005.",
      rights: "Todos los derechos reservados.", privacy: "Política de Privacidad", terms: "Términos de Servicio"
    }
  },
  fr: {
    meta: {
      title: "Vermilion Routes | Voyages de Luxe sur Mesure",
      description: "Découvrez l'Amérique du Sud avec des itinéraires sur mesure, des croisières de luxe aux îles Galapagos, des expéditions en Amazonie et des randonnées dans les Andes."
    },
    nav: {
      home: "Accueil",
      destinations: "Destinations",
      galapagos: "Îles Galapagos",
      ecuador: "Équateur Continental",
      peru: "Pérou Mystique",
      tours: "Circuits Phares",
      about: "À Propos",
      contact: "Contact",
      quote: "Demander un Devis",
      banner: {
        tagline: "Expéditions sur Mesure et Petits Groupes Privés",
        badge: "Voyages de Luxe Exclusifs"
      }
    },
    hero: {
      badge: "Voyages de Luxe Primés",
      title: "Les Plus Extraordinaires",
      subtitle: "Des expéditions sur mesure aux îles Galapagos, dans les Andes, la forêt amazonienne et le Machu Picchu.",
      cta: { explore: "Explorer les Circuits", quote: "Devis Gratuit" },
      stats: { tours: "Circuits sur Mesure", reviews: "Avis 5 Étoiles", naturalists: "Naturalistes Experts", support: "Support 24/7" }
    },
    destinations: {
      badge: "Où Irez-vous ?",
      title: "Explorez Nos Destinations",
      subtitle: "Des sommets volcaniques des Andes aux récifs immaculés des Galapagos — nous vous emmenons là où peu de voyageurs osent s'aventurer.",
      cta: "Explorer les Circuits"
    },
    tours: {
      badge: "Carrousel Interactif 3D",
      title: "Voyages Emblématiques",
      subtitle: "Des expériences sélectionnées, guidées par des experts naturalistes locaux avec une logistique impeccable.",
      cta: {
        label: "Vous cherchez du 100% sur mesure ?",
        title: "Nous Concevons Votre Itinéraire Sans Frais",
        subtitle: "Nos spécialistes personnaliseront vos dates, le rythme et le luxe selon vos préférences.",
        button: "Demander un Itinéraire Personnalisé"
      },
      filter: { all: "Toutes les Expéditions", galapagos: "Îles Galapagos", ecuador: "Équateur Continental", peru: "Cusco & Pérou" },
      card: { from: "À partir de", person: "/ personne", view: "Voir les Détails", bestseller: "Meilleure Vente" },
      showing: "Affichage", of: "sur", journeys: "voyages"
    },
    about: {
      badge: "Qui Sommes-Nous",
      title: "Expertise en Voyage Boutique",
      subtitle: "Nous sommes un tour-opérateur boutique certifié basé à Quito, en Équateur.",
      cta: "Planifier Mon Voyage"
    },
    experience: {
      badge: "À Propos de Vermilion Routes",
      title: "Expérience Inégalée, Excellence Absolue",
      text: "Chez Vermilion Routes, nous ne nous contentons pas de réserver des circuits. Nous créons des expéditions uniques, inoubliables et personnalisées.",
      certified: "Opérateur Certifié", sustainable: "Impact Durable"
    },
    reviews: { badge: "Expériences des Clients", title: "Ce que disent nos voyageurs", verified: "Vérifié sur TripAdvisor" },
    faq: { badge: "Questions Fréquentes", title: "Foire Aux Questions", subtitle: "Tout ce que vous devez savoir pour planifier votre expédition." },
    contact: {
      badge: "Planifions Votre Voyage", title: "Demandez Votre Devis", subtitle: "Parlez-nous de l'expédition de vos rêves.",
      name: "Nom Complet", email: "Adresse Email", destination: "Destination Souhaitée", travelers: "Nombre de Voyageurs", message: "Parlez-nous de l'expédition de vos rêves...", send: "Envoyer la Demande", sending: "Envoi...", success: "Merci ! Nous vous contacterons dans les 24 heures."
    },
    tour: {
      overview: "Aperçu", itinerary: "Itinéraire", includes: "Ce Qui Est Inclus", optional: "En Option", day: "Jour", book: "Réserver ce Circuit", download: "Télécharger PDF", group: { price: "Tarif de Groupe" }, from: "À partir de", per: { person: "par personne" }, duration: "Durée", destination: "Destination", rating: "Évaluation", gallery: "Galerie de Photos", highlights: "Points Forts", included: "Inclus", excluded: "Non Inclus", meals: "Repas", accommodation: "Hébergement"
    },
    footer: {
      tagline: "Spécialistes des expéditions de luxe en Équateur, aux Galapagos et au Pérou depuis 2005.",
      rights: "Tous droits réservés.", privacy: "Politique de Confidentialité", terms: "Conditions d'Utilisation"
    }
  },
  de: {
    meta: {
      title: "Vermilion Routes | Maßgeschneiderte Luxusreisen",
      description: "Erleben Sie Südamerika mit maßgeschneiderten Reiserouten, Luxuskreuzfahrten und mehr."
    },
    nav: {
      home: "Startseite", destinations: "Reiseziele", galapagos: "Galapagos-Inseln", ecuador: "Festland Ecuador", peru: "Mystisches Peru", tours: "Ausgewählte Touren", about: "Über Uns", contact: "Kontakt", quote: "Angebot anfordern",
      banner: { tagline: "Maßgeschneiderte Expeditionen", badge: "Exklusive Luxusreisen" }
    },
    hero: {
      badge: "Preisgekrönte Luxusreisen", title: "Das Außergewöhnlichste", subtitle: "Maßgeschneiderte Expeditionen in die Anden und in den Amazonas.",
      cta: { explore: "Alle Touren", quote: "Kostenloses Angebot" }, stats: { tours: "Maßgeschneidert", reviews: "5-Sterne-Bewertungen", naturalists: "Experten", support: "24/7 Support" }
    },
    destinations: {
      badge: "Wohin geht die Reise?", title: "Unsere Reiseziele", subtitle: "Wir bringen Sie dorthin, wo sich nur wenige Reisende hintrauen.", cta: "Touren Erkunden"
    },
    tours: {
      badge: "Touren", title: "Ausgewählte Reisen", subtitle: "Kuratierte Erlebnisse mit Experten.",
      cta: { label: "Suchen Sie etwas Maßgeschneidertes?", title: "Wir planen Ihre Reise", subtitle: "Unsere Spezialisten passen alles an Ihre Wünsche an.", button: "Individuelle Reiseroute" },
      filter: { all: "Alle Expeditionen", galapagos: "Galapagos", ecuador: "Ecuador", peru: "Peru" },
      card: { from: "Ab", person: "/ Person", view: "Details", bestseller: "Bestseller" },
      showing: "Zeige", of: "von", journeys: "Reisen"
    },
    about: { badge: "Wer wir sind", title: "Boutique-Reiseexperten", subtitle: "Wir sind ein zertifizierter Boutique-Reiseveranstalter.", cta: "Reise planen" },
    experience: { badge: "Über uns", title: "Unerreichte Erfahrung", text: "Wir schaffen einzigartige Expeditionen.", certified: "Zertifiziert", sustainable: "Nachhaltig" },
    reviews: { badge: "Erfahrungen", title: "Was Reisende sagen", verified: "TripAdvisor Geprüft" },
    faq: { badge: "Fragen", title: "Häufig gestellte Fragen", subtitle: "Alles was Sie wissen müssen." },
    contact: {
      badge: "Planen", title: "Angebot anfordern", subtitle: "Erzählen Sie uns von Ihrer Traumreise.",
      name: "Name", email: "E-Mail", destination: "Reiseziel", travelers: "Reisende", message: "Nachricht...", send: "Senden", sending: "Senden...", success: "Danke!"
    },
    tour: {
      overview: "Übersicht", itinerary: "Reiseroute", includes: "Inklusive", optional: "Optional", day: "Tag", book: "Buchen", download: "PDF", group: { price: "Gruppenpreis" }, from: "Ab", per: { person: "pro Person" }, duration: "Dauer", destination: "Reiseziel", rating: "Bewertung", gallery: "Galerie", highlights: "Highlights", included: "Inbegriffen", excluded: "Nicht inbegriffen", meals: "Mahlzeiten", accommodation: "Unterkunft"
    },
    footer: { tagline: "Spezialisten seit 2005.", rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz", terms: "AGB" }
  },
  it: {
    meta: {
      title: "Vermilion Routes | Viaggi di Lusso su Misura",
      description: "Vivi il Sud America con itinerari su misura."
    },
    nav: {
      home: "Home", destinations: "Destinazioni", galapagos: "Isole Galapagos", ecuador: "Ecuador Continentale", peru: "Perù Mistico", tours: "Tour in Evidenza", about: "Chi Siamo", contact: "Contatti", quote: "Richiedi Preventivo",
      banner: { tagline: "Spedizioni su Misura", badge: "Viaggi Esclusivi" }
    },
    hero: {
      badge: "Viaggi di Lusso Premiati", title: "Il Più Straordinario", subtitle: "Spedizioni su misura nelle Ande e in Amazzonia.",
      cta: { explore: "Esplora i Tour", quote: "Preventivo Gratuito" }, stats: { tours: "Su Misura", reviews: "Recensioni 5 Stelle", naturalists: "Guide Esperte", support: "Supporto 24/7" }
    },
    destinations: {
      badge: "Dove andrai?", title: "Esplora le nostre destinazioni", subtitle: "Ti portiamo dove pochi viaggiatori osano andare.", cta: "Esplora"
    },
    tours: {
      badge: "Tour", title: "Viaggi d'Autore", subtitle: "Esperienze curate da guide esperte.",
      cta: { label: "Cerchi qualcosa su misura?", title: "Progettiamo il tuo itinerario", subtitle: "I nostri specialisti personalizzeranno tutto.", button: "Richiedi Itinerario" },
      filter: { all: "Tutte le spedizioni", galapagos: "Galapagos", ecuador: "Ecuador", peru: "Perù" },
      card: { from: "Da", person: "/ persona", view: "Dettagli", bestseller: "Più Venduto" },
      showing: "Mostrando", of: "di", journeys: "viaggi"
    },
    about: { badge: "Chi Siamo", title: "Esperti di Viaggi", subtitle: "Siamo un operatore turistico boutique certificato.", cta: "Pianifica il Viaggio" },
    experience: { badge: "Su di noi", title: "Esperienza Ineguagliabile", text: "Creiamo spedizioni uniche e indimenticabili.", certified: "Certificato", sustainable: "Sostenibile" },
    reviews: { badge: "Esperienze", title: "Cosa Dicono i Nostri Viaggiatori", verified: "Verificato TripAdvisor" },
    faq: { badge: "Domande", title: "Domande Frequenti", subtitle: "Tutto ciò che devi sapere." },
    contact: {
      badge: "Pianifica", title: "Richiedi Preventivo", subtitle: "Raccontaci il viaggio dei tuoi sogni.",
      name: "Nome", email: "Email", destination: "Destinazione", travelers: "Viaggiatori", message: "Messaggio...", send: "Invia", sending: "Invio...", success: "Grazie!"
    },
    tour: {
      overview: "Panoramica", itinerary: "Itinerario", includes: "Cosa è Incluso", optional: "Opzionale", day: "Giorno", book: "Prenota", download: "PDF", group: { price: "Prezzo Gruppo" }, from: "Da", per: { person: "a persona" }, duration: "Durata", destination: "Destinazione", rating: "Valutazione", gallery: "Galleria", highlights: "In Evidenza", included: "Incluso", excluded: "Non Incluso", meals: "Pasti", accommodation: "Alloggio"
    },
    footer: { tagline: "Specialisti dal 2005.", rights: "Tutti i diritti riservati.", privacy: "Privacy", terms: "Termini" }
  },
  pt: {
    meta: {
      title: "Vermilion Routes | Viagens de Luxo sob Medida",
      description: "Experimente a América do Sul com itinerários sob medida."
    },
    nav: {
      home: "Início", destinations: "Destinos", galapagos: "Ilhas Galápagos", ecuador: "Equador Continental", peru: "Peru Místico", tours: "Passeios em Destaque", about: "Sobre Nós", contact: "Contato", quote: "Solicitar Orçamento",
      banner: { tagline: "Expedições sob Medida", badge: "Viagens Exclusivas" }
    },
    hero: {
      badge: "Viagens Premiadas", title: "O Mais Extraordinário", subtitle: "Expedições sob medida para os Andes e Amazônia.",
      cta: { explore: "Explorar Passeios", quote: "Orçamento Grátis" }, stats: { tours: "Sob Medida", reviews: "Avaliações 5 Estrelas", naturalists: "Guias Especialistas", support: "Suporte 24/7" }
    },
    destinations: {
      badge: "Para onde você vai?", title: "Explore Nossos Destinos", subtitle: "Levamos você onde poucos ousam ir.", cta: "Explorar"
    },
    tours: {
      badge: "Passeios", title: "Viagens em Destaque", subtitle: "Experiências curadas por guias especialistas.",
      cta: { label: "Procurando algo sob medida?", title: "Projetamos seu Itinerário", subtitle: "Nossos especialistas personalizarão tudo.", button: "Solicitar Itinerário" },
      filter: { all: "Todas as Expedições", galapagos: "Galápagos", ecuador: "Equador", peru: "Peru" },
      card: { from: "De", person: "/ pessoa", view: "Detalhes", bestseller: "Mais Vendido" },
      showing: "Mostrando", of: "de", journeys: "viagens"
    },
    about: { badge: "Quem Somos", title: "Especialistas em Viagens", subtitle: "Somos um operador turístico boutique certificado.", cta: "Planejar Viagem" },
    experience: { badge: "Sobre Nós", title: "Experiência Inigualável", text: "Criamos expedições únicas e inesquecíveis.", certified: "Certificado", sustainable: "Sustentável" },
    reviews: { badge: "Experiências", title: "O que dizem os nossos viajantes", verified: "Verificado no TripAdvisor" },
    faq: { badge: "Perguntas", title: "Perguntas Frequentes", subtitle: "Tudo o que você precisa saber." },
    contact: {
      badge: "Planeje", title: "Solicitar Orçamento", subtitle: "Conte-nos sobre a viagem dos seus sonhos.",
      name: "Nome", email: "E-mail", destination: "Destino", travelers: "Viajantes", message: "Mensagem...", send: "Enviar", sending: "Enviando...", success: "Obrigado!"
    },
    tour: {
      overview: "Visão Geral", itinerary: "Itinerário", includes: "Inclui", optional: "Opcional", day: "Dia", book: "Reservar", download: "PDF", group: { price: "Preço de Grupo" }, from: "De", per: { person: "por pessoa" }, duration: "Duração", destination: "Destino", rating: "Avaliação", gallery: "Galeria", highlights: "Destaques", included: "Incluído", excluded: "Não Incluído", meals: "Refeições", accommodation: "Acomodação"
    },
    footer: { tagline: "Especialistas desde 2005.", rights: "Todos os direitos reservados.", privacy: "Privacidade", terms: "Termos" }
  },
  ja: {
    meta: {
      title: "Vermilion Routes | オーダーメイドの豪華旅行",
      description: "オーダーメイドの旅程で南米を体験してください。"
    },
    nav: {
      home: "ホーム", destinations: "目的地", galapagos: "ガラパゴス諸島", ecuador: "エクアドル本土", peru: "神秘的なペルー", tours: "注目のツアー", about: "私たちについて", contact: "お問い合わせ", quote: "見積もりを依頼する",
      banner: { tagline: "オーダーメイドの遠征", badge: "特別な豪華旅行" }
    },
    hero: {
      badge: "受賞歴のある豪華旅行", title: "最も並外れた", subtitle: "アンデスとアマゾンへのオーダーメイドの遠征。",
      cta: { explore: "ツアーを見る", quote: "無料見積もり" }, stats: { tours: "オーダーメイド", reviews: "5つ星の評価", naturalists: "専門のガイド", support: "24時間年中無休" }
    },
    destinations: {
      badge: "どこへ行きますか？", title: "目的地を探す", subtitle: "少数の旅行者しかあえて行かない場所へお連れします。", cta: "ツアーを見る"
    },
    tours: {
      badge: "ツアー", title: "注目の旅", subtitle: "専門のガイドによる厳選された体験。",
      cta: { label: "オーダーメイドをお探しですか？", title: "旅程をデザインします", subtitle: "私たちの専門家がすべてをカスタマイズします。", button: "旅程をリクエストする" },
      filter: { all: "すべての遠征", galapagos: "ガラパゴス", ecuador: "エクアドル", peru: "ペルー" },
      card: { from: "から", person: "/ 人", view: "詳細", bestseller: "ベストセラー" },
      showing: "表示中", of: "の", journeys: "旅"
    },
    about: { badge: "私たちについて", title: "旅行の専門家", subtitle: "私たちは認定された旅行会社です。", cta: "旅行を計画する" },
    experience: { badge: "私たちについて", title: "比類のない経験", text: "私たちはユニークで忘れられない遠征を作成します。", certified: "認定", sustainable: "持続可能" },
    reviews: { badge: "経験", title: "旅行者の声", verified: "トリップアドバイザーで確認済み" },
    faq: { badge: "質問", title: "よくある質問", subtitle: "知っておくべきことすべて。" },
    contact: {
      badge: "計画", title: "見積もりを依頼する", subtitle: "あなたの夢の旅行について教えてください。",
      name: "名前", email: "メール", destination: "目的地", travelers: "旅行者", message: "メッセージ...", send: "送信", sending: "送信中...", success: "ありがとう！"
    },
    tour: {
      overview: "概要", itinerary: "旅程", includes: "含まれるもの", optional: "オプション", day: "日", book: "予約する", download: "PDF", group: { price: "グループ価格" }, from: "から", per: { person: "一人当たり" }, duration: "期間", destination: "目的地", rating: "評価", gallery: "ギャラリー", highlights: "ハイライト", included: "含まれる", excluded: "含まれない", meals: "食事", accommodation: "宿泊施設"
    },
    footer: { tagline: "2005年からの専門家。", rights: "無断転載を禁じます。", privacy: "プライバシーポリシー", terms: "利用規約" }
  },
  zh: {
    meta: {
      title: "Vermilion Routes | 量身定制的豪华旅行",
      description: "通过量身定制的行程体验南美洲。"
    },
    nav: {
      home: "主页", destinations: "目的地", galapagos: "加拉帕戈斯群岛", ecuador: "厄瓜多尔大陆", peru: "神秘的秘鲁", tours: "特色旅游", about: "关于我们", contact: "联系我们", quote: "请求报价",
      banner: { tagline: "量身定制的探险", badge: "独家豪华旅行" }
    },
    hero: {
      badge: "屡获殊荣的豪华旅行", title: "最非凡的", subtitle: "前往安第斯山脉和亚马逊的量身定制探险。",
      cta: { explore: "探索旅游", quote: "免费报价" }, stats: { tours: "量身定制", reviews: "五星好评", naturalists: "专家向导", support: "24/7 支持" }
    },
    destinations: {
      badge: "你要去哪里？", title: "探索我们的目的地", subtitle: "我们带您去很少有旅行者敢去的地方。", cta: "探索"
    },
    tours: {
      badge: "旅游", title: "特色旅程", subtitle: "由专家向导精心策划的体验。",
      cta: { label: "寻找量身定制的服务？", title: "我们设计您的行程", subtitle: "我们的专家将定制一切。", button: "请求行程" },
      filter: { all: "所有探险", galapagos: "加拉帕戈斯", ecuador: "厄瓜多尔", peru: "秘鲁" },
      card: { from: "起", person: "/ 人", view: "详细信息", bestseller: "畅销" },
      showing: "显示", of: "的", journeys: "旅程"
    },
    about: { badge: "关于我们", title: "旅行专家", subtitle: "我们是一家经过认证的精品旅游运营商。", cta: "计划旅行" },
    experience: { badge: "关于我们", title: "无与伦比的体验", text: "我们创造独特而难忘的探险。", certified: "认证", sustainable: "可持续" },
    reviews: { badge: "体验", title: "旅客的话", verified: "TripAdvisor 已验证" },
    faq: { badge: "问题", title: "常见问题", subtitle: "您需要知道的一切。" },
    contact: {
      badge: "计划", title: "请求报价", subtitle: "告诉我们您的梦想之旅。",
      name: "姓名", email: "电子邮件", destination: "目的地", travelers: "旅客", message: "信息...", send: "发送", sending: "发送中...", success: "谢谢！"
    },
    tour: {
      overview: "概述", itinerary: "行程", includes: "包括", optional: "可选", day: "天", book: "预订", download: "PDF", group: { price: "团体价格" }, from: "从", per: { person: "每人" }, duration: "持续时间", destination: "目的地", rating: "评分", gallery: "画廊", highlights: "亮点", included: "包括", excluded: "不包括", meals: "膳食", accommodation: "住宿"
    },
    footer: { tagline: "自 2005 年以来的专家。", rights: "版权所有。", privacy: "隐私政策", terms: "条款" }
  }
};

for (const [locale, data] of Object.entries(translations)) {
  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Saved ${locale}.json`);
}
