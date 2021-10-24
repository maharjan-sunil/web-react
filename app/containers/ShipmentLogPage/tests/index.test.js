import { mapDispatchToProps } from '../index';
import { filterLogsAction } from '../actions';
describe('<ShipmentLogPage />', () => {
  describe('mapDispatchToProps', () => {
    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLoad).toBeDefined();
      });
      it('should dispatch filter when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const filterdata = {};
        result.onFilter(filterdata);
        expect(dispatch).toHaveBeenCalledWith(filterLogsAction(filterdata));
      });
    });
  });
});
