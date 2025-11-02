import { BONUS_NUMBER_ERROR_MESSAGES, LOTTO_ERROR_MESSAGES } from './constants/Messages.js';
import { LOTTO_CONFIG } from './constants/Lotto.js';

export class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.some((number) => !Number.isInteger(number))) {
      throw new Error(LOTTO_ERROR_MESSAGES.INVALID_TYPE);
    }
    if (numbers.length !== LOTTO_CONFIG.LENGTH) {
      throw new Error(LOTTO_ERROR_MESSAGES.INVALID_LENGTH);
    }
    if (numbers.some((number) => number < LOTTO_CONFIG.START_NUMBER || number > LOTTO_CONFIG.END_NUMBER)) {
      throw new Error(LOTTO_ERROR_MESSAGES.INVALID_NUMBER_RANGE);
    }
    if (new Set(numbers).size !== LOTTO_CONFIG.LENGTH) {
      throw new Error(LOTTO_ERROR_MESSAGES.INVALID_DUPLICATE_NUMBER);
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  // TODO: 추가 기능 구현
}

export class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#validateBonusNumber(this.#lotto.getNumbers(), bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(numbers, bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGES.INVALID_TYPE);
    }
    if (bonusNumber < LOTTO_CONFIG.START_NUMBER || bonusNumber > LOTTO_CONFIG.END_NUMBER) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGES.INVALID_NUMBER_RANGE);
    }
    if (numbers.includes(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGES.INVALID_DUPLICATE);
    }
  }

  getNumbers() {
    return [...this.#lotto.getNumbers(), this.#bonusNumber];
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}
