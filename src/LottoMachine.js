import { Random } from '@woowacourse/mission-utils';
import { LOTTO_PRIZE } from './constants/LottoMachine.js';
import { LOTTO_CONFIG } from './constants/lotto.js';
import { LOTTO_MACHINE_CONFIG, ERROR_MESSAGES } from './constants/LottoMachine.js';
import { Lotto } from './Lotto.js';

class LottoMachine {
  constructor(paymentAmount) {
    this.#validatePaymentAmount(paymentAmount);
    const lottoCount = paymentAmount / LOTTO_CONFIG.PRICE;
    this.lottos = Array.from(
      { length: lottoCount },
      () => this.#createLotto(),
    )
    this.result = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    }
  }

  #validatePaymentAmount(paymentAmount) {
    if (!Number.isInteger(paymentAmount)) {
      throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    }
    if (paymentAmount <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_NEGATIVE_NUMBER);
    }
    if (paymentAmount % LOTTO_CONFIG.PRICE) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
    }
  }

  #createLotto() {
    return new Lotto(Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.START_NUMBER,
      LOTTO_CONFIG.END_NUMBER,
      LOTTO_CONFIG.LENGTH,
    ));
  }

  updateResult(matchCount, matchBonus) {
    const prize = this.#determinePrize(matchCount, matchBonus);
    if (prize) {
      this.result[prize] += 1;
    }
  }

  #determinePrize(matchCount, matchBonus) {
    if (matchCount === 6) return 'first';
    if (matchCount === 5 && matchBonus) return 'second';
    if (matchCount === 5) return 'third';
    if (matchCount === 4) return 'fourth';
    if (matchCount === 3) return 'fifth';
    return null;
  }

  checkWinning(winningLotto) {
    this.lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      const matchBonus = lottoNumbers.includes(winningLotto.getBonusNumber());
      const matchNumbers = new Set(lottoNumbers).intersection(new Set(winningLotto.getNumbers()));
      this.updateResult(matchNumbers.size, matchBonus);
    });
  }

  calculateTotalPrize() {
    let totalPrize = 0;
    Object.keys(this.result).forEach((place) => {
      totalPrize += LOTTO_PRIZE[place] * this.result[place];
    });
    return totalPrize;
  }

  calculateRateOfReturn() {
    const purchaseAmount = this.lottos.length * LOTTO_CONFIG.PRICE;
    const totalPrize = this.calculateTotalPrize();
    const rateOfReturn = (totalPrize / purchaseAmount) * 100;
    // 둘째 자리에서 반올림하고 세 자리 마다 ',' 추가
    const [ integerPart, decimalPart ] = rateOfReturn.toFixed(
      LOTTO_MACHINE_CONFIG.RATE_OF_RETURN_DECIMAL_PLACE
    ).split('.');
    return `${Number(integerPart).toLocaleString()}.${decimalPart}`;
  }
}

export default LottoMachine;
