import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent: React.FC = () => {
    const host = 'https://provinces.open-api.vn/api/';
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host}?depth=1`);
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchData();
    }, []);

    const callApiDistrict = async (cityCode: string) => {
        try {
            const response = await axios.get(`${host}p/${cityCode}?depth=2`);
            setDistricts(response.data.districts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const callApiWard = async (districtCode: string) => {
        try {
            const response = await axios.get(`${host}d/${districtCode}?depth=2`);
            setWards(response.data.wards);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityCode = event.target.value;
        setSelectedCity(selectedCityCode);
        callApiDistrict(selectedCityCode);
        setSelectedDistrict('');
        setSelectedWard('');
        printResult();
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrictCode = event.target.value;
        setSelectedDistrict(selectedDistrictCode);
        callApiWard(selectedDistrictCode);
        setSelectedWard('');
        printResult();
    };

    const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedWardCode = event.target.value;
        setSelectedWard(selectedWardCode);
        printResult();
    };

    const printResult = () => {
        if (selectedCity && selectedDistrict && selectedWard) {
            const result =
                `${selectedCity} | ${selectedDistrict} | ${selectedWard}`;
            console.log("adress : ", result);
        }
    };

    const foundItem = cities?.find(item => item?.code == selectedCity);
    const foundItem1 = districts?.find(item => item?.code == selectedDistrict);
    const foundItem2 = wards?.find(item => item?.code == selectedWard);
    const add = {
        cuty: foundItem?.name,
        cuty1: foundItem1?.name,
        cuty2: foundItem2?.name
    }
    console.log(add)

    return (
        <div>





            <div className="row">
                <div className="col-lg-4">
                    <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-city">Thành phố</label>
                        <select id="city" onChange={handleCityChange} value={selectedCity} className='form-select form-control-alternative form-control-label text-black'>
                            <option value="" disabled>Chọn tỉnh thành</option>
                            {cities?.map((city: any) => (
                                <option key={city.code} value={city.code}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-country">Huyện</label>
                        <select id="district" onChange={handleDistrictChange} value={selectedDistrict} className='form-select form-control-alternative form-control-label text-black'>
                            <option value="" disabled>Chọn quận huyện</option>
                            {districts?.map((district: any) => (
                                <option key={district.code} value={district.code}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label className="form-control-label" htmlFor="input-country">Xã</label>
                        <select id="ward" onChange={handleWardChange} value={selectedWard} className='form-select form-control-alternative form-control-label text-black'>
                            <option value="" disabled>Chọn phường xã</option>
                            {wards?.map((ward: any) => (
                                <option key={ward.code} value={ward.code}>{ward.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-group">
                        <label className="form-control-label" htmlFor="input-country">Địa chỉ cụ thể</label>
                        <input type="text" className='form-control text-black' />
                    </div>
                </div>
            </div>
            {/* <h2 id="result"></h2> */}
        </div>
    );
};

export default MyComponent;
