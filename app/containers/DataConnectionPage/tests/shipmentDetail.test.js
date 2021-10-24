import { mapDispatchToProps } from '../shipmentDetail';
import { getShipmentDetailAction } from '../actions';

describe('<shipmentDetail/>', () => {
  it('should be injected', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const id = 1;
    result.onLoad(id);
    expect(dispatch).toHaveBeenCalledWith(getShipmentDetailAction(id));
    expect(result.onLoad).toBeDefined();
  });
});
