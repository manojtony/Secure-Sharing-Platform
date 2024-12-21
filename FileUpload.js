import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      setFileName(file.name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `d0c1cc512bb742556ebc`,
            pinata_secret_api_key: `9a6bcc014193318c3d8d35e326ed078297526a0df4f9b7c8a85ae995f2d7651c`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("File successfully uploaded to pinata");
        const FileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        // Assuming the smart contract add function is updated to handle filename and URL
        await contract.add(account, file.name, FileHash);

        
        setFileName("No file selected");
        setFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Unable to upload file to Pinata.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <span className="textArea"><h2> File: {fileName}</h2></span>
        <button type="submit" className="upload" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;









// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import "./FileUpload.css";

// const FileUpload = ({ contract, account }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No file selected");
//   const [uploading, setUploading] = useState(false);

//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       setFile(file);
//       setFileName(file.name);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       setUploading(true);
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `d0c1cc512bb742556ebc`,
//             pinata_secret_api_key: `9a6bcc014193318c3d8d35e326ed078297526a0df4f9b7c8a85ae995f2d7651c`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         alert("File successfully uploaded to pinata");
//         const FileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
//         // Assuming the smart contract add function is updated to handle filename and URL
//         await contract.add(account, file.name, FileHash);

//         setFileName("No file selected");
//         setFile(null);
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         alert("Unable to upload file to Pinata.");
//       } finally {
//         setUploading(false);
//       }
//     }
//   };

//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <div
//           {...getRootProps()}
//           className={`dropzone ${isDragActive ? "active" : ""}`}
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p>Drop the files here...</p>
//           ) : (
//             <p>Drag 'n' drop some files here, or click to select files</p>
//           )}
//         </div>
//         <h2 className="textArea">File: {fileName}</h2>
//         <button type="submit" className="upload" disabled={!file || uploading}>
//           {uploading ? "Uploading..." : "Upload File"}
//         </button>
//       </form>
//     </div>
//   );
// };

//export default FileUpload;