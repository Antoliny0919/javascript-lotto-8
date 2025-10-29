import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

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
}

export default LottoMachine;
