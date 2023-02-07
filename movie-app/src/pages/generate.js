import axios from "axios";
import {useState} from "react";

function Generate ()
{
    return (
            <div class="container mt-5 text-center" style={{width: "50%"}} >
                <h1>Generate Matrix</h1>
                <div class="row">
                    <button class="btn btn-primary mr-5">Cosine Matrix</button>
                    <button class="btn btn-primary mr-5">Pearson Matrix</button>
                    <button class="btn btn-primary ml-5">Jaccard Matrix</button>
                </div>
            </div>
    )
}

export default Generate;