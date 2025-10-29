import { Random } from '@woowacourse/mission-utils';
import LottoMachine from '../src/LottoMachine.js';
import Lotto from '../src/Lotto.js';

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickUniqueNumbersInRange: jest.fn(),
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
})