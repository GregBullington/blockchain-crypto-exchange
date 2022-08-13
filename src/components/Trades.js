import { useSelector } from "react-redux";
import { filledOrdersSelector } from "../store/selectors";

const Trades = () => {
  const filledOrders = useSelector(filledOrdersSelector);

  return (
    <div className="component exchange__trades">
      <div className="component__header flex-between">
        <h2>Trades</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
