import { Console } from '@woowacourse/mission-utils';

class Input {

  /**
   * 사용자의 입력을 받고 에러 발생시 다시 입력을 받습니다.
   * 
   * @param {string} message - 사용자에게 표시할 입력 메시지 
   * @param {function} transformer - 입력값을 가공하여 값을 반환하는 콜백 함수
   */
  async readUntilSuccess(message, transformer = null) {
    while (true) {
      try {
        const input = await Console.readLineAsync(message);
        return this.#transformInput(input, transformer);
      } catch (err) {
        Console.print(err.message);
      }
    }
  }

  #transformInput(input, transformer) {
    if (transformer === null) {
      return input;
    }

    return transformer(input);
  }
}

export default Input;
