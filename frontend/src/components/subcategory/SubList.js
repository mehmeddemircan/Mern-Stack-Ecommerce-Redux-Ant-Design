import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { AllSubCategories } from "../../actions/subActions";
const SubList = ({ match }) => {
  const { subs, loading } = useSelector((state) => state.getAllSubCategories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllSubCategories());
  }, [dispatch, match]);


  return (
    <div className="container">
      <div className="col">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          <>
            {subs.map((sub) => (
              <div
                key={sub._id}
                className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
              >
                <Link to={`/subs/${sub.slug}`}>{sub.name}</Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SubList;
