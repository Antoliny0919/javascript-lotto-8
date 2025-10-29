import { Random, Console } from '@woowacourse/mission-utils';
import { Lotto } from './Lotto.js';

const LOTTO_PRIZE = {
  first: 2_000_000_000,
  second: 30_000_000,
  third: 1_500_000,
  forth: 50_000,
  fifth: 5_000,
}

class LottoMachine {
  constructor(lottoCount) {
    this.lottos = Array.from(
      { length: lottoCount },
      () => this.createLotto(),
    )
    this.result = {
      first: 0,
      second: 0,
      third: 0,
      forth: 0,
      fifth: 0,
    }
  }

  createLotto() {
    return new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6));
  }

  printLottos() {
    this.lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      Console.print(`[${lottoNumbers.join(', ')}]`);
    });
  }

  updateResult(matchCount, matchBonus) {
    switch (matchCount) {
      case 3:
        this.result.fifth += 1;
        break;
      case 4:
        this.result.forth += 1;
        break;
      case 5:
        if (matchBonus) {
          this.result.second += 1;
          break;
        }
        this.result.third += 1;
        break
      case 6:
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
    let rateOfReturn = 0;
    const purchaseAmount = this.lottos.length * 1000;
    const totalPrize = this.calculateTotalPrize();
    rateOfReturn = (totalPrize / purchaseAmount) * 100;
    // 둘째 자리에서 반올림하고 세 자리 마다 ',' 추가
    const [ integerPart, decimalPart ] = rateOfReturn.toFixed(1).split('.');
    return `${Number(integerPart).toLocaleString()}.${decimalPart}`;
  }
}

export default LottoMachine;
