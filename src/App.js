import { Console, Random } from '@woowacourse/mission-utils';
import LottoMachine from './LottoMachine.js';
import { Lotto, WinningLotto } from './Lotto.js';

class App {
  async run() {
    const purchaseAmount = await Console.readLineAsync('구입금액을 입력해 주세요.');
    const lottoMachine = new LottoMachine(Number(purchaseAmount));
    const winningNumbersInput = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    const winningNumbers = winningNumbersInput.split(',').map((ele) => Number(ele));
    const lotto = new Lotto(winningNumbers);
    const bonnusNumberInput = await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
    const bonnusNumber = Number(bonnusNumberInput);
    const winningLotto = new WinningLotto(lotto, bonnusNumber);
    lottoMachine.checkWinning(winningLotto);
    lottoMachine.printResult();
  }
}

export default App;
