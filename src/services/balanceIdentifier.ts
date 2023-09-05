export const balanceIdentifier = (mcc:number) => {
  switch (mcc) {
    case 5411:
    case 5412:
      return "food";
    case 5811:
    case 5812:
      return "meal";
    default:
      return "cash";
  }
};
