import { getScanDetailAction } from '../actions';

import { mapDispatchToProps } from '../detail';

describe('<DetailsPage />', () => {
  describe('mapDispatchToProps', () => {
    describe('onLoad', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLoad).toBeDefined();
      });

      it('should dispatch load action when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onLoad();
        expect(dispatch).toHaveBeenCalledWith(getScanDetailAction());
      });
    });
  });
});
