export const INPUT_MESSAGES = Object.freeze({
  PAYMENT_AMOUNT: '구입금액을 입력해 주세요.\n',
  WINNING_NUMBER: '\n당첨 번호를 입력해 주세요\n',
  BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
});

export const LOTTO_ERROR_MESSAGES = Object.freeze({
  INVALID_TYPE: '[ERROR] 로또 번호는 정수만 입력 가능합니다.',
  INVALID_LENGTH: '[ERROR] 로또 번호는 6개여야 합니다.',
  INVALID_NUMBER_RANGE: '[ERROR] 로또 번호는 1이상 45이하인 숫자여야 합니다.',
  INVALID_DUPLICATE_NUMBER: '[ERROR] 중복된 당첨 번호가 존재합니다.',
});

export const BONUS_NUMBER_ERROR_MESSAGES = Object.freeze({
  INVALID_TYPE: '[ERROR] 보너스 번호는 정수만 입력 가능합니다.',
  INVALID_NUMBER_RANGE: '[ERROR] 보너스 번호는 1이상 45이하인 숫자여야 합니다.',
  INVALID_DUPLICATE: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
});
