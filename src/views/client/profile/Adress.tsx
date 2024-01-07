import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  useFetchOneUserQuery,
  useUpdateUserMutation,
} from "../../../services/user.service";
import { message as messageApi } from "antd";

const MyComponent: React.FC = (props: any) => {
  const host = "https://provinces.open-api.vn/api/";
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [updateUser] = useUpdateUserMutation();

  const profileUser = JSON.parse(localStorage.getItem("user")!);
  const idUs = profileUser?.user;
  const { data: usersOne, isLoading } = useFetchOneUserQuery(idUs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}?depth=1`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  const callApiDistrict = async (cityCode: string) => {
    try {
      const response = await axios.get(`${host}p/${cityCode}?depth=2`);
      setDistricts(response.data.districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const callApiWard = async (districtCode: string) => {
    try {
      const response = await axios.get(`${host}d/${districtCode}?depth=2`);
      setWards(response.data.wards);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityCode = event.target.value;
    setSelectedCity(selectedCityCode);
    callApiDistrict(selectedCityCode);
    setSelectedDistrict("");
    setSelectedWard("");
    printResult();
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDistrictCode = event.target.value;
    setSelectedDistrict(selectedDistrictCode);
    callApiWard(selectedDistrictCode);
    setSelectedWard("");
    printResult();
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWardCode = event.target.value;
    setSelectedWard(selectedWardCode);
    printResult();
  };

  const printResult = () => {
    if (selectedCity && selectedDistrict && selectedWard) {
      const result = `${selectedCity} | ${selectedDistrict} | ${selectedWard}`;
      console.log("adress : ", result);
    }
  };

  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    // Handle your form submission logic here
    const foundItem = cities?.find((item: any) => item?.code == selectedCity);
    const foundItem1 = districts?.find(
      (item: any) => item?.code == selectedDistrict
    );
    const foundItem2 = wards?.find((item: any) => item?.code == selectedWard);
    const add = {
      _id: usersOne?._id,
      fullName: usersOne?.fullName,
      gender: usersOne?.gender,
      image: usersOne?.image,
      email: usersOne?.email,
      password: usersOne?.password,
      city: foundItem?.name,
      district: foundItem1?.name,
      commune: foundItem2?.name,
      address: data?.address,
    };
    // console.log(add)
    messageApi.info({
      type: "error",
      content: "Chúc mừng bạn đã Cập nhật thành công 🎉🎉🎉",
      className: "custom-class",
      style: {
        marginTop: "0",
        fontSize: "20px",
        lineHeight: "50px",
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
    updateUser(add);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group focused">
              <label className="form-control-label" htmlFor="input-city">
                Thành phố
              </label>
              <select
                id="city"
                onChange={handleCityChange}
                value={selectedCity}
                className="form-select form-control-alternative form-control-label text-black"
                required
              >
                <option value="" disabled>
                  Chọn tỉnh thành
                </option>
                {cities?.map((city: any) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group focused">
              <label className="form-control-label" htmlFor="input-country">
                Huyện
              </label>
              <select
                id="district"
                onChange={handleDistrictChange}
                value={selectedDistrict}
                className="form-select form-control-alternative form-control-label text-black"
                required
              >
                <option value="" disabled>
                  Chọn quận huyện
                </option>
                {districts?.map((district: any) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="input-country">
                Xã
              </label>
              <select
                id="ward"
                onChange={handleWardChange}
                value={selectedWard}
                className="form-select form-control-alternative form-control-label text-black"
                required
              >
                <option value="" disabled>
                  Chọn phường xã
                </option>
                {wards?.map((ward: any) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group">
              <label className="form-control-label" htmlFor="input-country">
                Địa chỉ cụ thể
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="form-control text-black"
              />
            </div>
          </div>
          <div className="col-lg-7 text-right">
            <button type="submit" className="btn btn-sm btn-info">
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyComponent;
