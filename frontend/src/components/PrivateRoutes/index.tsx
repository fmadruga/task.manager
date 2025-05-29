import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PrivateRoutes = ({ children }: Props) => {
  const { token } = useSelector((state: RootState) => state.auth);

  return token ? <React.Fragment>{ children }</React.Fragment> : <Navigate to='/' />
}

export default PrivateRoutes;