import { useEffect, useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import ChangeNetwork from './changeNetwork'


const Create = ({ marketplace, account, correctNetwork }) => {

  const [nftimage, setNFTImage] = useState();
  const [videoFile, setVideoFile] = useState();
  const [forminfo, setFormInfo] = useState({
    title: "",
    description: "",
    price: null
  });
  // const web3 = window.ethereum;
  // const tronWeb = tron.tronWeb; 

  useEffect(() => {
    document.title = "Create"
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeHandler = (event, fileType) => {
    if (event.target.files && event.target.files[0]) {
      if (fileType === 'image') {
        setNFTImage(event.target.files[0]);
      } else if (fileType === 'video') {
        setVideoFile(event.target.files[0]);
      }
    }
  };

  const handleEvent = async (e) => {
    e.preventDefault();
    console.log(nftimage)
    console.log(forminfo);

    const formData = new FormData();
    const jsonformData = new FormData();
    formData.append('file', nftimage);

    const metadata = JSON.stringify({
      name: forminfo.title,
      description: forminfo.description
    });
    jsonformData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    })
    jsonformData.append('pinataOptions', options);

    try {

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `1a7cac69d0dac2bceaeb`,
          pinata_secret_api_key: `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(resFile.data);

      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

      // Upload video
      const formDataVideo = new FormData();
      formDataVideo.append("file", videoFile);
      const resVideo = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formDataVideo, {
        headers: {
          pinata_api_key: `18475aac732291be8c7c`,
          pinata_secret_api_key: `4593b2a9ce8fd83a816bd16971d4454828f291374549874739250f5d95128009`,
          "Content-Type": "multipart/form-data",
        },
      });
      const videoHash = `https://gateway.pinata.cloud/ipfs/${resVideo.data.IpfsHash}`;

      const info = {
        name: forminfo.title,
        description: forminfo.description,
        image: ImgHash,
        video: videoHash,
        price: forminfo.price
      }

      async function pinJSONToPinata(info) {
        const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
        const headers = {
          'Content-Type': 'application/json',
          'pinata_api_key': `1a7cac69d0dac2bceaeb`,
          'pinata_secret_api_key': `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`
        };

        try {
          const res = await axios.post(url, info, { headers });
          const meta = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
          console.log(meta);
          mintThenList(meta, info.price);
        } catch (error) {
          console.error(error);
        }

      }

      pinJSONToPinata(info)

      //   setFormInfo({
      //       title:"",
      //       description:"",
      //       price:""

      //   })
      //   setNFTImage(null);

    } catch (error) {
      console.log(error);
    }



  };

  const mintThenList = async (uri, price) => {
    const itemCounts = await marketplace.methods.itemCount().call();
    const itemCount = itemCounts.toString();
    try {
      toast.info("Confirm to Mint the NFT", { position: "top-center" });

      // Convert TRX to Sun (smallest TRX unit)

      console.log("price", price);
      console.log("price.tostring", price.toString());
      // const listingPrice = tronWeb.toSun(price.toString()); 
      // Call the 'mint' function of the contract
      const tx1 = await marketplace.methods.mint(account, itemCount + 1, uri, price).send({
        from: account,
        shouldPollResponse: true,
      });
      // const tx1 = await marketplace.methods.mint(tronWeb.defaultAddress.base58, itemCount+1, uri, listingPrice).send({
      //     shouldPollResponse: true,
      // });

      toast.info("Wait till transaction Confirms....", { position: "top-center" });

      // Wait for transaction confirmation
      // await tx1.wait();

      toast.success("NFT added to marketplace successfully", { position: "top-center" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to mint NFT", { position: "top-center" });
    }
  };



  return (
    (
      <div className="min-h-screen flex justify-center items-center">
        <main className="container mx-auto px-4">
          <div className="content text-white shadow-lg rounded-lg border-2 p-5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">
            <div className="space-y-8">
              <Row className="g-4">
                <Form.Group>
                  <Form.Label className="text-lg">Upload Thumbnail Image</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="image"
                    accept="image/*" // Only accept image files
                    onChange={(event) => changeHandler(event, 'image')}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-lg">Upload Video</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="video"
                    accept="video/*" // Only accept video files
                    onChange={(event) => changeHandler(event, 'video')}
                  />
                </Form.Group>
                <Form.Control
                  onChange={handleChange}
                  name="title"
                  id="title"
                  size="lg"
                  required
                  type="text"
                  placeholder="Name"
                  className="text-lg"
                />
                <Form.Control
                  onChange={handleChange}
                  name="description"
                  id="description"
                  size="lg"
                  required
                  as="textarea"
                  placeholder="Description"
                  className="text-lg"
                />
                <Form.Control
                  onChange={handleChange}
                  name="price"
                  id="price"
                  size="lg"
                  required
                  type="number"
                  placeholder="Price in TRX"
                  className="text-lg"
                />
                <div className="flex justify-center">
                  {console.log(correctNetwork)}
                  {!correctNetwork ? (<ChangeNetwork/>) :(<Button onClick={handleEvent} variant="primary" size="lg">
                    Create NFT!
                  </Button>)
                  }
                </div>
              </Row>
            </div>
          </div>
        </main>
      </div>

    )
  );
}

export default Create