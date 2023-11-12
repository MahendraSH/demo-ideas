export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    // Use "en-IN" for Indian English locale
    style: "currency",
    currency: "INR", // Set currency to INR for Indian Rupees
  }).format(price);
};
