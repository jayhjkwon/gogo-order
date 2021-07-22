import { useState, useEffect, FC } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../aws-exports";
import { listCustomers } from "../graphql/queries";
import { ListCustomersQuery } from "../API";

Amplify.configure({ ...config, ssr: true });

type Response = { data: ListCustomersQuery };

const Customers: FC = () => {
  const [data, setData] = useState<Response>();

  useEffect(() => {
    const fetchData = async () => {
      const customers = (await API.graphql({
        query: listCustomers,
      })) as Response;
      setData(customers);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>Customers...</div>
      <ul>
        {data &&
          data.data.listCustomers.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
      </ul>
    </>
  );
};

export default Customers;
