// import { Container } from "@chakra-ui/react";
import SupaClient from "../utils/supabase";

export async function getStaticProps() {
  const client = new SupaClient();

  const { data: users, error } = await client.supaGetUserUsers();

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      users,
    },
  };
}

export default function Try({ users }) {
  function getKeys() {
    return Object.keys(users[0]);
  }

  function getHeader() {
    const keys = getKeys();
    return keys.map((key) => <th key={key}>{key.toUpperCase()}</th>);
  }

  function getRowsData() {
    const items = users;
    const keys = getKeys();
    return items.map((row) => (
      <tr>
        <RenderRow data={row} keys={keys} />
      </tr>
    ));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>{getHeader()}</tr>
        </thead>
        <tbody>{getRowsData()}</tbody>
      </table>
    </div>

    // <div>
    //   <h1>Hello chat!</h1>
    //   <pre>{JSON.stringify(users, null, 2)}</pre>

    //   <table>
    //     <tr>
    //       <th>Name</th>
    //     </tr>
    //     {/* <tr *ngFor="let item of items ">
    //       <td>{{item.label}}</td>
    //       <td *ngFor="let value of item.values">
    //         {{value}}
    //       </td>
    //     </tr>   */}
    //   </table>
    // </div>
  );
}

const RenderRow = (props) =>
  props.keys.map((key) => <td key={props.data[key]}>{props.data[key]}</td>);

// function AdminDash() {

//   const { data, error, count } = await supabase
//     .from('table')
//     .select('*')
//     .gt('id', 10)
//     .count()

//   return (
//     <Container>
//       <Flex>Test</Flex>
//     </Container>
//   );
// }

// export default AdminDash;
