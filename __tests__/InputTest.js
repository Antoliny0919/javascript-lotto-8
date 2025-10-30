import { Console } from '@woowacourse/mission-utils'
import Input from '../src/Input';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    readLineAsync: jest.fn(),
    print: jest.fn(),
  },
}));

describe('Input Tests', () => {
  const input = new Input();

  test('에러 발생시 입력을 재차 시도', async () => {
    Console.readLineAsync
    .mockResolvedValueOnce('error')
    .mockResolvedValueOnce('success');
    await input.readUntilSuccess('입력', (value) => {
      if (value === 'error') {
        throw new Error('Some Error...');
      } 
      return value;
    });

    expect(Console.print).toHaveBeenCalledWith('Some Error...');
    expect(Console.readLineAsync).toHaveBeenCalledTimes(2);
  });

  test('콜백을 통해 입력값 후처리', async () => {
    Console.readLineAsync.mockResolvedValueOnce('apple');

    const response = await input.readUntilSuccess('입력', (value) => {
      return {
        red: value
      }
    });

    expect(response).toEqual({'red': 'apple'});
  })
});
