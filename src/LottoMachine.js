import { Random, Console } from '@woowacourse/mission-utils';
import { LOTTO_PRIZE, LOTTO_RESULT_START_MESSAGE } from './constants/LottoMachine.js';
import { LOTTO_CONFIG } from './constants/lotto.js';
import { LOTTO_MACHINE_CONFIG, MESSAGES, ERROR_MESSAGES } from './constants/LottoMachine.js';
import { lottoCountTemplate, rateOfReturnTemplate, matchResultTemplate } from './utils/Templates.js';
import { Lotto } from './Lotto.js';

class LottoMachine {
  constructor(paymentAmount) {
    this.#validatePaymentAmount(paymentAmount);
    this.lottoCount = paymentAmount / LOTTO_CONFIG.PRICE;
    this.lottos = Array.from(
      { length: this.lottoCount },
      () => this.createLotto(),
    )
    this.result = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    }
    this.printLottos();
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

  createLotto() {
    return new Lotto(Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.START_NUMBER,
      LOTTO_CONFIG.END_NUMBER,
      LOTTO_CONFIG.LENGTH,
    ));
  }

  printLottos() {
    Console.print(lottoCountTemplate(this.lottoCount));
    this.lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      Console.print(`[${lottoNumbers.join(', ')}]`);
    });
  }

  printResult() {
    Console.print(MESSAGES.MATCH_RESULT_START);
    Console.print(MESSAGES.MATCH_RESULT_SEPARATOR_LINE);
    const places = Object.keys(this.result).reverse();
    for (const place of places) {
      const matchResultMessage = matchResultTemplate(
        LOTTO_RESULT_START_MESSAGE[place],
        LOTTO_PRIZE[place],
        this.result[place],
      )
      Console.print(matchResultMessage);
    }
    Console.print(rateOfReturnTemplate(this.calculateRateOfReturn()));
  }

  updateResult(matchCount, matchBonus) {
    switch (matchCount) {
      case LOTTO_MACHINE_CONFIG.FIFTH_PLACE_MATCH_COUNT:
        this.result.fifth += 1;
        break;
      case LOTTO_MACHINE_CONFIG.FOURTH_PLACE_MATCH_COUNT:
        this.result.fourth += 1;
        break;
      case LOTTO_MACHINE_CONFIG.SECOND_OR_THIRD_PLACE_MATCH_COUNT:
        if (matchBonus) {
          this.result.second += 1;
          break;
        }
        this.result.third += 1;
        break
      case LOTTO_MACHINE_CONFIG.FIRST_PLACE_MATCH_COUNT:
        this.result.first += 1;
    }
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
