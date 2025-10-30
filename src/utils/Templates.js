export const lottoCountTemplate = (count) => `\n${count}개를 구매했습니다.`;

export const rateOfReturnTemplate = (rateOfReturn) => `총 수익률은 ${rateOfReturn}%입니다.`;

export const matchResultTemplate = (startMessage, prize, count) => 
  `${startMessage} (${prize.toLocaleString()}원) - ${count}개`;
