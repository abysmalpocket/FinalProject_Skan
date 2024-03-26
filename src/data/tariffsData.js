export const tariffsData = [
  {
    currentTariff: true,
    color: "#ffb64f",
    title: "Beginner",
    subtitle: "Для небольшого исследования",
    icon: "img/TariffCard-1.svg",
    price: "799 ₽",
    withoutSell: "1200 ₽",
    credit: "или 150 ₽/мес. при рассрочке на 24 мес.",
    tariffIncludes: [
      "Безлимитная история запросов",
      "Безопасная сделка",
      "Поддержка 24/7",
    ],
  },
  {
    currentTariff: false,
    color: "#7ce3e1",
    title: "Pro",
    subtitle: "Для HR и фрилансеров",
    icon: "img/TariffCard-2.svg",
    price: "1299 ₽",
    withoutSell: "2600 ₽",
    credit: "или 279 ₽/мес. при рассрочке на 24 мес.",
    tariffIncludes: [
      "Все пункты тарифа Beginner",
      "Экспорт истории",
      "Рекомендации по приоритетам",
    ],
  },
  {
    currentTariff: false,
    color: "#000000",
    title: "Business",
    subtitle: "Для корпоративных клиентов",
    icon: "img/TariffCard-3.svg",
    price: "2 379  ₽",
    withoutSell: "3 700 ₽",
    tariffIncludes: [
      "Все пункты тарифа Pro",
      "Безлимитное количество запросов",
      "Приоритетная поддержка",
    ],
  },
];
