export class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.some((number) => !Number.isInteger(number))) {
      throw new Error('[ERROR] 로또 번호는 정수만 입력 가능합니다.');
    }
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (numbers.some((number) => number < 1 || number > 45)) {
      throw new Error('[ERROR] 로또 번호는 1이상 45이하인 숫자여야 합니다.');
    }
    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 중복된 당첨 번호가 존재합니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  // TODO: 추가 기능 구현
}

export class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.#validateBonusNumber(numbers, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(numbers, bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 정수만 입력 가능합니다.');
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error('[ERROR] 보너스 번호는 1이상 45이하인 숫자여야 합니다.');
    }
    if (numbers.includes(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
    }
  }

  getNumbers() {
    return [...super.getNumbers(), this.#bonusNumber];
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}
