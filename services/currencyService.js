const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

// Get exchange rates from API
export async function getExchangeRates(baseCurrency = "TRY") {
  try {
    // Check if API key is available
    if (!API_KEY) {
      console.error("Exchange rate API key not found in environment variables");
      return null;
    }

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;
    console.log("Fetching exchange rates from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Exchange rate API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    console.log("Exchange rates data:", data);

    if (data.result !== "success") {
      console.error("Exchange rate API returned error:", data);
      return null;
    }

    return data.conversion_rates;
  } catch (error) {
    console.error("Döviz kurları alınırken hata:", error);
    return null;
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
