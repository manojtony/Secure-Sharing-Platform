import { useEffect, useCallback } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const updateAccessList = useCallback(async () => {
    if (!contract) return;

    const addressList = await contract.shareAccess();
    const select = document.querySelector("#selectNumber");

    if (!select) return; // Ensure the element exists

    // Clear the select options first
    select.innerHTML = '<option className="address">People With Access</option>';

    const uniqueAddresses = [...new Set(addressList.filter(item => item.access).map(item => item.user))];

    uniqueAddresses.forEach((opt) => {
      const e1 = document.createElement("option");
      e1.textContent = opt;
      e1.value = opt;
      select.appendChild(e1);
    });
  }, [contract]);

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    updateAccessList();
    setModalOpen(false);
  };

  const revoking = async () => {
    const select = document.querySelector("#selectNumber");
    if (!select) return; // Ensure the element exists
    const address = select.options[select.selectedIndex].value;
    await contract.disallow(address);
    updateAccessList();
  };

  useEffect(() => {
    updateAccessList();
  }, [updateAccessList]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share With</div>
          <div className="body">
            <input type="text" className="address" placeholder="Enter Address" />
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button onClick={() => setModalOpen(false)} id="CancelBtn">Cancel</button>
            <button onClick={() => sharing()}>Share</button>
            <button onClick={() => revoking()} className="disallow-btn">Revoke Access</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;











// import { useEffect, useCallback } from "react";
// import "./Modal.css";

// const Modal = ({ setModalOpen, contract }) => {
//   const updateAccessList = useCallback(async () => {
//     if (!contract) return;

//     const addressList = await contract.shareAccess();
//     const select = document.querySelector("#selectNumber");

//     if (!select) return; // Ensure the element exists

//     // Clear the select options first
//     select.innerHTML = '<option className="address">People With Access</option>';

//     const uniqueAddresses = [...new Set(addressList.filter(item => item.access).map(item => item.user))];

//     uniqueAddresses.forEach((opt) => {
//       const e1 = document.createElement("option");
//       e1.textContent = opt;
//       e1.value = opt;
//       select.appendChild(e1);
//     });
//   }, [contract]);

//   const sharing = async () => {
//     const address = document.querySelector(".address").value;
//     await contract.allow(address);
//     updateAccessList();
//     setModalOpen(false);
//   };

//   const revoking = async () => {
//     const select = document.querySelector("#selectNumber");
//     if (!select) return; // Ensure the element exists
//     const address = select.options[select.selectedIndex].value;
//     await contract.disallow(address);
//     updateAccessList();
//   };

//   useEffect(() => {
//     updateAccessList();
//   }, [updateAccessList]);

//   return (
//     <div className="modalBackground">
//       <div className="modalContainer">
//         <div className="title">Share With</div>
//         <div className="body">
//           <input type="text" className="address" placeholder="Enter Address" />
//         </div>
//         <form id="myForm">
//           <select id="selectNumber">
//             <option className="address">People With Access</option>
//           </select>
//         </form>
//         <div className="footer">
//           <button onClick={() => setModalOpen(false)} id="CancelBtn">Cancel</button>
//           <button onClick={sharing}>Share</button>
//           <button onClick={revoking} className="disallow-btn">Revoke Access</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;