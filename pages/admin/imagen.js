import LAdmin from '../../components/layouts/LAdmin'
import { useState } from "react";
import axios from "axios";

const BUCKET_URL = "https://tiendasideris.s3.us-west-1.amazonaws.com/";

export default function Imagen() {

    const [file, setFile] = useState();
    const [uploadingStatus, setUploadingStatus] = useState();
    const [uploadedFile, setUploadedFile] = useState();

    const selectFile = (e) => {
        setFile(e.target.files[0]);
        
    };

    const uploadFile = async () => {
        setUploadingStatus("Uploading the file to AWS S3");

        let { data } = await axios.post("/api/s3/uploadFile", {
            name: file.name,
            type: file.type,
        });
    

        // console.log(data);

        const url = data.url;
        let { data: newData } = await axios.put(url, file, {
        headers: {
            "Content-type": file.type,
            "Access-Control-Allow-Origin": "*",
        },
        });

        setUploadedFile(BUCKET_URL + file.name);
        setFile(null);
    };


    return (
        <LAdmin>
            <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
            <main>
                <p>Please select a file to upload</p>
                <input type="file" onChange={(e) => selectFile(e)} multiple/>
                {file && (
                <>
                    <p>Selected file: {file.name}</p>
                    <button
                    onClick={uploadFile}
                    className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
                    >
                    Upload a File!
                    </button>
                </>
                )}
                {uploadingStatus && <p>{uploadingStatus}</p>}
                {uploadedFile && <img src={uploadedFile} />}
            </main>
            </div>
        </LAdmin>
    )
}
