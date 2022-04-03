import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Students from "../pages/Students";
import fetchProducts from "../redux/fetchProducts";

const RobotStudents = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (store.pending) return <TailSpin height={180} width={180} />;

  return (
    <div>
      <Students students={store.products} />
    </div>
  );
};

export default RobotStudents;
