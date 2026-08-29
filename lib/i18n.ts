export const LOCALES = ["ky", "ru", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ky";
export const STORAGE_LOCALE_KEY = "kut-banya-locale";

export const BRAND_NAME = "Kut Banya";
export const BRAND_SLOGAN = "Kyrgyz sauna";

export const DATE_LOCALES: Record<Locale, string> = {
  ky: "ky-KG",
  ru: "ru-RU",
  en: "en-US",
};

type Copy = {
  langLabel: string;
  navHome: string;
  navGallery: string;
  navBook: string;
  heroLead: string;
  bookCta: string;
  galleryCta: string;
  heroImageAlt: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryIntro: string;
  photos: Array<{ src: string; title: string; text: string; alt: string }>;
  whyEyebrow: string;
  whyTitle: string;
  whyItems: Array<{ title: string; text: string }>;
  contactEyebrow: string;
  addressLabel: string;
  addressTitle: string;
  addressText: string;
  phoneLabel: string;
  phoneText: string;
  hoursLabel: string;
  hoursTitle: string;
  hoursText: string;
  footerNote: string;
  bookEyebrow: string;
  bookTitleBefore: string;
  bookTitleAccent: string;
  bookIntro: string;
  weekdays: [string, string, string, string, string, string, string];
  prevMonth: string;
  nextMonth: string;
  pickCabin: string;
  cabinLabel: string;
  cabin1: string;
  cabin2: string;
  cabinHint: string;
  pickSlot: string;
  loadingSlots: string;
  success: string;
  session: string;
  nameLabel: string;
  emailField: string;
  phoneField: string;
  peopleLabel: string;
  confirm: string;
  navLogin: string;
  navSignup: string;
  navLogout: string;
  authLoginTitle: string;
  authSignupTitle: string;
  authLoginLead: string;
  authSignupLead: string;
  authPassword: string;
  authPasswordRepeat: string;
  authSubmitLogin: string;
  authSubmitSignup: string;
  authToSignup: string;
  authToLogin: string;
  authErrorMissing: string;
  authErrorExists: string;
  authErrorWrong: string;
  authErrorMismatch: string;
  authErrorGeneric: string;
  authVerifyLead: string;
  authVerifyCode: string;
  authSubmitVerify: string;
  authHello: string;
  navAccount: string;
  accountTitle: string;
  accountLead: string;
  villageLabel: string;
  homeAddressLabel: string;
  accountSave: string;
  accountSaved: string;
  accountDelete: string;
  accountDeleteConfirm: string;
  accountDeleteHint: string;
  accountNeedLogin: string;
  navMenu: string;
  navClose: string;
  navBack: string;
  navAdmin: string;
  navHistory: string;
  roleCustomer: string;
  roleAdmin: string;
  roleLead: string;
  adminCodeLabel: string;
  adminCodeHint: string;
  authErrorForbidden: string;
  payLabel: string;
  payCash: string;
  payCard: string;
  payCashHint: string;
  payCardHint: string;
  payWhatsapp: string;
  adultsLabel: string;
  kidsLabel: string;
  priceRates: string;
  priceTotal: string;
  successMbank: string;
  bookNeedLogin: string;
  bookTaken: string;
  adminTitle: string;
  adminLead: string;
  adminEmpty: string;
  adminNeedLogin: string;
  adminName: string;
  adminPhone: string;
  adminPeople: string;
  adminPaid: string;
  adminUnpaid: string;
  adminMarkPaid: string;
  adminCancel: string;
  adminCancelConfirm: string;
  adminColDate: string;
  adminColCabin: string;
  adminColTime: string;
  adminColStatus: string;
  adminClickHint: string;
  adminGuestTitle: string;
  adminCloseGuest: string;
  adminPickDay: string;
  adminClickBusy: string;
  slotBusy: string;
  slotFree: string;
  visitPassed: string;
  visitCancelled: string;
  visitUpcoming: string;
  historyTitle: string;
  historyLead: string;
  historyNext: string;
  historyNoNext: string;
  historyEmpty: string;
  historyNeedLogin: string;
  historyUpcomingList: string;
  historyPassedList: string;
  historyCancelledList: string;
};

export const COPY: Record<Locale, Copy> = {
  ky: {
    langLabel: "Кыргызча",
    navHome: "Башкы бет",
    navGallery: "Галерея",
    navBook: "Брондоо",
    heroLead:
      "Токой ичиндеги жылуу үй. Чыныгы ысык, жыгачтын жыты жана жеңил буу шаардын ызы-чуусун эшикте калтырат. Жүп, үй-бүлө же достор менен келиңиз.",
    bookCta: "Убакыт алуу",
    galleryCta: "Галерея",
    heroImageAlt: "Токойдогу жылуу үй",
    galleryEyebrow: "Үй жана жаратылыш",
    galleryTitle: "Көрүңүз, сезиңиз, эс алыңыз",
    galleryIntro:
      "Kut Banya — жыгач менен жагылуучу баня. Бул жерде от, токой жана тынчтык бирге. Төмөндө үйдүн жылуулугун жана курчап турган жаратылышты көрөсүз.",
    photos: [
      {
        src: "/images/gallery-sauna.jpg",
        title: "Жылуу пар",
        text: "Ысык таштар, жыгач керебеттер жана жумшак буу. Баня денени эмес, башты да эс алдырат.",
        alt: "Жыгач банянын ичи, ысык таштар жана буу",
      },
      {
        src: "/images/gallery-forest.jpg",
        title: "Токой тынчтыгы",
        text: "Үй карагайлардын арасында турат. Терезеден жалаң жаратылыш — машина да, шаар да жок.",
        alt: "Тумандуу карагай токою",
      },
      {
        src: "/images/gallery-fire.jpg",
        title: "Чыныгы от",
        text: "Биз баняны жыгач менен жагабыз. Жыты таза, ысыгы терең, пар жеңил.",
        alt: "От жана жыгач отун",
      },
      {
        src: "/images/gallery-mountains.jpg",
        title: "Тоо абасы",
        text: "Сессиядан кийин сырттагы муздак аба жана тоолордун тынчтыгы кайра жан берет.",
        alt: "Кечки тоолор",
      },
    ],
    whyEyebrow: "Эмне үчүн бул жер",
    whyTitle: "Жөнөкөй. Таза. Жылуу.",
    whyItems: [
      {
        title: "2 сааттык сессия",
        text: "Убакыт 8:00дөн түнкү 1:00гө чейин. Эки кабина бар — ар бирин өзүнчө брондойсуз. Жашыл убакыт бош, боз убакыт алынган.",
      },
      {
        title: "Эки кабина",
        text: "Баняда эки бөлмө. Бири бош эмес болсо, экинчисин тандасаңыз болот.",
      },
      {
        title: "Токойго жакын",
        text: "Шаардан болжол менен 40 мүнөт. Дарбазанын жанында токтоочу жай бар. Брондон кийин жолду жиберебиз.",
      },
    ],
    contactEyebrow: "Байланыш",
    addressLabel: "Дарек",
    addressTitle: "Гавриловка, Фрунзе 26",
    addressText:
      "Сокулук району, Гавриловка айылы, Фрунзе көчөсү 26. Дарбазанын жанында машина койсоңуз болот.",
    phoneLabel: "Телефон",
    phoneText:
      "Чалыңыз же WhatsAppка жазыңыз: +996 703 161 586. Онлайн брондоо түнү-күнү ачык.",
    hoursLabel: "Иш убактысы",
    hoursTitle: "08:00 — 01:00",
    hoursText:
      "Сессия 1 саат. Башталышы 8:00дөн түнкү 1:00гө чейин. Эки кабина.",
    footerNote: "Kut Banya · Kyrgyz sauna",
    bookEyebrow: "Убакыт тандаңыз",
    bookTitleBefore: "Сессияны",
    bookTitleAccent: "брондоңуз",
    bookIntro:
      "Адегенде кабинаны, анан саатты тандаңыз. 8:00дөн түнкү 1:00гө чейин. Жашыл — бош, боз — алынган.",
    weekdays: ["Дш", "Шш", "Шр", "Бш", "Жм", "Иш", "Жк"],
    prevMonth: "Мурунку ай",
    nextMonth: "Кийинки ай",
    pickCabin: "Кабинаны тандаңыз",
    cabinLabel: "Кабина",
    cabin1: "1-кабина",
    cabin2: "2-кабина",
    cabinHint: "Эки бөлмө өзүнчө брондолот.",
    pickSlot: "Бош убакытты тандаңыз.",
    loadingSlots: "Алынган убакыттар жүктөлүүдө…",
    success: "Убакытыңыз брондолду!",
    session: "Сессия",
    nameLabel: "Атыңыз",
    emailField: "Email",
    phoneField: "Телефон",
    peopleLabel: "Адам саны",
    confirm: "Брондоону ырастоо",
    navLogin: "Кирүү",
    navSignup: "Катталуу",
    navLogout: "Чыгуу",
    authLoginTitle: "Кирүү",
    authSignupTitle: "Катталуу",
    authLoginLead: "Email жана сыр сөз менен кириңиз.",
    authSignupLead: "Жаңы аккаунт ачыңыз — атыңыз, email, телефон жана сыр сөз.",
    authPassword: "Сыр сөз",
    authPasswordRepeat: "Сыр сөздү кайталаңыз",
    authSubmitLogin: "Кирүү",
    authSubmitSignup: "Катталуу",
    authToSignup: "Аккаунт жокпу? Катталыңыз",
    authToLogin: "Аккаунтуңуз барбы? Кириңиз",
    authErrorMissing: "Бардык талааларды толтуруңуз.",
    authErrorExists: "Бул email менен аккаунт бар.",
    authErrorWrong: "Email же сыр сөз туура эмес.",
    authErrorMismatch: "Сыр сөздөр дал келбейт.",
    authErrorGeneric: "Ката кетти. Кайра көрүңүз.",
    authVerifyLead: "Emailге келген кодду жазыңыз.",
    authVerifyCode: "Код",
    authSubmitVerify: "Ырастоо",
    authHello: "Салам",
    navAccount: "Профиль",
    accountTitle: "Сиздин маалымат",
    accountLead: "Атыңызды, айылды жана даректи өзгөртсөңүз болот.",
    villageLabel: "Айыл / шаар",
    homeAddressLabel: "Дарек",
    accountSave: "Сактоо",
    accountSaved: "Сакталды.",
    accountDelete: "Аккаунтту өчүрүү",
    accountDeleteConfirm: "Аккаунтту өчүрөсүзбү? Бул кайтарылбайт.",
    accountDeleteHint: "Өчүрүү үчүн кайра киришиңиз керек болушу мүмкүн.",
    accountNeedLogin: "Профилди көрүү үчүн кириңиз.",
    navMenu: "Меню",
    navClose: "Жабуу",
    navBack: "Артка",
    navAdmin: "Админ",
    navHistory: "Брондорум",
    roleCustomer: "Кардар",
    roleAdmin: "Администратор",
    roleLead: "Ким катары киресиз?",
    adminCodeLabel: "Админ коду",
    adminCodeHint: "Ата-эне / администратор үчүн код. Демейки: KutBanyaAdmin",
    authErrorForbidden: "Бул аккаунт администратор эмес.",
    payLabel: "Төлөм",
    payCash: "Кийинчерээк төлөйм",
    payCard: "MBank менен",
    payCashHint: "Брондоо сакталат. Акчаны баняда бересиз.",
    payCardHint:
      "MBank: Rahat, номер 703 161 586. Төлөп, чекти WhatsAppка жибериңиз.",
    payWhatsapp: "Чекти WhatsAppка жиберүү",
    adultsLabel: "Чоңдор",
    kidsLabel: "7 жашка чейинки балдар",
    priceRates:
      "Бир адам (жеке) — саатына 200 сом. Эки же андан көп — ар бир чоң адамга саатына 150 сом. 7 жашка чейинки бала — саатына 80 сом.",
    priceTotal: "Жалпы",
    successMbank:
      "Брон сакталды. MBank аркылуу Rahat, 703 161 586 номерине төлөп, чекти WhatsAppка жибериңиз.",
    bookNeedLogin: "Брондоо үчүн адегенде кириңиз.",
    bookTaken: "Бул саат бош эмес. Башкасын тандаңыз.",
    adminTitle: "Брондор",
    adminLead: "Күндү тандаңыз. Эки кабина: солдо саат, оңдо бош же бош эмес. Бош эмести бассаңыз — коноктун маалыматы ачылат.",
    adminEmpty: "Азырынча брон жок.",
    adminNeedLogin: "Админ панелине кирүү үчүн администратор катары кириңиз.",
    adminName: "Аты",
    adminPhone: "Телефон",
    adminPeople: "Адам саны",
    adminPaid: "Төлөндү",
    adminUnpaid: "Төлөнө элек",
    adminMarkPaid: "Төлөндү деп белгилөө",
    adminCancel: "Бронду жокко чыгаруу",
    adminCancelConfirm: "Бул бронду жокко чыгарасызбы?",
    adminColDate: "Күн",
    adminColCabin: "Кабина",
    adminColTime: "Саат",
    adminColStatus: "Бош / бош эмес",
    adminClickHint: "Катарды басыңыз — коноктун маалыматы ачылат.",
    adminGuestTitle: "Конок",
    adminCloseGuest: "Жабуу",
    adminPickDay: "Күндү басыңыз — ошол күндүн сааттары ачылат.",
    adminClickBusy: "Бош эмес саатты басыңыз — ким брондогонун көрөсүз.",
    slotBusy: "Бош эмес",
    slotFree: "Бош",
    visitPassed: "Өтүп кетти",
    visitCancelled: "Жокко чыгарылды",
    visitUpcoming: "Алдыда",
    historyTitle: "Менин брондорум",
    historyLead: "Кийинки келүүңүз жана бардык брондордун тарыхы. Өткөн жана жокко чыгарылгандар да көрүнөт.",
    historyNext: "Кийинки брон",
    historyNoNext: "Алдыдагы брон жок.",
    historyEmpty: "Сизде азырынча брон жок.",
    historyNeedLogin: "Брондордун тарыхын көрүү үчүн кириңиз.",
    historyUpcomingList: "Алдыдагы",
    historyPassedList: "Өткөн",
    historyCancelledList: "Жокко чыгарылган",
  },
  ru: {
    langLabel: "Русский",
    navHome: "Главная",
    navGallery: "Галерея",
    navBook: "Бронь",
    heroLead:
      "Тёплый дом в лесу, где время замедляется. Настоящий жар, запах дерева и лёгкий пар оставляют город за порогом. Приезжайте вдвоём, семьёй или с друзьями.",
    bookCta: "Забронировать",
    galleryCta: "Галерея",
    heroImageAlt: "Тёплый дом в лесу",
    galleryEyebrow: "Дом и природа",
    galleryTitle: "Увидите, почувствуете, отдохнёте",
    galleryIntro:
      "Kut Banya — баня на дровах. Здесь огонь, лес и тишина. Ниже — тепло дома и природа вокруг.",
    photos: [
      {
        src: "/images/gallery-sauna.jpg",
        title: "Живой пар",
        text: "Горячие камни, деревянные полки и мягкий пар. Баня отдыхает не только тело — ещё и голову.",
        alt: "Интерьер дровяной бани с горячими камнями",
      },
      {
        src: "/images/gallery-forest.jpg",
        title: "Тишина леса",
        text: "Дом стоит среди елей. За окном только природа — без машин и без города.",
        alt: "Туманный хвойный лес",
      },
      {
        src: "/images/gallery-fire.jpg",
        title: "Настоящий огонь",
        text: "Топим дровами. Запах чистый, жар глубокий, пар лёгкий.",
        alt: "Огонь и дрова",
      },
      {
        src: "/images/gallery-mountains.jpg",
        title: "Горный воздух",
        text: "После сессии холодный воздух и тишина гор возвращают силы.",
        alt: "Горы на закате",
      },
    ],
    whyEyebrow: "Почему сюда",
    whyTitle: "Просто. Чисто. Тепло.",
    whyItems: [
      {
        title: "Сессия на 2 часа",
        text: "Время с 8:00 до 1:00 ночи. Две кабины — каждую бронируете отдельно. Зелёное время свободно, серое уже занято.",
      },
      {
        title: "Две кабины",
        text: "В бане две комнаты. Если одна занята, можно взять вторую на то же время.",
      },
      {
        title: "Рядом с лесом",
        text: "Около 40 минут от города. Парковка у ворот. После брони пришлём дорогу.",
      },
    ],
    contactEyebrow: "Контакты",
    addressLabel: "Адрес",
    addressTitle: "Гавриловка, Фрунзе 26",
    addressText:
      "Сокулукский район, село Гавриловка, улица Фрунзе 26. Можно оставить машину у ворот.",
    phoneLabel: "Телефон",
    phoneText:
      "Звоните или пишите в WhatsApp: +996 703 161 586. Онлайн-бронь открыта днём и ночью.",
    hoursLabel: "Часы",
    hoursTitle: "08:00 — 01:00",
    hoursText:
      "Сессия 1 час. Старт с 8:00 до 1:00 ночи. Две кабины.",
    footerNote: "Kut Banya · Kyrgyz sauna",
    bookEyebrow: "Выберите время",
    bookTitleBefore: "Забронируйте",
    bookTitleAccent: "сессию",
    bookIntro:
      "Сначала выберите кабину, затем час. С 8:00 до 1:00 ночи. Зелёное — свободно, серое — занято.",
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    prevMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    pickCabin: "Выберите кабину",
    cabinLabel: "Кабина",
    cabin1: "Кабина 1",
    cabin2: "Кабина 2",
    cabinHint: "Две комнаты бронируются отдельно.",
    pickSlot: "Выберите свободное время.",
    loadingSlots: "Загружаем занятые часы…",
    success: "Ваше время забронировано!",
    session: "Сессия",
    nameLabel: "Имя",
    emailField: "Email",
    phoneField: "Телефон",
    peopleLabel: "Число людей",
    confirm: "Подтвердить бронь",
    navLogin: "Войти",
    navSignup: "Регистрация",
    navLogout: "Выйти",
    authLoginTitle: "Вход",
    authSignupTitle: "Регистрация",
    authLoginLead: "Войдите по email и паролю.",
    authSignupLead: "Создайте аккаунт — имя, email, телефон и пароль.",
    authPassword: "Пароль",
    authPasswordRepeat: "Повторите пароль",
    authSubmitLogin: "Войти",
    authSubmitSignup: "Зарегистрироваться",
    authToSignup: "Нет аккаунта? Зарегистрируйтесь",
    authToLogin: "Уже есть аккаунт? Войдите",
    authErrorMissing: "Заполните все поля.",
    authErrorExists: "Аккаунт с этим email уже есть.",
    authErrorWrong: "Email или пароль неверные.",
    authErrorMismatch: "Пароли не совпадают.",
    authErrorGeneric: "Что-то пошло не так. Попробуйте ещё раз.",
    authVerifyLead: "Введите код из письма.",
    authVerifyCode: "Код",
    authSubmitVerify: "Подтвердить",
    authHello: "Здравствуйте",
    navAccount: "Профиль",
    accountTitle: "Ваши данные",
    accountLead: "Можно изменить имя, село и адрес.",
    villageLabel: "Село / город",
    homeAddressLabel: "Адрес",
    accountSave: "Сохранить",
    accountSaved: "Сохранено.",
    accountDelete: "Удалить аккаунт",
    accountDeleteConfirm: "Удалить аккаунт? Это нельзя отменить.",
    accountDeleteHint: "Для удаления может понадобиться войти ещё раз.",
    accountNeedLogin: "Чтобы видеть профиль, войдите в аккаунт.",
    navMenu: "Меню",
    navClose: "Закрыть",
    navBack: "Назад",
    navAdmin: "Админ",
    navHistory: "Мои брони",
    roleCustomer: "Гость",
    roleAdmin: "Администратор",
    roleLead: "Как вы входите?",
    adminCodeLabel: "Код администратора",
    adminCodeHint: "Код для родителей / администраторов. По умолчанию: KutBanyaAdmin",
    authErrorForbidden: "Этот аккаунт не администратор.",
    payLabel: "Оплата",
    payCash: "Оплачу позже",
    payCard: "Через MBank",
    payCashHint: "Бронь сохранится. Деньги отдадите в бане.",
    payCardHint:
      "MBank: Rahat, номер 703 161 586. Оплатите и отправьте чек в WhatsApp.",
    payWhatsapp: "Отправить чек в WhatsApp",
    adultsLabel: "Взрослые",
    kidsLabel: "Дети до 7 лет",
    priceRates:
      "Один человек (индивидуально) — 200 сом/час. Двое и больше — 150 сом/час за каждого взрослого. Ребёнок до 7 лет — 80 сом/час.",
    priceTotal: "Итого",
    successMbank:
      "Бронь сохранена. Оплатите в MBank на Rahat, 703 161 586, и пришлите чек в WhatsApp.",
    bookNeedLogin: "Чтобы забронировать, сначала войдите.",
    bookTaken: "Это время уже занято. Выберите другое.",
    adminTitle: "Брони",
    adminLead: "Выберите день. Две кабины: слева часы, справа свободно или занято. Нажмите «занято» — откроются данные гостя.",
    adminEmpty: "Броней пока нет.",
    adminNeedLogin: "Чтобы открыть панель, войдите как администратор.",
    adminName: "Имя",
    adminPhone: "Телефон",
    adminPeople: "Число людей",
    adminPaid: "Оплачено",
    adminUnpaid: "Не оплачено",
    adminMarkPaid: "Отметить оплату",
    adminCancel: "Отменить бронь",
    adminCancelConfirm: "Отменить эту бронь?",
    adminColDate: "Дата",
    adminColCabin: "Кабина",
    adminColTime: "Час",
    adminColStatus: "Занято / свободно",
    adminClickHint: "Нажмите на строку — откроются данные гостя.",
    adminGuestTitle: "Гость",
    adminCloseGuest: "Закрыть",
    adminPickDay: "Нажмите день — откроются часы этой даты.",
    adminClickBusy: "Нажмите занятый час, чтобы увидеть гостя.",
    slotBusy: "Занято",
    slotFree: "Свободно",
    visitPassed: "Прошло",
    visitCancelled: "Отменено",
    visitUpcoming: "Предстоит",
    historyTitle: "Мои брони",
    historyLead: "Следующий визит и история всех броней: прошедшие и отменённые тоже видны.",
    historyNext: "Следующая бронь",
    historyNoNext: "Ближайшей брони нет.",
    historyEmpty: "У вас пока нет броней.",
    historyNeedLogin: "Чтобы видеть историю броней, войдите в аккаунт.",
    historyUpcomingList: "Предстоящие",
    historyPassedList: "Прошедшие",
    historyCancelledList: "Отменённые",
  },
  en: {
    langLabel: "English",
    navHome: "Home",
    navGallery: "Gallery",
    navBook: "Book",
    heroLead:
      "A warm house in the forest, where time slows down. Real heat, the aroma of wood, and light steam help leave the city at the doorstep. Come as a couple, with family, or with friends.",
    bookCta: "Book Now",
    galleryCta: "Gallery",
    heroImageAlt: "A warm house in the forest",
    galleryEyebrow: "House and nature",
    galleryTitle: "See it, feel it, rest",
    galleryIntro:
      "Kut Banya is a wood-fired sauna. Fire, forest, and quiet in one place. Below is the warmth of the house and the land around it.",
    photos: [
      {
        src: "/images/gallery-sauna.jpg",
        title: "Living steam",
        text: "Hot stones, timber benches, and soft steam. The banya rests the body and the mind.",
        alt: "Wood-fired sauna interior with hot stones and steam",
      },
      {
        src: "/images/gallery-forest.jpg",
        title: "Forest quiet",
        text: "The house stands among pines. Outside the window there is only nature — no cars, no city.",
        alt: "Misty pine forest",
      },
      {
        src: "/images/gallery-fire.jpg",
        title: "Real fire",
        text: "We heat with wood. The scent is clean, the heat is deep, the steam is light.",
        alt: "Fire and firewood",
      },
      {
        src: "/images/gallery-mountains.jpg",
        title: "Mountain air",
        text: "After the session, cold air and the quiet of the mountains give you back your strength.",
        alt: "Mountains at dusk",
      },
    ],
    whyEyebrow: "Why here",
    whyTitle: "Simple. Clean. Warm.",
    whyItems: [
      {
        title: "Two-hour sessions",
        text: "Hours run from 8:00 to 1:00 a.m. There are two cabins — each is booked on its own. Green times are free. Gray times are taken.",
      },
      {
        title: "Two cabins",
        text: "The sauna has two rooms. If one is taken, you can still book the other at the same hour.",
      },
      {
        title: "Close to the forest",
        text: "About 40 minutes from the city. Parking by the gate. After you book, we send the way.",
      },
    ],
    contactEyebrow: "Contacts",
    addressLabel: "Address",
    addressTitle: "Gavrilovka, Frunze 26",
    addressText:
      "Sokuluk district, Gavrilovka village, Frunze 26 street. You can leave the car by the gate.",
    phoneLabel: "Phone",
    phoneText:
      "Call or WhatsApp +996 703 161 586. Online booking is open day and night.",
    hoursLabel: "Hours",
    hoursTitle: "08:00 — 01:00",
    hoursText:
      "Sessions last 1 hour. Starts from 8:00 until 1:00 a.m. Two cabins.",
    footerNote: "Kut Banya · Kyrgyz sauna",
    bookEyebrow: "Choose a time",
    bookTitleBefore: "Book your",
    bookTitleAccent: "session",
    bookIntro:
      "Choose a cabin first, then a time. From 8:00 to 1:00 a.m. Green is free. Gray is taken.",
    weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    prevMonth: "Previous month",
    nextMonth: "Next month",
    pickCabin: "Choose a cabin",
    cabinLabel: "Cabin",
    cabin1: "Cabin 1",
    cabin2: "Cabin 2",
    cabinHint: "The two rooms are booked separately.",
    pickSlot: "Pick an open slot.",
    loadingSlots: "Loading reserved times…",
    success: "Your time slot has been booked!",
    session: "Session",
    nameLabel: "Name",
    emailField: "Email",
    phoneField: "Phone Number",
    peopleLabel: "Number of People",
    confirm: "Confirm Booking",
    navLogin: "Log in",
    navSignup: "Sign up",
    navLogout: "Log out",
    authLoginTitle: "Log in",
    authSignupTitle: "Sign up",
    authLoginLead: "Log in with your email and password.",
    authSignupLead: "Create an account — name, email, phone, and password.",
    authPassword: "Password",
    authPasswordRepeat: "Repeat password",
    authSubmitLogin: "Log in",
    authSubmitSignup: "Sign up",
    authToSignup: "No account? Sign up",
    authToLogin: "Already have an account? Log in",
    authErrorMissing: "Please fill in all fields.",
    authErrorExists: "An account with this email already exists.",
    authErrorWrong: "Email or password is wrong.",
    authErrorMismatch: "Passwords do not match.",
    authErrorGeneric: "Something went wrong. Please try again.",
    authVerifyLead: "Enter the code we sent to your email.",
    authVerifyCode: "Code",
    authSubmitVerify: "Verify",
    authHello: "Hello",
    navAccount: "Profile",
    accountTitle: "Your details",
    accountLead: "You can edit your name, village, and address.",
    villageLabel: "Village / city",
    homeAddressLabel: "Address",
    accountSave: "Save",
    accountSaved: "Saved.",
    accountDelete: "Delete account",
    accountDeleteConfirm: "Delete this account? This cannot be undone.",
    accountDeleteHint: "You may need to log in again before deleting.",
    accountNeedLogin: "Log in to see your profile.",
    navMenu: "Menu",
    navClose: "Close",
    navBack: "Go back",
    navAdmin: "Admin",
    navHistory: "My bookings",
    roleCustomer: "Customer",
    roleAdmin: "Administrator",
    roleLead: "How do you want to enter?",
    adminCodeLabel: "Admin code",
    adminCodeHint: "Code for parents / administrators. Default: KutBanyaAdmin",
    authErrorForbidden: "This account is not an administrator.",
    payLabel: "Payment",
    payCash: "Pay later",
    payCard: "Pay with MBank",
    payCashHint: "The booking is saved. Pay in cash at the banya.",
    payCardHint:
      "MBank: Rahat, number 703 161 586. Pay and send the receipt on WhatsApp.",
    payWhatsapp: "Send receipt on WhatsApp",
    adultsLabel: "Adults",
    kidsLabel: "Kids under 7",
    priceRates:
      "One person (individual) — 200 som per hour. Two or more — 150 som per hour per adult. Child under 7 — 80 som per hour.",
    priceTotal: "Total",
    successMbank:
      "Booking saved. Pay in MBank to Rahat, 703 161 586, and send the receipt on WhatsApp.",
    bookNeedLogin: "Log in first to book a time.",
    bookTaken: "That hour is taken. Please pick another.",
    adminTitle: "Bookings",
    adminLead: "Pick a day. Two cabins: hours on the left, busy or free on the right. Tap a busy hour to see the guest.",
    adminEmpty: "No bookings yet.",
    adminNeedLogin: "Log in as administrator to open this page.",
    adminName: "Name",
    adminPhone: "Phone",
    adminPeople: "People",
    adminPaid: "Paid",
    adminUnpaid: "Not paid yet",
    adminMarkPaid: "Mark as paid",
    adminCancel: "Cancel booking",
    adminCancelConfirm: "Cancel this booking?",
    adminColDate: "Date",
    adminColCabin: "Cabin",
    adminColTime: "Hour",
    adminColStatus: "Busy / free",
    adminClickHint: "Tap a row to see the guest’s details.",
    adminGuestTitle: "Guest",
    adminCloseGuest: "Close",
    adminPickDay: "Tap a day to see that date’s hours.",
    adminClickBusy: "Tap a busy hour to see the guest.",
    slotBusy: "Busy",
    slotFree: "Free",
    visitPassed: "Passed",
    visitCancelled: "Cancelled",
    visitUpcoming: "Upcoming",
    historyTitle: "My bookings",
    historyLead: "Your next visit, plus every booking: upcoming, passed, and cancelled.",
    historyNext: "Next booking",
    historyNoNext: "You have no upcoming booking.",
    historyEmpty: "You have no bookings yet.",
    historyNeedLogin: "Log in to see your booking history.",
    historyUpcomingList: "Upcoming",
    historyPassedList: "Passed",
    historyCancelledList: "Cancelled",
  },
};
