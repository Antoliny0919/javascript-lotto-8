import { Console } from '@woowacourse/mission-utils';

class Input {

  /**
   * 사용자의 입력을 받고 에러 발생시 다시 입력을 받습니다.
   * `callback` 파라미터로 입력된값을 통해 이후 동작을 정의합니다.
   * 
   * @param {string} message - 사용자에게 표시할 입력 메시지 
   * @param {function} callback - 입력값을 통한 후처리 함수
   * @returns 
   */
  async readUntilSuccess(message, callback) {
    while (true) {
      try {
        const input = await Console.readLineAsync(message);
        const callbackResult = callback(input);
        return callbackResult;
      } catch (err) {
        Console.print(err.message);
      }
    }
  }
}

export default Input;
