export const numberToWords = (num) => {
  if (num === 0) return "Zero";

  const a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n) => {
    let str = "";
    if (n > 19) {
      str += b[Math.floor(n / 10)] + " ";
      if (n % 10 > 0) {
        str += a[n % 10];
      }
    } else {
      str += a[n];
    }
    return str;
  };

  let numStr = num.toString();
  if (numStr.length > 9) return "Overflow";

  const parts = [];
  // Parse in Indian format: Crores, Lakhs, Thousands, Hundreds, Tens/Ones
  let n = parseInt(numStr, 10);
  
  const crore = Math.floor(n / 10000000);
  n -= crore * 10000000;
  
  const lakh = Math.floor(n / 100000);
  n -= lakh * 100000;
  
  const thousand = Math.floor(n / 1000);
  n -= thousand * 1000;
  
  const hundred = Math.floor(n / 100);
  n -= hundred * 100;

  if (crore > 0) parts.push(inWords(crore) + "Crore ");
  if (lakh > 0) parts.push(inWords(lakh) + "Lakh ");
  if (thousand > 0) parts.push(inWords(thousand) + "Thousand ");
  if (hundred > 0) parts.push(inWords(hundred) + "Hundred ");
  if (n > 0) {
    if (parts.length > 0) parts.push("and ");
    parts.push(inWords(n));
  }

  return parts.join("").trim() + " Only";
};
