import React from 'react'
import { useState, useEffect } from 'react'
import Map from './Map'
import ReviewForm from './ReviewForm'


export default function Info(props) {

    //Restaurant info
    const [restoObj, setRestoObj] = useState({})



    //Fetch Json Info and feed into States
    useEffect(() => {
        fetch(`/api/${props.match.params.place}`)
            .then((res) => res.json())
            .then((placeObj) => {
                //Guard clause to avoid infinite loops => doesn't really work well
                if (placeObj.name !== restoObj.name || props.match.params.place !== restoObj.id) {
                    console.log("In Fetch")
                    //Safe object with current page info
                    setRestoObj(placeObj)
                }
            })
    })


    let reviews = ["No reviews yet..."]

    if (restoObj.reviews){
        reviews = restoObj.reviews;
    }

    console.log("REF: reviews: ", reviews)
    //Restaurant page with map and specific info
    return (
        <div id="resto-page">
            <div id="map">
                <Map location={restoObj.id} />
            </div>
            <div id="resto-info">
                <h2><span className="highlight">{restoObj.name}</span> Info</h2>
                <h4><span className="highlight">Name:</span> {restoObj.name}</h4>
                <h4><span className="highlight">Address:</span> {restoObj.address}</h4>
                <h4><span className="highlight">Phone:</span> {restoObj.phoneNumber}</h4>
                <h4><span className="highlight">Hours:</span> {restoObj.hour}</h4>
                <p><span className="highlight">Description:</span>  {restoObj.description}</p>
                <h4><span className="highlight">Reviews:</span></h4>
                <div>
                    {reviews.map((obj) => {
                        return (
                        <div>- {obj}</div>
                        )
                    })}
                </div>



            </div>
        </div>

    )
}
