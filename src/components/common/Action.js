import React from "react";
import { Button } from "@mui/material";

const Action = ({ id, status }) => {
  // const dispatch = useDispatch();
  const onChangeStatus = async (status) => {
    console.log(id);
    // await dispatch();
  };
  if (status !== 1) {
    return (
      <Button variant="outlined" color="error" onClick={onChangeStatus}>
        Ban
      </Button>
    );
  } else {
    return (
      <Button variant="outlined" onClick={onChangeStatus}>
        UnBan
      </Button>
    );
  }
};

export default Action;
