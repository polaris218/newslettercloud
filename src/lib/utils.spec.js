import { pipe, partial } from './utils';
import sinon from 'sinon';

describe('utils', () => {
  describe('pipe()', () => {
    const initialParams = ['a', 'b', 'c'];

    const resFirst = 'first result';
    const resSecond = 'second result';
    const resThird = 'third result';
    const resForth = 'forth result';

    const spyFirst = sinon.spy(() => resFirst);
    const spySecond = sinon.spy(() => resSecond);
    const spyThird = sinon.spy(() => resThird);
    const spyForth = sinon.spy(() => resForth);

    beforeEach(() => {
      spyFirst.resetHistory();
      spySecond.resetHistory();
      spyThird.resetHistory();
      spyForth.resetHistory();
    });

    describe('when called with multiple callbacks', () => {
      test('should call all callbacks with correct parameters in series', () => {
        const tested = pipe(
          spyFirst,
          spySecond,
          spyThird,
          spyForth
        );

        tested(...initialParams);

        sinon.assert.calledWith(spyFirst, ...initialParams);
        sinon.assert.calledWith(spySecond, resFirst);
        sinon.assert.calledWith(spyThird, resSecond);
        sinon.assert.calledWith(spyForth, resThird);

        expect(spyForth.firstCall.returnValue).toBe(resForth);
      });
    });

    describe('called with one callback', () => {
      test('should call callback with correct parameters', () => {
        const tested = pipe(spyFirst);

        tested(...initialParams);
        sinon.assert.calledWith(spyFirst, ...initialParams);
        expect(spyFirst.firstCall.returnValue).toBe(resFirst);

        sinon.assert.notCalled(spySecond);
        sinon.assert.notCalled(spyThird);
        sinon.assert.notCalled(spyForth);
      });
    });
  });

  describe('partial()', () => {
    it('should call function with given parameters', () => {
      const foo = sinon.spy();
      const firstArg = 'first';
      const secondArg = 'second';
      const thirdArg = 'third';
      
      const bar = partial(foo, firstArg, secondArg, thirdArg);

      bar();

      sinon.assert.calledWith(foo, firstArg, secondArg, thirdArg);
    });
  });
});
