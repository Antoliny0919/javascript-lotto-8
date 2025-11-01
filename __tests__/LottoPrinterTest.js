import { Console } from '@woowacourse/mission-utils';
import { Lotto } from '../src/Lotto';
import LottoPrinter from '../src/LottoPrinter';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    print: jest.fn(),
  },
}));

describe('LottoPrinter Tests', () => {
  test('로또번호를 출력합니다.', () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([38, 39, 40, 41, 42, 43]);

    const lottos = [lotto1, lotto2];
    LottoPrinter.printLottos(lottos);

    expect(Console.print).toHaveBeenCalledWith('\n2개를 구매했습니다.');
    expect(Console.print).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]');
    expect(Console.print).toHaveBeenCalledWith('[38, 39, 40, 41, 42, 43]');
  });

  test('로또결과를 출력합니다.', () => {
    result = {
      'first': 1,
      'second': 2,
      'third': 3,
      'fourth': 4,
      'fifth': 5,
    }
    LottoPrinter.printResult(result, '10.0');
  
    const expectedOutput = [
      '\n당첨 통계',
      '---',
      '3개 일치 (5,000원) - 5개',
      '4개 일치 (50,000원) - 4개',
      '5개 일치 (1,500,000원) - 3개',
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 2개',
      '6개 일치 (2,000,000,000원) - 1개',
      '총 수익률은 10.0%입니다.',
    ];

    expectedOutput.forEach((output) => {
      expect(Console.print).toHaveBeenCalledWith(output);
    });
  });
});
