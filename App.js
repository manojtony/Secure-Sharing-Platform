import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import FileUpload from './components/FileUpload';
import Display from './components/Display'
import Modal from './components/Modal'
import UserManual from "./components/UserManual";
import Home from "./components/Home"
import './App.css';

function App() {
  const[account,setAccount] = useState("");
  const[provider,setProvider] = useState(null);
  const[contract,setContract] = useState(null);
  const[modalOpen,setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Secure File Sharing";
  }, []);
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const loadProvider = async()=>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload()
        })
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })
        await provider.send("eth_requestAccounts",[])
        const signer = provider.getSigner();
        const address = await signer.getAddress()
        console.log(address)
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contract = new ethers.Contract(contractAddress,Upload.abi,signer);
        console.log(contract);
        setContract(contract)
        setProvider(provider)
      }else{
        console.error("Metamask is not installed")
      }
    }
    provider && loadProvider()
  },[])
  return (
    <>
    
    <Home/>
    <section className="bg">
    {!modalOpen && (<button className="share" onClick={()=>setModalOpen(true)}>Share or Revoke Access</button>)}
    
    {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      <div className="App">
        <h1 style={{color:"white"}}>Blockchain Based Secure Data Sharing Platform</h1>
        <p>Account:{account ? account : "Not connected"}</p>
        <div className='bg'></div>
        <div className='bg bg2'></div>
        <div className='bg bg3'></div>
        <FileUpload account={account} 
          provider={provider}
          contract={contract}>
        </FileUpload>
        <Display contract={contract} account={account} ></Display>
        <UserManual></UserManual>
      </div>
      </section>
    </>
  );
}

export default App;
