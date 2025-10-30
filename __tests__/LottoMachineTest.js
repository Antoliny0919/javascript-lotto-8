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
  test('구입금액이 문자일때 예외가 발생한다.', () => {
    expect(() => {
      new LottoMachine('#@&');
    }).toThrow('[ERROR] 구입금액은 정수여야 합니다.');
  });

  test('구입금액이 양수가 아닐때 예외가 발생한다.', () => {
    expect(() => {
      new LottoMachine(-3000);
    }).toThrow('[ERROR] 구입금액은 양수여야 합니다.');
  });

  test('구입금액이 1,000원 단위가 아닐때 예외가 발생한다.', () => {
    expect(() => {
      new LottoMachine(1001);
    }).toThrow('[ERROR] 구입금액은 1,000원 단위여야 합니다.');
  });

  test('객체 생성시 로또를 발행한다.', () => {
    Random.pickUniqueNumbersInRange.mockReturnValue([1, 2, 3, 4, 5, 6]);
    const lottoMachine = new LottoMachine(5000);
    const lotto = lottoMachine.lottos[0];

    expect(lottoMachine.lottos.length).toBe(5);
    expect(lotto).toBeInstanceOf(Lotto);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('발행한 로또 목록을 출력한다.', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([10, 11, 12, 13, 14, 15])
    .mockReturnValueOnce([20, 21, 22, 23, 24, 25]);

    const lottoMachine = new LottoMachine(2000);
    lottoMachine.printLottos();

    expect(Console.print).toHaveBeenCalled();
    expect(Console.print).toHaveBeenCalledWith('[10, 11, 12, 13, 14, 15]');
    expect(Console.print).toHaveBeenCalledWith('[20, 21, 22, 23, 24, 25]');
  });

  test('발행한 로또와 당첨 번호를 비교하여 결과를 업데이트한다(당첨된 경우).', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([10, 13, 15, 17, 18, 22]) // 1등
    .mockReturnValueOnce([10, 13, 14, 17, 18, 25]) // 2등
    .mockReturnValueOnce([10, 13, 15, 17, 18, 23]) // 3등
    .mockReturnValueOnce([13, 14, 15, 16, 17, 18]) // 4등
    .mockReturnValueOnce([10, 11, 12, 13, 14, 15]) // 5등

    const lottoMachine = new LottoMachine(5000);
    const winningLottoNumbers = new Lotto([10, 13, 15, 17, 18, 22]);
    const winningLotto = new WinningLotto(winningLottoNumbers, 25);
    lottoMachine.checkWinning(winningLotto);
    expect(lottoMachine.result).toEqual({
      first: 1,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 1,
    });
  });

  test('발행한 로또와 당첨 번호를 비교하여 결과를 업데이트한다(당첨되지 않은 경우).', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
    .mockReturnValueOnce([7, 8, 9, 10, 11, 12]);

    const lottoMachine = new LottoMachine(2000);
    const winningLottoNumbers = new Lotto([1, 2, 7, 8, 15, 16]);
    const winningLotto = new WinningLotto(winningLottoNumbers, 18);
    lottoMachine.checkWinning(winningLotto);
    expect(lottoMachine.result).toEqual({
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    });
  });

  test('발행한 로또와 당첨 번호를 비교하여 결과를 업데이트한다(한 등수가 여러개 당첨된 경우).', () => {
    Random.pickUniqueNumbersInRange
    .mockReturnValueOnce([1, 2, 40, 41, 42, 43])
    .mockReturnValueOnce([4, 5, 40, 41, 42, 43])
    .mockReturnValueOnce([7, 8, 40, 41, 42, 43]);

    const lottoMachine = new LottoMachine(3000);
    const winningLottoNumbers = new Lotto([10, 11, 40, 41, 42, 43]);
    const winningLotto = new WinningLotto(winningLottoNumbers, 44);
    lottoMachine.checkWinning(winningLotto);
    expect(lottoMachine.result).toEqual({
      first: 0,
      second: 0,
      third: 0,
      fourth: 3,
      fifth: 0,
    });
  });

  test('당첨 결과를 기반으로 총 수익을 계산한다.', () => {
    const lottoMachine = new LottoMachine(2000);

    expect(lottoMachine.calculateTotalPrize()).toBe(0);

    lottoMachine.result = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
    }

    expect(lottoMachine.calculateTotalPrize()).toBe(2_064_725_000);
  });

  test.each(
    [
      {
        lottoCount: 2,
        result: {first: 0, second: 0, third: 0, fourth: 1, fifth: 1},
        expectedRateOfReturn: '2,750.0',
      },
      {
        lottoCount: 2,
        result: {first: 0, second: 0, third: 0, fourth: 0, fifth: 0},
        expectedRateOfReturn: '0.0',
      },
      {
        lottoCount: 7,
        result: {first: 0, second: 0, third: 0, fourth: 0, fifth: 1},
        expectedRateOfReturn: '71.4',
      },
      {
        lottoCount: 3,
        result: {first: 1, second: 0, third: 0, fourth: 1, fifth: 0},
        expectedRateOfReturn: '66,668,333.3',
      },
    ]
  )('총 당첨금액을 통해 수익률을 계산한다.', ({ lottoCount, result, expectedRateOfReturn }) => {

    const lottoMachine = new LottoMachine(lottoCount * 1000);
    lottoMachine.result = result;

    expect(lottoMachine.calculateRateOfReturn()).toBe(expectedRateOfReturn);
  });

  test('최종 결과를 출력한다.', () => {
    const lottoMachine = new LottoMachine(50000);
    lottoMachine.result = {
      first: 0,
      second: 0,
      third: 1,
      fourth: 2,
      fifth: 3,
    }
    lottoMachine.printResult();

    expect(Console.print).toHaveBeenCalledWith('\n당첨 통계');
    expect(Console.print).toHaveBeenCalledWith('---');
    expect(Console.print).toHaveBeenCalledWith('3개 일치 (5,000원) - 3개');
    expect(Console.print).toHaveBeenCalledWith('4개 일치 (50,000원) - 2개');
    expect(Console.print).toHaveBeenCalledWith('5개 일치 (1,500,000원) - 1개');
    expect(Console.print).toHaveBeenCalledWith('5개 일치, 보너스 볼 일치 (30,000,000원) - 0개');
    expect(Console.print).toHaveBeenCalledWith('6개 일치 (2,000,000,000원) - 0개');
    expect(Console.print).toHaveBeenCalledWith('총 수익률은 3,230.0%입니다.');
  });
});
