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

  validateWinningNumbers(values) {
    if (values.some((value) => !Number.isInteger(value))) {
      throw new Error('[ERROR] 당첨 번호는 정수만 입력 가능합니다.');
    }
    if (values.length !== 6) {
      throw new Error('[ERROR] 당첨 번호는 ,을 기준으로 6개 숫자만 입력해 주세요.');
    }
    if (values.some((value) => value < 1 || value > 45)) {
      throw new Error('[ERROR] 당첨 번호는 1이상 45이하인 숫자여야 합니다.');
    }
    if (new Set(values).size !== 6) {
      throw new Error('[ERROR] 중복된 당첨 번호가 존재합니다.');
    }
  }

  validateBonusNumber(bonnusNumber, winningNumbers) {
    if (!Number.isInteger(bonnusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 정수만 입력 가능합니다.');
    }
    if (bonnusNumber < 1 || bonnusNumber > 45) {
      throw new Error('[ERROR] 보너스 번호는 1이상 45이하인 숫자여야 합니다.');
    }
    if (winningNumbers.includes(bonnusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
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
    this.validateWinningNumbers(winningNumbers);
    const bonnusNumberInput = await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
    const bonnusNumber = Number(bonnusNumberInput);
    this.validateBonusNumber(bonnusNumber, winningNumbers);
    const winningLotto = new WinningLotto(winningNumbers, bonnusNumber);
    lottoMachine.checkWinning(winningLotto);
    lottoMachine.printResult();
  }
}

export default App;
