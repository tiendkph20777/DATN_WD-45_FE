import React, { useState } from "react";
import { useFetchOneUserQuery } from "../../../services/user.service";
import MyComponent from "./Adress";

const SettingAddress = () => {
  const profileUser = JSON.parse(localStorage.getItem("user")!);
  const idUs = profileUser?.user;
  const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs);
  const [form1, setForm1] = useState(true);
  const handleButtonClick = () => {
    setForm1(!form1);
  };

  const addre =
    usersOne?.city +
    " , " +
    usersOne?.district +
    " , " +
    usersOne?.commune +
    " , " +
    usersOne?.address;
  // console.log(addre)

  return (
    <div>
      {/* Address */}
      <div className="row align-items-center">
        <div className="col-8">
          <h3 className="heading-small text-muted mb-4">Thông tin liên lạc</h3>
        </div>
        <div className="col-4 text-right">
          <button
            className="btn btn-sm btn-primary"
            onClick={handleButtonClick}
          >
            Chỉnh sửa
          </button>
        </div>
      </div>
      {form1 ? (
        <div className="pl-lg-4">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-address">
                  Địa chỉ
                </label>
                <input
                  id="input-address"
                  className="form-control form-control-alternative l"
                  placeholder="Địa chỉ"
                  defaultValue={addre}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pl-lg-4">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-address">
                  Địa chỉ
                </label>
                <input
                  id="input-address"
                  className="form-control form-control-alternative l text-black"
                  placeholder="Địa chỉ"
                  defaultValue={addre}
                  readOnly
                />
              </div>
            </div>
          </div>
          <MyComponent />
        </div>
      )}
    </div>
  );
};

export default SettingAddress;
