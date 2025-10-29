import { Random, Console } from '@woowacourse/mission-utils';
import LottoMachine from '../src/LottoMachine.js';
import { Lotto, WinningLotto } from '../src/Lotto.js';

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

  test('발행한 로또와 당첨 번호 비교 테스트(당첨된 경우)', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([10, 13, 15, 17, 18, 22]) // 1등
    .mockReturnValueOnce([10, 13, 14, 17, 18, 25]) // 2등
    .mockReturnValueOnce([10, 13, 15, 17, 18, 23]) // 3등
    .mockReturnValueOnce([13, 14, 15, 16, 17, 18]) // 4등
    .mockReturnValueOnce([10, 11, 12, 13, 14, 15]) // 5등

    const lottoMachine = new LottoMachine(5);
    const winningLotto = new WinningLotto([10, 13, 15, 17, 18, 22], 25);
    lottoMachine.checkWinning(winningLotto);
    expect(lottoMachine.result).toEqual({
      first: 1,
      second: 1,
      third: 1,
      forth: 1,
      fifth: 1,
    });
  });

  test('발행한 로또와 당첨 번호 비교 테스트(당첨되지 않은 경우)', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
    .mockReturnValueOnce([7, 8, 9, 10, 11, 12]);

    const lottoMachine = new LottoMachine(2);
    const winningLotto = new WinningLotto([1, 2, 7, 8, 15, 16], 18);
    lottoMachine.checkWinning(winningLotto);
    expect(lottoMachine.result).toEqual({
      first: 0,
      second: 0,
      third: 0,
      forth: 0,
      fifth: 0,
    });
  });

  test('발행한 로또와 당첨 번호 비교 테스트(한 등수가 여러개 당첨된 경우)', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([1, 2, 40, 41, 42, 43])
    .mockReturnValueOnce([4, 5, 40, 41, 42, 43])
    .mockReturnValueOnce([7, 8, 40, 41, 42, 43]);

    const lottoMachine = new LottoMachine(3);
    const winningLotto = new WinningLotto([10, 11, 40, 41, 42, 43], 44);
    lottoMachine.checkWinning(winningLotto);
    expect(lottoMachine.result).toEqual({
      first: 0,
      second: 0,
      third: 0,
      forth: 3,
      fifth: 0,
    });
  });
});
