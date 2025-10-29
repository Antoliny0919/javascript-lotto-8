import { Lotto, WinningLotto } from '../src/Lotto';

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

  test('로또 번호 오름차순 정렬 테스트', () => {
    const lotto = new Lotto([43, 11, 38, 15, 1, 4]);
    expect(lotto.getNumbers()).toEqual([1, 4, 11, 15, 38, 43]);
  });
});

describe('WinningLotto Tests', () => {
  test('당첨 번호 로또 getNumbers메서드 반환값 테스트', () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    expect(winningLotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
