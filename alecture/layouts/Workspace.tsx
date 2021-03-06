import React, { FC, useCallback } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Redirect } from "react-router-dom";

import axios from "axios";

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { data, error, mutate } = useSWR("/api/users", fetcher);

  const onLogout = useCallback(() => {
    axios
      .post("/api/users/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        mutate();
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>๋ก๊ทธ์์</button>
      {children}
    </div>
  );
};

export default Workspace;
