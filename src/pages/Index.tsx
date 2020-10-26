import Axios from "axios";
import React, { ChangeEvent, useState } from "react";
import api from "../services/api";
import "../styles/pages/index.css";
import upload from "../images/image.svg";
import arrow from "../images/arrow.svg";
import { render } from "@testing-library/react";

function Index() {
    const [images, setImages] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const formData = new FormData();


    function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.files);

        if (!event.target.files) {
            return
        }

        const selectedImages = Array.from(event.target.files);

        setImages(selectedImages)

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image)
        })

        setPreviewImages(selectedImagesPreview)
    }

    const handle_submit = async (event: any) => {
        event.preventDefault();

        images.forEach(image => {
            formData.append('file_upload[file]', image)
            console.log(image)
        })

        console.log(images)
        console.log(formData)


        const url = 'https://teste.topnode.com.br/upload';
        const config = {
            headers: {
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        }
        await api.post(url, formData, config).then(response => { console.log(response); });
    };

    return (
        <div className="container">
            <label id="label">
                <img src={upload} alt="Upload" id="upload" />
                <input type="file" multiple onChange={handleSelectedImages} className="input" />
            </label>



            {previewImages.map(image => {
                return (
                    <img key={image} src={image} alt="laptop" className="preview"></img>
                )
            })}


            <button type="button" onClick={handle_submit} className="submit">
                <img src={arrow} alt="submit" />
            </button>

        </div>
    );
}

export default Index;