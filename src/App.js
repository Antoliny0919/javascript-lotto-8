import LottoMachine from './LottoMachine.js';
import { Lotto, WinningLotto } from './Lotto.js';
import Input from './Input.js';

class App {
  constructor() {
    this.inputHandler = new Input();
  }

  async run() {
    const lottoMachine = await this.inputHandler.readUntilSuccess(
      '구입금액을 입력해 주세요.\n',
      (inputPaymentAmount) => new LottoMachine(Number(inputPaymentAmount)),
    );
    const winningLottoNumbers = await this.inputHandler.readUntilSuccess(
      '\n당첨 번호를 입력해 주세요\n',
      (inputLottoNumbers) => {
        const lottoNumbers = inputLottoNumbers.split(',').map((ele) => Number(ele));
        return new Lotto(lottoNumbers)
      }
    );
    const winningLotto = await this.inputHandler.readUntilSuccess(
      '\n보너스 번호를 입력해 주세요.\n',
      (inputBonusNumber) => new WinningLotto(winningLottoNumbers, Number(inputBonusNumber))
    );
    lottoMachine.checkWinning(winningLotto);
    lottoMachine.printResult();
  }
}

export default App;
