import { mapDispatchToProps } from '../index';
import {
  getFilterDataConnectionAction,
  getDataConnectionsAction,
  resetStatusCodeAction,
  pageDataConnectionAction,
  resetDataConnectionAction,
  selectRowAction,
} from '../actions';
describe('<DataConnectionPage />', () => {
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
        expect(dispatch).toHaveBeenCalledWith(
          getFilterDataConnectionAction(filterdata),
        );
      });
      it('should dispatch onload when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const params = {};
        result.onLoad(params);
        expect(dispatch).toHaveBeenCalledWith(getDataConnectionsAction(params));
      });
      it('should dispatch on401 when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.on401();
        expect(dispatch).toHaveBeenCalledWith(resetStatusCodeAction());
      });
      it('should dispatch onPage when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const page = 1;
        result.onPage(page);
        expect(dispatch).toHaveBeenCalledWith(pageDataConnectionAction(page));
      });
      it('should dispatch resetDataConnection when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const id = 1;
        const index = 1;
        result.resetDataConnection(id, index);
        expect(dispatch).toHaveBeenCalledWith(
          resetDataConnectionAction(id, index),
        );
      });
      it('should dispatch onSelectRow when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const selectedRow = 1;
        result.onSelectRow(selectedRow);
        expect(dispatch).toHaveBeenCalledWith(selectRowAction(selectedRow));
      });
    });
  });
});
