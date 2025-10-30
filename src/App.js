import LottoMachine from './LottoMachine.js';
import { Lotto, WinningLotto } from './Lotto.js';
import { INPUT_MESSAGES } from './constants/Messages.js';
import Input from './Input.js';

class App {
  constructor() {
    this.inputHandler = new Input();
  }

  async run() {
    const lottoMachine = await this.inputHandler.readUntilSuccess(
      INPUT_MESSAGES.PAYMENT_AMOUNT,
      (inputPaymentAmount) => new LottoMachine(Number(inputPaymentAmount)),
    );
    const winningLottoNumbers = await this.inputHandler.readUntilSuccess(
      INPUT_MESSAGES.WINNING_NUMBER,
      (inputLottoNumbers) => {
        const lottoNumbers = inputLottoNumbers.split(',').map((ele) => Number(ele));
        return new Lotto(lottoNumbers)
      }
    );
    const winningLotto = await this.inputHandler.readUntilSuccess(
      INPUT_MESSAGES.BONUS_NUMBER,
      (inputBonusNumber) => new WinningLotto(winningLottoNumbers, Number(inputBonusNumber))
    );
    lottoMachine.checkWinning(winningLotto);
    lottoMachine.printResult();
  }
}

export default App;
