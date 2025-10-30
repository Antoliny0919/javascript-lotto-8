import { Console, Random } from '@woowacourse/mission-utils';
import LottoMachine from './LottoMachine.js';
import { WinningLotto } from './Lotto.js';

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
    Console.print(`${purchaseLottoCount}개를 구매했습니다.`);
    const lottoMachine = new LottoMachine(purchaseLottoCount);
    lottoMachine.printLottos();
    const winningNumbersInput = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    const winningNumbers = winningNumbersInput.split(',').map((ele) => Number(ele));
    const bonnusNumberInput = await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
    const bonnusNumber = Number(bonnusNumberInput);
    const winningLotto = new WinningLotto(winningNumbers, bonnusNumber);
    lottoMachine.checkWinning(winningLotto);
    lottoMachine.printResult();
  }
}

export default App;
