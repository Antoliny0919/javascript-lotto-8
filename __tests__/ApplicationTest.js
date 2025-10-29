import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const runException = async (input) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ['1000', '1,2,3,4,5,6', '7'];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([input, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
};

describe('로또 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('기능 테스트', async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    mockQuestions(['8000', '1,2,3,4,5,6', '7']);

    // when
    const app = new App();
    await app.run();

    // then
    const logs = [
      '8개를 구매했습니다.',
      '[8, 21, 23, 41, 42, 43]',
      '[3, 5, 11, 16, 32, 38]',
      '[7, 11, 16, 35, 36, 44]',
      '[1, 8, 11, 31, 41, 42]',
      '[13, 14, 16, 38, 42, 45]',
      '[7, 11, 30, 40, 42, 43]',
      '[2, 13, 22, 32, 38, 45]',
      '[1, 3, 5, 14, 22, 45]',
      '3개 일치 (5,000원) - 1개',
      '4개 일치 (50,000원) - 0개',
      '5개 일치 (1,500,000원) - 0개',
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
      '6개 일치 (2,000,000,000원) - 0개',
      '총 수익률은 62.5%입니다.',
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('예외 테스트', async () => {
    await runException('1000j');
  });
});

describe('구입금액 입력 예외 테스트', () => {
  test.each(['1000원', '천원', '1thousand', '**&^#@', '1.32', '1000.32'])('정수가 아닌 입력 예외', async(input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 구입금액은 정수여야 합니다.');
  });

  test.each(['-1000', '0', '-1'])('양수가 아닌 입력 예외', async(input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 구입금액은 양수여야 합니다.');
  });

  test.each(['1500', '3421', '10040', '1001', '500', '1000400'])('1,000원 단위가 아닌 엽력 예외', async(input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 구입금액은 1,000원 단위여야 합니다.');
  });
});

describe('당첨 번호 입력 예외 테스트', () => {

  const PURCHASE_AMOUNT = '1000'
  const RANDOM_LOTTO_NUMBER = [1, 2, 3, 4, 5, 6];

  test.each([
    '십칠,십구,하나,둘,넷,여섯',
    'one,two,three,four,five,six,seven',
    '@@%&&%^^&',
    '0.1,0.2,0.3,0.4,0.5,0.6',
  ])('숫자가 아닌 입력 예외', async(input) => {
    mockQuestions([PURCHASE_AMOUNT, input]);
    mockRandoms([RANDOM_LOTTO_NUMBER]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 당첨 번호는 정수만 입력 가능합니다.');
  });

  test.each(
    [
      '43,11,42,12,18,33,1',
      '1,2',
      '1,3,5',
      '',
    ]
  )(',을 기준으로 6개 숫자가 아닌 입력 예외', async(input) => {
    mockQuestions([PURCHASE_AMOUNT, input]);
    mockRandoms([RANDOM_LOTTO_NUMBER]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 당첨 번호는 ,을 기준으로 6개 숫자만 입력해 주세요.');
  });

  test.each(
    [
      '0,1,2,3,4,5',
      '1,5,8,11,13,66',
      '-1,5,7,9,10,-13',
      '1, ,2,3,4,5',
      ' , , , , , ',
      '100000,20000,30000,44000,5000,6000',
      '-1,-2,-3,-4,-5,-6',
    ]
  )(',을 기준으로 6개 숫자가 아닌 입력 예외', async(input) => {
    mockQuestions([PURCHASE_AMOUNT, input]);
    mockRandoms([RANDOM_LOTTO_NUMBER]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 당첨 번호는 1이상 45이하인 숫자여야 합니다.');
  });

  test.each(
    [
      '1,2,3,4,5,1',
      '11,22,33,44,11,22',
      '1,1,1,1,1,1',
    ]
  )('중복된 번호 입력 예외', async(input) => {
        mockQuestions([PURCHASE_AMOUNT, input]);
    mockRandoms([RANDOM_LOTTO_NUMBER]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 중복된 당첨 번호가 존재합니다.');
  })
});
