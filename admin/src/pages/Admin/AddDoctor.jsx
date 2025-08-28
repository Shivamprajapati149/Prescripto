import React from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("0 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegee] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    {
      /* now call doctor api*/
    }

    try {
      if (!docImg) {
        return toast.error("Please upload doctor image");
      }
          // Convert Image to Base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Convert to base64 string
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

      const docImgBase64 = await toBase64(docImg);

      const doctorData = {
        name,
        email,
        password,
        speciality,
        degree,
        image: docImgBase64,
        experience,
        about,
        fees,
      address:  {
    address1, // previously city
    address2  // previously state
  }
      };

   



      {
        /* now call doctor api*/
      }
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
         doctorData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
         setEmail("");
        setPassword("");
        setName("");  
        setAddress1('');
         setAddress2("");
        setAbout("");
        setDegee("");
        setExperience("0 Year");
        setFees("");
        setSpeciality("General physician");

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-9 border border-hidden rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll  ">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc_Img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc_Img"
            hidden
            accept="image"
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w=full lg:flex-1 flex flex-col gap-4 ">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name :</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2 shadow-2xl  "
                type="text"
                placeholder="Enter the name"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email :</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2 shadow-2xl  "
                type="email"
                placeholder="Enter the Email"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password :</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2 shadow-2xl  "
                type="password"
                placeholder="Enter the password"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience :</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2 shadow-2xl  "
                name=""
                id=""
              >
                <option value="0 Years">0 Years</option>
                <option value="1 Years">1 Years</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees :</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2 shadow-2xl  "
                type="num"
                placeholder="Enter the fees :"
              />
            </div>

            <div>
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p> Speciality:</p>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className="border rounded px-3 py-2 shadow-2xl  "
                    name=""
                    id=""
                  >
                    <option value="General physician ">
                      General physician
                    </option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <p>Education: :</p>
                  <input
                    onChange={(e) => setDegee(e.target.value)}
                    value={degree}
                    className="border rounded px-3 py-2 shadow-2xl  "
                    type="text"
                    placeholder="Enter the Education "
                    required
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <p>Address :</p>
                  <input
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    className="border rounded px-3 py-2 shadow-2xl  "
                    type="text"
                    placeholder="Enter the Address 1 :"
                    required
                  />
                  <input
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    className="border rounded px-3 py-2 shadow-2xl  "
                    type="text"
                    placeholder="Enter the Address 2 :"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mt-4 mb-2"> About The Doctor : </p>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="w-full px-4 pt-2 border rounded shadow-2xl"
                name="text"
                id=""
                placeholder="Enter the about doctor here...."
                rows={5}
                required
              ></textarea>
            </div>

            <button
              type="submit "
              className="bg-[#5F6FFF] text-white py-3 px-10 rounded  shadow-2xl cursor-pointer mt-4 "
            >
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
