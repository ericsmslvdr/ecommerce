import React, { useState } from "react"
import { db, storage } from "../config/firebase"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"

export const AddProduct = () => {
    const [imageError, setImageError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [uploadError, setUploadError] = useState("")

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: ''
    })
    const [image, setImage] = useState(null)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const productsCollectionRef = collection(db, "products")

    const types = [
        'img/jpg',
        'image/jpeg',
        'image/png',
    ]

    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile)
                setImageError("")
            } else {
                setImage(null)
                setImageError("Please select a valid image file type (png or jpg)")
            }
        } else {
            console.log("Please select your file");
        }
    }

    const handleAddProducts = async (e) => {
        e.preventDefault()
        try {
            if (image !== null) {
                const fileName = image.name;
                const imgRef = ref(storage, `products/${fileName}`)
                const bytes = await uploadBytes(imgRef, image)
                const downloadUrl = await getDownloadURL(bytes.ref)
                await addDoc(productsCollectionRef, {
                    title: formData.title,
                    description: formData.description,
                    price: Number(formData.price),
                    imgUrl: downloadUrl,
                })
                setSuccessMsg("Product added successfully")
                setFormData({
                    title: '',
                    description: '',
                    price: ''
                })
                setImage(null)
                document.getElementById("file").value = ""
                setImageError("")
                setUploadError("")
                setTimeout(() => {
                    setSuccessMsg("")
                }, 3000);
            }
        } catch (error) {
            setUploadError(error.message)
        }
    }
    return (
        <div className='container w-50'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>
            {successMsg && <>
                <div className='alert alert-success'>{successMsg}</div>
                <br></br>
            </>}
            <form
                autoComplete="off"
                className='form-group'
                onSubmit={handleAddProducts}
            >
                <label>Product Title</label>
                <input
                    type="text"
                    name="title"
                    className='form-control'
                    required
                    onChange={handleOnChange}
                    value={formData.title}>
                </input>
                <br></br>
                <label>Product Description</label>
                <textarea
                    name="description"
                    className='form-control'
                    rows="3"
                    required
                    onChange={handleOnChange}
                    value={formData.description}>
                </textarea>
                <br></br>
                <label>Product Price</label>
                <input
                    type="number"
                    name="price"
                    className='form-control'
                    required
                    onChange={handleOnChange}
                    value={formData.price}>
                </input>
                <br></br>
                <label>Upload Product Image</label>
                <input
                    type="file"
                    name="image"
                    id="file"
                    className='form-control'
                    required
                    onChange={handleProductImg}>
                </input>

                {imageError && <>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>

                </>}
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        className='button cart-btn'
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
            {uploadError && <>
                <br></br>
                <div className='error-msg'>{uploadError}</div>

            </>}

        </div>
    )
}

export default AddProduct