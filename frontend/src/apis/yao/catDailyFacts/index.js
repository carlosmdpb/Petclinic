
import { UNSAFE_FetchersContext } from "react-router-dom";
import { Button, ButtonGroup, Table } from "reactstrap";
import useFetchState from "../../../util/useFetchState";


export default function GetCatDailyFacts () {

   const [catDailyFacts, setCatDailyFacts] = useFetchState( [],
    "https://cat-fact.herokuapp.com/facts")

  const catList =
  catDailyFacts.map((cat) => {
    return (
          <tr key={cat.id}>
            <td className="text-center">{cat.text}</td>
          </tr>
        );
      });

  return (
    <div>
      <div className="admin-page-container">
        <h1 className="text-center">Cat Daily Facts</h1>
        <div>
          <Table aria-label="clinics" className="mt-4">
            <thead>
              <tr>
                <th width="75%" className="text-center">Facts</th>
              </tr>
            </thead>
            <tbody>{catList}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
