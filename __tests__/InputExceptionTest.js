import { mockQuestions, mockRandoms, getLogSpy } from './ApplicationTest.js';
import App from '../src/App.js';

const SOME_PAYMENT_AMOUNT = '1000';
const SOME_WINNING_NUMBERS = '1,2,3,4,5,6';
const SOME_BONUS_NUMBER = '7';

const runException = async (inputs, expectedMessage) => {
  // given
  const logSpy = getLogSpy();

  mockRandoms([[1, 2, 3, 4, 5, 6]]);
  mockQuestions(inputs);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expectedMessage);
};

describe('구입금액 입력 예외 테스트', () => {
  const INPUT_ENDS = [SOME_PAYMENT_AMOUNT, SOME_WINNING_NUMBERS, SOME_BONUS_NUMBER];

  test.each(
    [
      '1000원',
      '천원',
      '1thousand',
      '**&^#@',
      '1.32',
      '1000.32',
    ]
  )('정수가 아닌 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [input, ...INPUT_ENDS],
      '[ERROR] 구입금액은 정수여야 합니다.'
    )
  });

  test.each(
    [
      '-1000',
      '0',
      '-1'
    ]
  )('양수가 아닌 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [input, ...INPUT_ENDS],
      '[ERROR] 구입금액은 양수여야 합니다.',
    );
  });

  test.each(
    [
      '1500',
      '3421',
      '10040',
      '1001',
      '500',
      '1000400',
    ]
  )('1,000원 단위가 아닌 엽력시 예외가 발생한다.', async(input) => {
    await runException(
      [input, ...INPUT_ENDS],
      '[ERROR] 구입금액은 1,000원 단위여야 합니다.',
    )
  });
});

describe('당첨 번호 입력 예외 테스트', () => {
  const INPUT_STARTS = [SOME_PAYMENT_AMOUNT];
  const INPUT_ENDS = [SOME_WINNING_NUMBERS, SOME_BONUS_NUMBER];

  test.each(
    [
      '십칠,십구,하나,둘,넷,여섯',
      'one,two,three,four,five,six,seven',
      '@@%&&%^^&',
      '0.1,0.2,0.3,0.4,0.5,0.6',
    ]
  )('숫자가 아닌 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [...INPUT_STARTS, input, ...INPUT_ENDS],
      '[ERROR] 로또 번호는 정수만 입력 가능합니다.',
    );
  });

  test.each(
    [
      '43,11,42,12,18,33,1',
      '1,2',
      '1,3,5',
      '',
    ]
  )(',을 기준으로 6개 숫자가 아닌 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [...INPUT_STARTS, input, ...INPUT_ENDS],
      '[ERROR] 로또 번호는 6개여야 합니다.',
    );
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
  )('1 ~ 45 이내 숫자가 아닌 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [...INPUT_STARTS, input, ...INPUT_ENDS],
      '[ERROR] 로또 번호는 1이상 45이하인 숫자여야 합니다.',
    );
  });

  test.each(
    [
      '1,2,3,4,5,1',
      '11,22,33,44,11,22',
      '1,1,1,1,1,1',
    ]
  )('중복된 번호 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [...INPUT_STARTS, input, ...INPUT_ENDS],
      '[ERROR] 중복된 당첨 번호가 존재합니다.',
    )
  });
});

describe('보너스 번호 입력 예외 테스트', () => {
  const INPUT_STARTS = [SOME_PAYMENT_AMOUNT, SOME_WINNING_NUMBERS];
  const INPUT_ENDS = [SOME_BONUS_NUMBER];

  test.each(
    [
      '십칠',
      '11.11',
      '**',
      'seven',
      ',',
      '*,&,',
    ]
  )('숫자가 아닌 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [...INPUT_STARTS, input, ...INPUT_ENDS],
      '[ERROR] 보너스 번호는 정수만 입력 가능합니다.',
    );
  });

  test.each(
    [
      '-1',
      '99',
      '0',
      '46',
      '',
      '         ',
    ]
  )('1 ~ 45 이내 숫자가 아닌 입력시 예외가 발생한다.', async(input) => {
    await runException(
      [...INPUT_STARTS, input, ...INPUT_ENDS],
      '[ERROR] 보너스 번호는 1이상 45이하인 숫자여야 합니다.',
    );
  });

  test.each(
    [
      ['1,2,3,4,5,6', '1'],
      ['5,9,14,16,19,24', '16'],
      ['1,10,18,25,30,34', '34'],
      ['1,33,34,40,41,45', '45'],
    ]
  )('당첨 번호와 중복되는 입력시 예외가 발생한다.', async(winningNumbers, bonnusNumber) => {
    await runException(
      [SOME_PAYMENT_AMOUNT, winningNumbers, bonnusNumber, SOME_BONUS_NUMBER],
      '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
    );
  });
});
