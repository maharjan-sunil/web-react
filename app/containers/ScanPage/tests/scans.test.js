import { resetScanAction, setScanAction } from '../actions';

import { mapDispatchToProps } from '../scans';

describe('<scans/>', () => {
  describe('mapDispatchToProps', () => {
    describe('reset scan', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.resetScan).toBeDefined();
      });

      it('should reset the scan data when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.resetScan();
        expect(dispatch).toHaveBeenCalledWith(resetScanAction());
      });
    });

    describe('set scan count', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.scanCount).toBeDefined();
      });

      it('should set the scan count when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.scanCount();
        expect(dispatch).toHaveBeenCalledWith(setScanAction());
      });
    });
  });
});
