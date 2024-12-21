import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;

    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access or no files to display");
      return;
    }

    if (dataArray && dataArray.length > 0) {
      const formattedData = dataArray.map((item, i) => (
        <div className="file-item" key={i} onClick={() => openModal(item)}>
          <div className="file-icon">📄</div>
          <div className="file-name">{item[0] || "File"}</div>
        </div>
      ));
      setData(formattedData);
      setModalOpen(true);
    } else {
      setData([]);
      alert("No files to display");
    }
  };

  const openModal = (file) => {
    setSelectedFile(file);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setModalOpen(false);
  };

  return (
    <>
      <input type="text" placeholder="Enter Address" className="address" />
      <button className="center button" onClick={getData}>Get Data</button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {selectedFile ? (
              <div className="file-details">
                <div className="file-icon-large">📄</div>
                <div className="file-name-large">{selectedFile[0] || "File"}</div>
                <a href={selectedFile[1]} target="_blank" rel="noopener noreferrer" className="file-link">Open File</a>
              </div>
            ) : (
              <div className="file-list">{data}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Display;
