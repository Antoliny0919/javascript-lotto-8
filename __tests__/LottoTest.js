import { Lotto, WinningLotto } from '../src/Lotto.js';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 문자가 존재할때 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 'zz', 3, 4, '&&', 5]);
    }).toThrow('[ERROR] 로또 번호는 정수만 입력 가능합니다.');
  });

  test('로또 번호가 1 ~ 45 이내 숫자가 아닌 경우 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow('[ERROR] 로또 번호는 1이상 45이하인 숫자여야 합니다.');
  });

  test('로또 번호는 오름차순 정렬 상태이다.', () => {
    const lotto = new Lotto([43, 11, 38, 15, 1, 4]);
    expect(lotto.getNumbers()).toEqual([1, 4, 11, 15, 38, 43]);
  });
});

describe('WinningLotto Tests', () => {

  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test('보너스 번호가 문자일때 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto(lotto, '십칠');
    }).toThrow('[ERROR] 보너스 번호는 정수만 입력 가능합니다.');
  });

  test('보너스 번호가 1 ~ 45 이내 숫자가 아닐 경우 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto(lotto, 46);
    }).toThrow('[ERROR] 보너스 번호는 1이상 45이하인 숫자여야 합니다.');
  });

  test('보너스 번호가 당첨 번호와 중복될때 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto(lotto, 1);
    }).toThrow('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
  });

  test('getNumbers는 당첨번호와 보너스번호를 합한 배열을 반환한다.', () => {
    const winningLotto = new WinningLotto(lotto, 7);
    expect(winningLotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
