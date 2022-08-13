import { useSelector } from "react-redux";
import { myOpenOrders, myOpenOrdersSelector } from "../store/selectors";

const Transactions = () => {
  const myOpenOrders = useSelector(myOpenOrdersSelector);

  return (
    <div className="component exchange__transactions">
      <div>
        <div className="component__header flex-between">
          <h2>My Orders</h2>

          <div className="tabs">
            <button className="tab tab--active">Orders</button>
            <button className="tab">Trades</button>
          </div>
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
            {myOpenOrders &&
              myOpenOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td style={{ color: `${order.orderTypeClass}` }}>
                      {order.token0Amount}
                    </td>
                    <td>{order.tokenPrice}</td>
                    //TODO - Cancel Order will go in this final table div
                    {/* <td></td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
