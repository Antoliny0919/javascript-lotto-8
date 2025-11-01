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

  test('에러 발생시 입력을 다시 시도합니다.', async () => {
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

  test('transformer전달 여부에 따라 입력값이 가공되어 반환됩니다.', async () => {
    Console.readLineAsync.mockResolvedValueOnce('apple').mockResolvedValueOnce('banana');

    const hasTransformer = await input.readUntilSuccess('입력', (value) => {
      return {
        red: value
      }
    });

    expect(hasTransformer).toEqual({'red': 'apple'});

    const hasNotTransformer = await input.readUntilSuccess('입력');

    expect(hasNotTransformer).toBe('banana');
  });
});
