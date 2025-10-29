import { Console, Random } from '@woowacourse/mission-utils';
import LottoMachine from './LottoMachine';

class App {

  validatePurchaseAmount(value) {
    if (!Number.isInteger(value)) {
      throw new Error('[ERROR] 구입금액은 정수여야 합니다.')
    }
    if (value <= 0) {
      throw new Error('[ERROR] 구입금액은 양수여야 합니다.')
    }
    if (value % 1000) {
      throw new Error('[ERROR] 구입금액은 1,000원 단위여야 합니다.')
    }
  }

  async run() {
    const purchaseAmountInput = await Console.readLineAsync('구입금액을 입력해 주세요.');
    const purchaseAmount = Number(purchaseAmountInput);
    this.validatePurchaseAmount(purchaseAmount);
    const purchaseLottoCount = purchaseAmount / 1000;
    const lottoMachine = new LottoMachine(purchaseLottoCount);
    console.log(lottoMachine.lottos);
  }
}

export default App;
