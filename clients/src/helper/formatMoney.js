export const formatCurrency = (price) => {
    const formattedPrice = price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return formattedPrice;
  };