import { Random, Console } from '@woowacourse/mission-utils';
import LottoMachine from '../src/LottoMachine.js';
import { Lotto } from '../src/Lotto.js';

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickUniqueNumbersInRange: jest.fn(),
  },
  Console: {
    print: jest.fn(),
  },
}));

describe('LottoMachine Tests', () => {
  test('객체 생성 테스트', () => {
    Random.pickUniqueNumbersInRange.mockReturnValue([1, 2, 3, 4, 5, 6]);
    const lottoMachine = new LottoMachine(5);
    const lotto = lottoMachine.lottos[0];

    expect(lottoMachine.lottos.length).toBe(5);
    expect(lotto).toBeInstanceOf(Lotto);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  })

  test('발행한 로또 출력 테스트', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([10, 11, 12, 13, 14, 15])
    .mockReturnValueOnce([20, 21, 22, 23, 24, 25]);

    const lottoMachine = new LottoMachine(2);
    lottoMachine.printLottos();

    expect(Console.print).toHaveBeenCalled();
    expect(Console.print).toHaveBeenCalledWith('[10, 11, 12, 13, 14, 15]');
    expect(Console.print).toHaveBeenCalledWith('[20, 21, 22, 23, 24, 25]');
  });
})
