import { useState, useEffect } from "react";

function ReviewForm() {
    //State store for directory.json data
    const [stopLoop, setStopLoop] = useState(true);
    const [restoData, setRestoData] = useState([]);


    useEffect(() => {
        if (stopLoop) {
            fetch("/api/directory")
                .then((res) => res.json())
                .then((list) => {
                    setRestoData(list);
                });
        }
        setStopLoop(false);
    });

    return (
        <div>
            <form method="POST" action='/submit-review'>
                <select name="pick-resto" id="pick-resto">
                    {restoData.map((obj) => {
                        return(
                            <option value={obj.id}>{obj.name}</option>
                        )
                    })}
                </select>
                <input type="text" name="review" placeholder="Type your review here."></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default ReviewForm