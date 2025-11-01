import { Console } from '@woowacourse/mission-utils';
import { LOTTO_PRIZE } from './constants/LottoMachine.js';
import { LOTTO_RESULT_START_MESSAGE, MESSAGES } from './constants/LottoPrinter.js';

class LottoPrinter {

  static printLottos(lottos) {
    Console.print(`\n${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      Console.print(`[${lottoNumbers.join(', ')}]`);
    });
  }

  static printResult(result, rateOfReturn) {
    Console.print(MESSAGES.MATCH_RESULT_START);
    Console.print(MESSAGES.MATCH_RESULT_SEPARATOR_LINE);
    const places = Object.keys(result).reverse();
    for (const place of places) {
      const matchResultMessage = `${LOTTO_RESULT_START_MESSAGE[place]} (${LOTTO_PRIZE[place].toLocaleString()}원) - ${result[place]}개`
      Console.print(matchResultMessage);
    }
    Console.print(`총 수익률은 ${rateOfReturn}%입니다.`);
  }
}

export default LottoPrinter;
