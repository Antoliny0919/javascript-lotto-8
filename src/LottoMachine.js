import { Random, Console } from '@woowacourse/mission-utils';
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

  printLottos() {
    Console.print(`${this.lottos.length}개를 구매했습니다.`);
    this.lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      Console.print(`[${lottoNumbers.join(', ')}]`);
    });
  }
}

export default LottoMachine;
