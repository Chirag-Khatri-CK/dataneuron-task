import React, { useEffect, useState } from "react";
import userServices from "../utils";

const UpdateData = () => {
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let [tableData, setTableData] = useState({});
  let [modalInput, setModalInput] = useState({
    firstName: "",
    lastName: "",
  });
  let [isModalOpen, setModalOpen] = useState(false);
  let [action, setActiveAction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // set add or update action
  const activeAction = (action) => {
    setActiveAction(action);
    setModalOpen(true);
    setModalInput({});
    if (action === "update") {
      setModalInput(tableData);
      setModalOpen(true);
    }
  };

  // when new data is being add
  const handleAddData = () => {
    if (!modalInput?.firstName) {
      alert("Enter first name");
    } else if (!modalInput?.lastName) {
      alert("Enter last name");
    } else {
      userServices
        .addTableData({ ...modalInput, ...{ userId: user._id } })
        .then((res) => {
          if (res?.data) {
            console.log(user);
            setUser({ ...user, addApiCount: user?.addApiCount + 1 });
            setTableData(res.data);
            setModalOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // when data is being updated
  const handleUpdateData = () => {
    if (!modalInput?.firstName || !modalInput?.lastName) {
      alert("Empty fields! Please add data first ");
    } else {
      userServices
        .updateTableData({ ...modalInput, ...{ userId: user._id } })
        .then((res) => {
          if (res?.data) {
            setUser({ ...user, updateApiCount: user?.updateApiCount + 1 });
            setTableData(res.data);
            setModalOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //creating a new user
  const saveUser = () => {
    userServices
      .saveUser({
        userName: `data-neuron-${Math.floor(100000 + Math.random() * 900000)}`,
      })
      .then((res) => {
        if (res?.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getting user from id
  const getUser = (userId) => {
    userServices
      .getUserById(userId)
      .then((res) => {
        if (res?.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserTableObj = (userId) => {
    userServices
      .getTableDataByUserId(userId)
      .then((res) => {
        if (res?.data) {
          setTableData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user?._id) {
      getUser(user._id);
      getUserTableObj(user._id);
    } else {
      saveUser();
    }
  }, [user?._id]);

  return (
    <div className="flex items-center justify-center bg-indigo-100 p-20">
      <div className="flex flex-col items-center rounded-lg bg-indigo-200 justify-center w-3/4 lg:w-1/3 h-fit shadow-lg p-8">
        <table className="table-fixed bg-indigo-400 text-left w-full text-xl rounded-lg overflow-hidden">
          <thead>
            <tr className="p-4">
              <th className="bg-indigo-300 text-indigo-500 p-2">First Name</th>
              <th className="bg-indigo-300 text-indigo-500 p-2">Last Name</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(tableData).length > 0 ? (
              <tr className="bg-indigo-200">
                <td className="bg-indigo-400 text-white p-2">
                  {tableData?.firstName}
                </td>
                <td className="bg-indigo-400 text-white p-2">
                  {tableData?.lastName}
                </td>
              </tr>
            ) : (
              <tr className="">
                <td className="bg-indigo-400 text-white p-2">
                  Please add data
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="w-full flex items-center justify-between mt-6">
          <button
            className="rounded-md bg-indigo-500 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => activeAction("add")}
          >
            Add
          </button>

          <button
            className="rounded-md bg-indigo-500 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => activeAction("update")}
          >
            Update
          </button>
        </div>

        <div className="w-full flex flex-col items-left justify-between mt-6 text-xl text-indigo-800">
          <h3>
            Total number of add request till now:{" "}
            {user?.addApiCount ? user.addApiCount : 0}
          </h3>
          <h3>
            Total number of update request till now:{" "}
            {user?.updateApiCount ? user.updateApiCount : 0}
          </h3>
        </div>
      </div>
      {/* modal to add or update data  */}
      {isModalOpen && (
        <div
          className="fixed flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md top-0 w-full h-full"
          onClick={() => setModalOpen(false)}
        >
          <div className=" bg-indigo-200 w-1/2 h-fit p-8 rounded-lg">
            <input
              className="bg-[#F5F5F5] border-gray-border border-2 rounded-lg text-gray-dark font-medium p-2 w-full"
              placeholder="Enter Firstname"
              type="text"
              name="firstName"
              defaultValue={modalInput?.firstName}
              onChange={handleChange}
            />
            <input
              className="bg-[#F5F5F5] border-gray-border border-2 rounded-lg text-gray-dark font-medium p-2 w-full my-6"
              placeholder="Enter Lastname"
              type="text"
              name="lastName"
              defaultValue={modalInput?.lastName}
              onChange={handleChange}
            />
            <div>
              <button
                className="rounded-lg bg-indigo-500 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm capitalize"
                onClick={action === "add" ? handleAddData : handleUpdateData}
              >
                {action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateData;
