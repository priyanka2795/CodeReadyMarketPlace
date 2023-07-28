import React, { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
// import CKeditor from './CKeditor'
import { GrFormClose } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

export const EditContentUploadLeft = (props) => {
    const getEditableData = props.editableData

    const { id, slug } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [token, setToken] = useState("")


    useEffect(() => {
        var getSession = sessionStorage.getItem("accessToken");
        var getRegisterSession = sessionStorage.getItem("accessTokenr");
        if (getSession) {
            setToken(getSession)
        } else {
            setToken(getRegisterSession)
        }
    }, [location])


    const sellCategory = useSelector((state) => state.addProduct.sellerCategory);
    const allCategory = useSelector((state) => state.addProduct.mainCategoryArray)
    const getSwitchedCategory = useSelector((state) => state.addProduct.switchCategory)


    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref9 = useRef(null);
    const ref10 = useRef(null);
    const ref11 = useRef(null);
    const ref12 = useRef(null);

    const [loader, setLoader] = useState(false)
    const [productNameErr, setProductNameErr] = useState("")
    const [name, setName] = useState("")
    const [keyFeatureFields, setKeyFeatureFields] = useState([{ key_feature: "" }])
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [mainFile, setMainFile] = useState("")
    const [category, setCategory] = useState("")
    const [compatibleBrowser, setCompatibleBrowser] = useState("")
    const [compatibleWith, setCompatibleWith] = useState("")
    const [framework, setFramework] = useState("")
    const [fileIncluded, setFileIncluded] = useState("")
    const [layout, setLayout] = useState("")
    const [demoURL, setDemoURL] = useState("")
    const [tags, setTags] = useState("")

    const [itemPrice, setItemPrice] = useState("")
    const [buyerFee, setBuyerFee] = useState(12)
    const purchasePrice = Number(itemPrice) + buyerFee

    // =====select enable / disable functionality=====
    const [isCompatibleDisabled, setIsCompatibleDisabled] = useState(false)
    const [compatibleCheck, setCompatibleCheck] = useState(false)
    const onCompatibleCheckboxClick = () => {
        setCompatibleCheck(!compatibleCheck)
        setIsCompatibleDisabled(!isCompatibleDisabled)

    }

    const [isFrameworkDisabled, setIsFrameworkDisabled] = useState(false)
    const [frameworkCheck, setFrameworkCheck] = useState(false)
    const onFrameworkCheckboxClick = () => {
        setFrameworkCheck(!frameworkCheck)
        setIsFrameworkDisabled(!isFrameworkDisabled)
    }
    // =====select enable / disable functionality=====


    // =====for theme images start=====
    const [themePreviewImages, setThemePreviewImages] = useState([]);
    const [prev, setPrev] = useState([])

    const handleTehmePreviewUplaod = (e) => {
        setThemePreviewImages([...themePreviewImages, ...e.target.files])
        // setPrev([...prev, URL.createObjectURL(e.target.files[0])])
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            console.log(fileArray)
            setPrev((a) => a.concat(fileArray))
        }
    }
    const removeThemeImg = (i) => {
        let list1 = [...prev]
        list1.splice(i, 1)
        setPrev(list1)

        let list = [...themePreviewImages];
        list.splice(i, 1);
        setThemePreviewImages(list)
        if (themePreviewImages.length == 1) {
            document.getElementById("theme_file").value = ''
        }
    }
    // =====for theme images  end=====

    // =====thumbnail image upload start=====
    const [thumbnailPrev, setThumbnailPrev] = useState("")
    const handleThumbnail = (e) => {
        setThumbnail(e.target.files[0])
        setThumbnailPrev(URL.createObjectURL(e.target.files[0]))
    }
    const removeThumbnail = () => {
        setThumbnailPrev("")
        setThumbnail("")
        setEditThumbnailPrev("")
        document.getElementById("thumbnail_file").value = ''
    }
    // =====thumbnail image upload end=====


    // =====sourcecode zip  upload start=====
    const [mainFilePrev, setMainFilePrev] = useState("")
    const handleSoureCodeZip = (e) => {
        setMainFile(e.target.files[0])
        setMainFilePrev(e.target.files[0].name)
        setSrcFile(e.target.files[0].name)
    }
    const removeMainFile = () => {
        setMainFile("")
        setMainFilePrev("")
        setSrcFile("")
        document.getElementById("main_file").value = ''
    }

    // =====sourcecode zip upload end=====


    const handleCompatibleBrowser = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setCompatibleBrowser(value)
    }
    const handleCompatibleWith = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setCompatibleWith(value)
    }
    const handleFramework = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setFramework(value)
    }

    const handleFilesIncluded = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setFileIncluded(value)
    }

    // ===key features====

    const addMoreKeyFeature = () => {
        setKeyFeatureFields([...keyFeatureFields, { key_feature: "" }])
    }
    const removeKeyFeature = (i) => {
        const list = [...keyFeatureFields]
        list.splice(i, 1);
        setKeyFeatureFields(list)
    }
    const handleKeyFeatureChange = (e, i) => {
        const { name, value } = e.target
        let list = [...keyFeatureFields];
        list[i][e.target.name] = e.target.value;
        setKeyFeatureFields(list);
    }
    let newKeyFeature = keyFeatureFields.map((e) => {
        return e['key_feature']
    })
    let keyfeature_filteredVal = newKeyFeature.join(",")
    // ===key features====






    //  ====get api function====
    useEffect(() => {
        for (let i = 0; i < allCategory.length; i++) {
            if (allCategory[i].category == sellCategory) {
                setCategory(allCategory[i].category_list[0].id)
            }
        }

    }, [])
    useEffect(() => {
        for (let i = 0; i < allCategory.length; i++) {
            if (allCategory[i].category == getSwitchedCategory) {
                setCategory(allCategory[i].category_list[0].id)
            }
        }

    }, [getSwitchedCategory])


    const idn = Number(category);
    const [getCategoryBrowsers, setGetCategoryBrowsers] = useState(null)
    const getBrowsers = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/get-product-subcategory-detail/?subcategory_id=${idn}`)
            .then((res) => {
                // console.log("res", res.data.response);
                setGetCategoryBrowsers(res.data.response)
            })
            .catch((err) => {
                // console.log("err", err);
            })
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        if (category !== "") {
            getBrowsers();
        }
    }

    useEffect(() => {
        if (category !== "") {
            getBrowsers();
        }
    }, [category])

    //  ====get api function====

    const [editCategory, setEditCategory] = useState("")
    const [productId, setProductId] = useState("")
    const [srcFile, setSrcFile] = useState("")
    const [editThumbnailPrev, setEditThumbnailPrev] = useState("")
    const [editThemePrev, setEditThemePrev] = useState([])
    // set editable data=====
    useEffect(() => {
        if (getEditableData) {
            setName(getEditableData.product_name)
            setDescription(getEditableData.product_description)
            setLayout(getEditableData.layout)
            setKeyFeatureFields(getEditableData.key_features)
            // setThemePreviewImages(getEditableData.product_theme_images)
            setCompatibleWith(getEditableData.competible_With)
            setCompatibleBrowser(getEditableData.competible_browser)
            setFramework(getEditableData.framework)
            setFileIncluded(getEditableData.themeforest_files_included)
            setCategory(getEditableData.product_category.sub_category_id)
            setDemoURL(getEditableData.demo_url)
            setTags(getEditableData.tag)
            setItemPrice(getEditableData.product_price - buyerFee)
            setEditCategory(getEditableData.product_category_name)

            setSrcFile(getEditableData.main_file.split("/").pop())
            setProductId(getEditableData.id)

            setEditThumbnailPrev(`${process.env.REACT_APP_BASE_URL}${getEditableData.thumbnail}`)
            setEditThemePrev(getEditableData.product_theme_images)
        }
    }, [getEditableData])


    const editProductData = async (pId) => {
        var themePattern = /\.(jpg|png)$/
        var imgPattern = /\.(jpg|jpeg|png)$/
        var zipPattern = /.(?:r\d\d|r\d\d\d|rar|zip)/

        function isValidUrl(str) {
            const pattern = new RegExp(
              '^([a-zA-Z]+:\\/\\/)?' + 
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
                '((\\d{1,3}\\.){3}\\d{1,3}))' + 
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
                '(\\?[;&a-z\\d%_.~+=-]*)?' + 
                '(\\#[-a-z\\d_]*)?$',
              'i'
            );
            return pattern.test(str);
          }

        if (!name || name.length > 100) {
            document.getElementById("nameError").style.color = "red"
            ref.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else {
            document.getElementById("nameError").style.color = "#47576a"
        }

        if (!description) {
            document.getElementById("desError").style.color = "red"
            ref1.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else {
            document.getElementById("desError").style.color = "#47576a"
        }

        if (keyFeatureFields[0].key_feature == "" || keyFeatureFields[0].key_feature.length > 45) {
            document.getElementById("keyFeature_error").style.display = "block"
            ref2.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else {
            document.getElementById("keyFeature_error").style.display = "none"
        }

        if (keyFeatureFields.length < 2 || keyFeatureFields.length > 10) {
            document.getElementById("keyFeature_error_atleastThree").style.display = "block"
            ref2.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else {
            document.getElementById("keyFeature_error_atleastThree").style.display = "none"
        }

        if (!mainFile.name || !zipPattern.test(mainFile.name)) {
            if (srcFile) {
                document.getElementById("zipFile_error").style.display = "none"
               
            } else {
                document.getElementById("zipFile_error").style.display = "block"
                ref3.current?.scrollIntoView({ behavior: 'smooth' });
                return false;
            }
        } else {
            document.getElementById("zipFile_error").style.display = "none"
        }

        if (!thumbnail.name || !imgPattern.test(thumbnail.name)) {
            if (editThumbnailPrev) {
                document.getElementById("thumbnail_error").style.color = "#47576a"
            } else {
                document.getElementById("thumbnail_error").style.color = "red"
                ref4.current?.scrollIntoView({ behavior: 'smooth' });
                return false;
            }
        }
        else {
            document.getElementById("thumbnail_error").style.color = "#47576a"
        }

        if (themePreviewImages.length === 0) {
            if (editThemePrev.length) {
                document.getElementById("themePreviewError").style.color = "#47576a"
            } else {
                document.getElementById("themePreviewError").style.color = "red"
                ref5.current?.scrollIntoView({ behavior: 'smooth' });
                return false;
            }

        }else if (themePreviewImages.length) {
            for (let i = 0; i < themePreviewImages.length; i++) {
                if (!themePattern.test(themePreviewImages[i].name)) {
                    document.getElementById("themePreviewError").style.color = "red"
                    ref5.current?.scrollIntoView({ behavior: 'smooth' });
                    return false;
                } else {
                    document.getElementById("themePreviewError").style.color = "#47576a"
                }
            }
        }

         else {
            document.getElementById("themePreviewError").style.color = "#47576a"
        }

        // if (themePreviewImages.length < 5) {
        //     if(editThemePrev.length < 5){
        //         document.getElementById("theme_error_atLeastfive").style.display = "block"
        //         return false;
        //     }else{
        //         document.getElementById("theme_error_atLeastfive").style.display = "none"

        //     }

        // } else {
        //     document.getElementById("theme_error_atLeastfive").style.display = "none"
        // }

        if (layout === "") {
            document.getElementById("layout_error").style.display = "block"
            ref9.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else {
            document.getElementById("layout_error").style.display = "none"
        }

        if (demoURL && isValidUrl(demoURL) === false) {
            document.getElementById("url_error").style.display = "block"
            ref12.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else {
            document.getElementById("url_error").style.display = "none"
        }

        if (tags === "") {
            document.getElementById("tags_error").style.color = "red"
            ref10.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else {
            document.getElementById("tags_error").style.color = "#47576a"
        }

        if (itemPrice === "") {
            document.getElementById("item_price_error").style.display = "block"
            ref11.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        } else if (itemPrice <= 0) {
            document.getElementById("item_price_error1").style.display = "block"
            document.getElementById("item_price_error").style.display = "none"
            ref11.current?.scrollIntoView({ behavior: 'smooth' });
            return false;
        }
        else {
            document.getElementById("item_price_error").style.display = "none"
            document.getElementById("item_price_error1").style.display = "none"
        }

        const data1 = { name, description, keyfeature_filteredVal, thumbnail, mainFile, themePreviewImages, demoURL, tags, purchasePrice }
        console.log("data1", data1)
        setLoader(true)
        var element = document.body
        element.style.overflowY = "hidden"

        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }
        console.log("config", config)

        const data = new FormData();
        data.append("product_name", name)
        data.append("product_description", description)
        data.append("key_features", keyfeature_filteredVal)
        if (thumbnail) {
            data.append("thumbnail", thumbnail)
        }

        if (mainFile) {
            data.append("main_file", mainFile)
        }
        if (themePreviewImages) {
            for (let i = 0; i < themePreviewImages.length; i++) {
                data.append("theme_images", themePreviewImages[i])
            }
        }


        data.append("product_category", category)
        data.append("competible_browser", compatibleBrowser)
        data.append("competible_With", compatibleWith)
        data.append("framework", framework)
        data.append("themeforest_files_included", fileIncluded)
        data.append("layout", layout)
        if (demoURL) {
            data.append("demo_url", demoURL)
        }

        data.append("tag", tags)
        data.append("product_price", purchasePrice)


        await axios.post(`${process.env.REACT_APP_BASE_URL}/get-product/put-prodctupdate/${pId}/`, data, config)
            .then((res) => {
                console.log("post data res", res);
                if (res) {
                    setLoader(false)
                    element.style.overflowY = "auto"
                    toast.success('Product Updated Successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setTimeout(() => {
                        navigate("/author_dashboard")
                    }, 3000)
                }

            })
            .catch((err) => {
                console.log("post data error", err);
            })
    }


    const removeThemePrevImg = (e_id) => {
        console.log("e image id", e_id)
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.delete(`${process.env.REACT_APP_BASE_URL}/get-product/delete-preview/${e_id}/`, config)
            .then((res) => {
                console.log("deleter res", res)
                if (res) {
                    props.setStateUpdate(!props.stateUpdate)
                }
            })
            .catch((err) => {
                console.log("delete err", err)
            })
        // setEditThemePrev()
    }

    return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            <div className="checklist">
                <h3 className="title">Hi! Before you upload to MarketPlace for the first time.</h3>
                <div className="text">Here's a checklist to get you ready to upload:</div>
                <ol className='checklist_number'>
                    <li>Read the standards and requirements for the item(s) you want to sell on <a href="#">MarketPlace</a>.</li>
                    <li>Make sure your files, supporting information and assets are all organised and <a href="#">ready for upload</a>.</li>
                    <li>Follow our <a href="#">upload instructions</a> to make sure it all goes smoothly.</li>
                    <li>Before your item can be approved for sale you will be asked to complete an Author ID check. You can read more about this <a href="#">here</a>.</li>
                </ol>

            </div>

            <div className="name_description">
                <h3 className='title'>Name & Description</h3>
                <div className="input_fields">
                    <Row>
                        <Col lg={6}>
                            <div className='pe-2'>
                                <Row>
                                    <Col lg={3}>
                                        <label htmlFor="name">Name</label>
                                    </Col>
                                    <Col lg={9}>
                                        <input type="text" ref={ref} className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                                        <p id="nameError">Maximum 100 characters. No HTML or emoji allowed. Follow our <a href='#'>Item Title Naming Conventions</a>.</p>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col lg={3}>
                                        <label htmlFor="name">Key Features</label>
                                    </Col>
                                    <Col lg={9}>

                                        {keyFeatureFields.map((e, i) => {
                                            return (

                                                <div className='key_feature_fields mb-2' key={i}>
                                                    <div style={{ width: "100%" }}>
                                                        <input type="text" ref={ref2} name="key_feature" className='form-control' value={e.key_feature} onChange={(e) => handleKeyFeatureChange(e, i)} />
                                                        {(keyFeatureFields.length - 1 === i && keyFeatureFields.length < 10) &&
                                                            <button className='primary_btn mt-2' onClick={addMoreKeyFeature}>Add more</button>
                                                        }
                                                    </div>
                                                    {keyFeatureFields.length > 1 &&
                                                        <button className='secondary_btn' onClick={() => removeKeyFeature(i)}>x</button>
                                                    }
                                                </div>


                                            )
                                        })}

                                        <p id='keyFeature_error' className='error_class'>Key Feature is required</p>
                                        <p id='keyFeature_error_atleastThree' className='error_class'>Key Features should be more than 2 or less than 10. </p>
                                        <p>Highlight what makes your item unique or a key selling point. Max 45 characters per line.</p>
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='ps-2'>
                                <Row>
                                    <Col lg={3}>
                                        <label htmlFor="description">Description</label>
                                    </Col>
                                    <Col lg={9}>
                                        <textarea className='form-control' ref={ref1} rows="7" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                        <p id='desError'>HTML or plain text allowed, no emoji</p>
                                        {/* <p id='desError'>This field is used for search, so please be descriptive! If you're linking to external images, please mind the page load speed: use few, compress them and host them on a fast server or CDN.</p> */}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className="supporting_item">
                <h3 className="title">Supporting your item</h3>
                <p>You have not chosen a support preference for your items. Buyers will see your item as not-supported. To change your support settings <a href="#">go to your item support settings</a>.</p>
            </div>

            <div className="files">
                <h3 className="title">Files</h3>
                {
                    mainFilePrev ?
                        <Row>
                            <Col lg={7}>
                                <div className="uploaded_img_div">
                                    <h6>Source code zip name</h6>
                                    <div className="img_item">

                                        <div className="img_info">
                                            <div className="status">Saved</div>
                                            <div className="img_name">{mainFilePrev}</div>
                                        </div>
                                        <div className="remove_img">
                                            <button className='remove_btn' onClick={removeMainFile}>Remove &nbsp;&nbsp;<FaTimes /></button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        :
                        srcFile ?
                            <Row>
                                <Col lg={7}>
                                    <div className="uploaded_img_div">
                                        <h6>Source code zip name</h6>
                                        <div className="img_item">

                                            <div className="img_info">
                                                <div className="status">Saved</div>
                                                <div className="img_name">{srcFile}</div>
                                            </div>
                                            <div className="remove_img">
                                                <button className='remove_btn' onClick={removeMainFile}>Remove &nbsp;&nbsp;<FaTimes /></button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            :
                            ""

                }


                <Row>
                    <Col lg={6}>

                        <div className="thumbnail mt-3">
                            <label htmlFor="">Source Code Zip</label>
                            <input type="file" className="form-control" id="main_file" ref={ref3} onChange={handleSoureCodeZip} accept=".zip,.rar" style={{ display: "block" }} />
                            <p id='zipFile_error' className='error_class'>Zip file is required.</p>
                            <p className='pt-2'>ZIP - All files for buyers, not including preview images</p>
                        </div>

                        <div className="thumbnail mt-3">
                            <label htmlFor="">Thumbnail</label>
                            <input type="file" className="form-control" ref={ref4} id="thumbnail_file" onChange={handleThumbnail} accept=".jpg,.png,.jpeg" style={{ display: "block" }} />
                            <p className='pt-2' id="thumbnail_error">JPEG, JPG or PNG Thumbnail</p>
                            {
                                thumbnailPrev ?
                                    <div className="thumbnailPrev_img mt-3">
                                        <img src={thumbnailPrev} className="img-fluid" style={{ height: "100%", backgroundColor: "#e6e6e6" }} />
                                        <div className='close_icon' onClick={removeThumbnail}><GrFormClose /></div>
                                    </div>
                                    :
                                    editThumbnailPrev ?
                                        <div className="thumbnailPrev_img mt-3">
                                            <img src={editThumbnailPrev} className="img-fluid" style={{ height: "100%", backgroundColor: "#e6e6e6" }} />
                                            <div className='close_icon' onClick={removeThumbnail}><GrFormClose /></div>
                                        </div>
                                        :
                                        ""
                            }

                        </div>


                    </Col>
                    <Col lg={6}>
                        <div className="left">

                            <div className="thumbnail theme_preview mt-3">
                                <label htmlFor="">Theme Preview Images</label>
                                <input type="file" ref={ref5} className="form-control" multiple id="theme_file" onChange={handleTehmePreviewUplaod} accept=".jpg,.png,.jpeg" />
                                <p className='pt-2' id="themePreviewError">Choose images (png/jpg)</p>
                                <p id='theme_error_atLeastfive' className='error_class'>Uplaod theme images more than 4</p>
                            </div>
                            <div className='themePreview_images'>
                                {prev.map((e, i) => {

                                    return (
                                        <div className='remove_theme_img' key={i}>
                                            <div className='preview_img'>
                                                <img src={e} className="img-fluid" />
                                            </div>
                                            <div className='close_icon' onClick={() => removeThemeImg(i)}><GrFormClose /></div>
                                        </div>
                                    )
                                })}
                                {editThemePrev.map((e, i) => {
                                    return (
                                        <div className='remove_theme_img' key={i}>
                                            <div className='preview_img'>
                                                <img src={`${process.env.REACT_APP_BASE_URL}${e.theme_images}`} className="img-fluid" />
                                            </div>
                                            <div className='close_icon' onClick={() => removeThemePrevImg(e.id)}><GrFormClose /></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="category_attributes">
                <h3 className="title">Category & Attributes</h3>
                <Row>
                    <Col lg={7}>
                        <div className="categories">
                            <Row>
                                <Col lg={4}>
                                    <label htmlFor="">Category</label>
                                </Col>
                                <Col lg={8}>
                                    <select name="category" id="category" className='form-select' value={category} onChange={handleCategoryChange} disabled style={{ cursor: "auto" }}>
                                        {
                                            allCategory.length > 0 ? allCategory.map((e, i) => {

                                                if (getSwitchedCategory === "") {
                                                    if (e.category === editCategory) {
                                                        return (
                                                            e.category_list.map((e, i) => {
                                                                return (
                                                                    <option value={e.id} key={i}> - {e.subcategory}</option>
                                                                )
                                                            })

                                                        )
                                                    }
                                                } else {
                                                    if (e.category === getSwitchedCategory) {
                                                        return (
                                                            e.category_list.map((e, i) => {
                                                                return (
                                                                    <option value={e.id} key={i}> - {e.subcategory}</option>
                                                                )
                                                            })

                                                        )
                                                    }
                                                }
                                            })
                                                :
                                                " "
                                        }

                                    </select>
                                    <p id='category_error' className='error_class'>Select Category</p>
                                </Col>
                            </Row>

                            {
                                getCategoryBrowsers === null ?
                                    <div></div>
                                    :

                                    (getCategoryBrowsers.competible_browser.length !== 0
                                        ?
                                        <Row className='mt-4'>
                                            <Col lg={4}>
                                                <label htmlFor="">Compatible Browsers</label>
                                            </Col>
                                            <Col lg={8}>
                                                <select className="form-select" multiple={true} aria-label="multiple select example" onChange={handleCompatibleBrowser} disabled style={{ cursor: "auto" }}>
                                                    {getCategoryBrowsers.competible_browser.map((e, index) => {
                                                        // console.log("e.match(newData)", e);
                                                        return (
                                                            <option value={e} key={index} selected={compatibleBrowser.includes(e) ? true : false}>{e}</option>
                                                        )
                                                    })}
                                                </select>
                                                <p id='compatibleBrowser_error' className='error_class'>Select Browsers</p>
                                            </Col>
                                        </Row>
                                        :
                                        <div></div>
                                    )


                            }
                            {
                                getCategoryBrowsers === null ?

                                    <div></div>
                                    :
                                    (
                                        getCategoryBrowsers.competible_With.length !== 0
                                            ?
                                            <Row className='mt-4'>
                                                <Col lg={4}>
                                                    <label htmlFor="">Compatible With</label>
                                                </Col>
                                                <Col lg={8}>
                                                    <label>
                                                        <input type="checkbox" onClick={onCompatibleCheckboxClick} /> N/A
                                                    </label>
                                                    <select className="form-select mt-1" multiple aria-label="multiple select example" onChange={handleCompatibleWith} disabled style={{ cursor: "auto" }}>
                                                        {getCategoryBrowsers.competible_With.map((e, i) => {
                                                            return (
                                                                <option value={e} key={i} selected={compatibleWith.includes(e) ? true : false}>{e}</option>
                                                            )
                                                        })}

                                                    </select>
                                                </Col>
                                            </Row>
                                            :
                                            <div></div>
                                    )
                            }


                            {
                                getCategoryBrowsers === null ?
                                    <div></div>
                                    :
                                    (
                                        getCategoryBrowsers.category_framework.length !== 0 ?
                                            <Row className='mt-4'>
                                                <Col lg={4}>
                                                    <label htmlFor="">Framework</label>
                                                </Col>
                                                <Col lg={8}>
                                                    <label>
                                                        <input type="checkbox" onClick={onFrameworkCheckboxClick} /> N/A
                                                    </label>
                                                    <select className="form-select mt-1" multiple aria-label="multiple select example" onChange={handleFramework} disabled style={{ cursor: "auto" }}>
                                                        {getCategoryBrowsers.category_framework.map((e, index) => {
                                                            return (
                                                                <option value={e} key={index} selected={framework.includes(e) ? true : false}>{e}</option>
                                                            )
                                                        })}

                                                    </select>
                                                </Col>
                                            </Row>
                                            :
                                            <div></div>
                                    )
                            }


                            {
                                getCategoryBrowsers === null ?
                                    <div></div>
                                    :
                                    (
                                        getCategoryBrowsers.themeforest_files_included.length !== 0 ?
                                            <Row className='mt-4'>
                                                <Col lg={4}>
                                                    <label htmlFor="">ThemeForest Files Included</label>
                                                </Col>
                                                <Col lg={8}>
                                                    <select className="form-select" multiple aria-label="multiple select example" onChange={handleFilesIncluded} disabled style={{ cursor: "auto" }}>
                                                        {getCategoryBrowsers.themeforest_files_included.map((e, index) => {
                                                            return (
                                                                <option value={e} key={index} selected={fileIncluded.includes(e) ? true : false} >{e}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </Col>
                                            </Row>
                                            :
                                            ""
                                    )

                            }

                            <Row className='mt-4'>
                                <Col lg={4}>
                                    <label htmlFor="">Layout</label>
                                </Col>
                                <Col lg={8}>
                                    <select name="category" ref={ref9} id="category" value={layout} className='form-select' onChange={(e) => setLayout(e.target.value)}>
                                        <option value="Liquid">Liquid</option>
                                        <option value="Responsive">Responsive</option>
                                        <option value="N/A">N/A</option>
                                    </select>
                                    <p id='layout_error' className='error_class'>Select Layout Type</p>
                                    <small>Does this layout stretch when resized horizontally (liquid)? Or does it stay the same (fixed)?</small>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col lg={4}>
                                    <label htmlFor="">Demo URL</label>
                                </Col>
                                <Col lg={8}>
                                    <input type="url" ref={ref12} className='form-control' value={demoURL} onChange={(e) => setDemoURL(e.target.value)} />
                                    <small>Link to a live preview on your own hosting (i.e. https://my-site.com/demo/).</small>
                                    <p id='url_error' className='error_class'>Invalid url</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                </Row>
            </div>

            <div className="tags">
                <h3 className="title">Tags</h3>
                <Row className='mt-3'>
                    <Col lg={2}>
                        <label htmlFor="">Tags</label>
                    </Col>
                    <Col lg={10}>
                        <textarea className='form-control' value={tags} ref={ref10} rows="6" onChange={(e) => setTags(e.target.value)}></textarea>
                        <p className='pt-2' id="tags_error">Maximum of 15 keywords covering features, usage, and styling. Keywords should all be in lowercase and separated by commas. e.g. photography, gallery, modern, jquery, wordpress theme</p>
                    </Col>
                </Row>
            </div>

            <div className="set_price">
                <h3 className="title">Set Your Price ($)</h3>
                <p>It's important that you set the price for your items independently and not discuss your pricing decisions with other authors. The item price will include your author fee and your initial term of item support (if you offer it). See our <a href="#">Author Terms</a> and <a href="#">Item Support</a> breakdown if you want to know more.</p>
                <hr />
                <div className="regular_license">
                    <Row className='align-items-center'>
                        <Col lg={4}>
                            <label>Regular License</label>
                        </Col>

                        <Col lg={5}>
                            <div className="price_div">
                                <div style={{ marginTop: "37px" }}>$</div>
                                <div className="item_price">
                                    <div className="head">Item price <span><BsFillQuestionCircleFill /></span></div>
                                    <input type="number" ref={ref11} value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                                    <p className='error_class' id="item_price_error">Required</p>
                                    <p className='error_class' id="item_price_error1">Price should be more than $0</p>
                                </div>
                                <div style={{ marginTop: "37px" }}>+</div>
                                <div className="buyer_fee">
                                    <div className="head">Buyer fee</div>
                                    <div className="">${buyerFee}</div>
                                </div>
                                <div style={{ marginTop: "37px" }}>=</div>
                                <div className="purchase_price">
                                    <div className="head">Purchase price</div>
                                    <div className="price">${purchasePrice}</div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={3}>
                            <div className="recommended_puchase_div d-flex justify-content-end">
                                Recommended <br></br>
                                purchase price <br></br>
                                $44 - $59
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>

            <div className="message_reviewer">
                <h3 className="title">How to Setup</h3>
                <Row className='mt-3'>
                    <Col lg={12}>

                    </Col>
                </Row>

                <div className="upload_btn d-flex justify-content-end mt-4">
                    <button className='secondary_btn' onClick={() => editProductData(productId)}>Upload <FaCloudUploadAlt className='upload_icon' /></button>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

