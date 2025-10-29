import { Random, Console } from '@woowacourse/mission-utils';
import { Lotto } from './Lotto.js';

class LottoMachine {
  constructor(lottoCount) {
    this.lottos = Array.from(
      { length: lottoCount },
      () => this.createLotto(),
    )
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
}

export default LottoMachine;
