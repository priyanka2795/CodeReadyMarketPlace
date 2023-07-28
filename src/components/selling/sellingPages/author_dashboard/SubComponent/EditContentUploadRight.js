import React, {useState, useEffect} from 'react'
import {ImArrowRight} from 'react-icons/im'
import {useSelector, useDispatch} from 'react-redux'
import {setSwitchCategory} from '../../../../../redux/reducers/reducer'

export const EditContentUploadRight = (props) => {
    const getEditableData = props.editableData

  const dispatch = useDispatch()
    // const sellCategory = useSelector((state) => state.addProduct.sellerCategory);
    const allCategory = useSelector((state)=> state.addProduct.mainCategoryArray)
    const [category, setCategory] = useState("")

    const handleSwitchCategory = ()=>{
        dispatch(setSwitchCategory(category))
    }

    useEffect(()=>{
        if(getEditableData){
            setCategory(getEditableData.product_category_name)
        }
    }, [getEditableData])


  return (
    <>
            <div className="category">
                <div className="title">Select a category for your upload:</div>
                <div className="upload_item_div">
                    <p><strong>Need help selecting a category?</strong></p>
                    <p className='pt-2'>A great way to start is by browsing through our categories to see what other authors are selling.</p>
                    <hr />
                    <div className="select_category">
                        <select className='form-select' value={category}  onChange={(e)=>setCategory(e.target.value)} disabled style={{cursor:"auto"}}>
                            {/* {sellCategory !== " " ? <option value="">Select a category</option> : ""} */}
                            {allCategory && allCategory.map((e,i)=>{
                                return(
                                    <option value={e.category} key={i}>{e.category}</option>
                                )
                            })}
                           
                        </select>
                        <button className='primary_btn' onClick={handleSwitchCategory} disabled>Switch Category &nbsp;&nbsp;&nbsp;<ImArrowRight/></button>
                    </div>
                </div>
            </div>

            <div className="item_accepted">
                <div className="title">Get your item accepted</div>
                <div className="text">
                    <p>To give your item the best chance possible to be accepted, please make sure you've:</p>
                    <ul>
                        <li>Read and follow the <a href="#">upload instructions</a>.</li>
                        <li>Added useful tags and ensured they're spelled correctly (this helps buyers find your file).</li>
                        <li>Added a thorough and useful item description (this also helps buyers find your file).</li>
                    </ul>
                    <p>If you've done all that, you're ready to upload. Thanks for selling with MarketPlace!</p>
                </div>
            </div>

            <div className="trouble_uploading">
                <div className="title">Trouble Uploading?</div>
                <div className="text">Some users have experienced problems uploading. We've compiled a <a href='#'>list of things to check first</a> which might be of help. We're always working on improving our uploading infrastructure - but if you continue to experience problems please contact support.</div>
            </div>

            <div className="corrupt_zipFiles">
                <div className="title">Corrupt Zip Files</div>
                <div className="text">
                    <p>The following archive utilities have been found to generate non-standard zip files that our server is often unable to decompress:</p>
                    <ul>
                        <li>7zip</li>
                        <li>lzarc</li>
                        <li>WinZip (Latest version)</li>
                    </ul>
                    <p>Please use another archive utility to reduce the chance of problems with your uploads.</p>
                </div>
            </div>
        </>
  )
}
