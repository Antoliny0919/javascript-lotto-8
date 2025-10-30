export const LOTTO_RESULT_START_MESSAGE = Object.freeze({
  first: '6개 일치',
  second: '5개 일치, 보너스 볼 일치',
  third: '5개 일치',
  fourth: '4개 일치',
  fifth: '3개 일치',
});

export const MESSAGES = Object.freeze({
  MATCH_RESULT_START: '\n당첨 통계',
  MATCH_RESULT_SEPARATOR_LINE: '---',
});

export const ERROR_MESSAGES = Object.freeze({
  INVALID_TYPE: '[ERROR] 구입금액은 정수여야 합니다.',
  INVALID_NEGATIVE_NUMBER: '[ERROR] 구입금액은 양수여야 합니다.',
  INVALID_AMOUNT_UNIT: '[ERROR] 구입금액은 1,000원 단위여야 합니다.',
});

export const LOTTO_PRIZE = Object.freeze({
  first: 2_000_000_000,
  second: 30_000_000,
  third: 1_500_000,
  fourth: 50_000,
  fifth: 5_000,
});

export const LOTTO_MACHINE_CONFIG = Object.freeze({
  FIRST_PLACE_MATCH_COUNT: 6,
  SECOND_OR_THIRD_PLACE_MATCH_COUNT: 5,
  FOURTH_PLACE_MATCH_COUNT: 4,
  FIFTH_PLACE_MATCH_COUNT: 3,
  RATE_OF_RETURN_DECIMAL_PLACE: 1,
});
