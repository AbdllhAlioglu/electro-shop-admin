const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

// Get exchange rates from API
export async function getExchangeRates(baseCurrency = "TRY") {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
    );
    const data = await response.json();
    console.log(data);
    return data.conversion_rates;
  } catch (error) {
    console.error("Döviz kurları alınırken hata:", error);
    throw error;
  }
}

// Convert price from one currency to another
export function convertPrice(price, fromCurrency, toCurrency, rates) {
  if (!rates || !rates[toCurrency]) {
    return price;
  }

  if (fromCurrency === toCurrency) {
    return price;
  }

  // Önce TRY'ye çevir (eğer başlangıç para birimi TRY değilse)
  let tryPrice = fromCurrency === "TRY" ? price : price / rates[fromCurrency];

  // TRY'den hedef para birimine çevir
  return toCurrency === "TRY" ? tryPrice : tryPrice * rates[toCurrency];
}

// Format price to Turkish locale
export function formatPrice(price, currency) {
  const formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}
