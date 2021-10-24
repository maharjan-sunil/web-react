import { mapDispatchToProps } from '../detail';
import { getDatatConnectionDetailAction } from '../actions';

describe('<DetailPage/>', () => {
  it('should be injected', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const id = 1;
    result.onLoad(id);
    expect(dispatch).toHaveBeenCalledWith(getDatatConnectionDetailAction(id));
    expect(result.onLoad).toBeDefined();
  });
});
