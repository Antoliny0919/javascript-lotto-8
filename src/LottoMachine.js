import { Random, Console } from '@woowacourse/mission-utils';
import { Lotto } from './Lotto.js';

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
}

export default LottoMachine;
