import React from 'react'
import { useState, useEffect } from 'react'
import Map from './Map'
import ReviewForm from './ReviewForm'


export default function Info(props) {

    //Restaurant info
    const [restoObj, setRestoObj] = useState({})
    const [id, setId] = useState()
    const [place, setPlace] = useState("Name not Found")
    const [address, setAddress] = useState("Address not Found")
    const [number, setNumber] = useState("Number not Found")
    const [hours, setHours] = useState("Hours not Found")
    const [description, setDescription] = useState([])
    const [reviews, setReviews] = useState([])

    //Fetch Json Info and feed into States
    useEffect(() => {
        fetch(`/api/${props.match.params.place}`)
            .then((res) => res.json())
            .then((placeObj) => {
                //Guard clause to avoid infinite loops => doesn't really work well
                if (placeObj.name !== restoObj.name || props.match.params.place !== id) {
                    console.log("In Fetch")
                    //Safe object with current page info
                    setRestoObj(placeObj)

                    setId(placeObj.id)
                    setPlace(placeObj.name);
                    setAddress(placeObj.address);
                    setNumber(placeObj.phoneNumber);
                    setHours(placeObj.hours);
                    setDescription(placeObj.description);
                    setReviews(placeObj.reviews)
                    console.log(placeObj.description)
                }
            })
    })



    //Restaurant page with map and specific info
    return (
        <div id="resto-page">
            <div id="map">
                <Map location={id} />
            </div>
            <div id="resto-info">
                <h2><span className="highlight">{place}</span> Info</h2>
                <h4><span className="highlight">Name:</span> {place}</h4>
                <h4><span className="highlight">Address:</span> {address}</h4>
                <h4><span className="highlight">Phone:</span> {number}</h4>
                <h4><span className="highlight">Hours:</span> {hours}</h4>
                <p><span className="highlight">Description:</span>  {description}</p>
                <ul><span className="highlight">Reviews:</span>{reviews}</ul>

                {/* Add form form review (still in progress)
                <ReviewForm /> */}

            </div>
        </div>

    )
}
