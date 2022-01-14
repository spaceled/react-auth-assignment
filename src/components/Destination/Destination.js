import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Data from '../../fakeData/fakeData.js';
import './Destination.css';

const Destination = (props) => {
    const [isSearch, setIsSearch] = useState(false);
    const [searchResult, setSearchResult] = useState({});
    const [rideData, setRideData] = useState([]);

    const rideName = props.params;



    useEffect(() => {
        setRideData(Data.filter(ride => ride.name === rideName))
    }, [rideName])


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const newSearchResult = {
            pickFrom: data.pickFrom,
            pickTo: data.pickTo
        }
        setSearchResult(newSearchResult)
        setIsSearch(true)
    }
    return (
        <section className="container pt-4 mt-3 border-top">
            <div className="row">
                {
                    rideData ?
                        <div className="col-md-3">
                            {
                                !isSearch ?
                                    <div className="search-box">
                                        <form onSubmit={handleSubmit(onSubmit)} className="pickup-form rounded p-3">

                                            <label htmlFor="pickFrom" className="mb-0">Pick From</label>
                                            <input  {...register("pickFrom", { required: true })} className="d-block m-0 w-100 rounded border-0 py-1 px-2" />
                                            {errors.pickFrom && <span className="error">Input Your Place Name </span>}

                                            <label htmlFor="pickTo" className="mb-0">Pick To</label>
                                            <input  {...register("pickTo", { required: true })} className="d-block m-0 w-100 rounded border-0 py-1 px-2" />
                                            {errors.pickTo && <span className="error">Input where you want to go</span>}


                                            <input type="submit" value="Search" className="d-block w-100 btn btn-danger mt-3" />
                                        </form>
                                    </div>
                                    :
                                    <div className="searchResult">
                                        <h5 className="bg-danger text-white p-3 rounded">From : {searchResult.pickFrom} <br /> To : {searchResult.pickTo}</h5>

                                        {
                                            rideData.map(({ name, image }) => (<div className="searchResultCard d-flex justify-content-around rounded py-3 px-2 mb-2">
                                                {rideData && <img className="w-25" src={image} alt={name} />}
                                                <h4> 4</h4>
                                                <h4>$69</h4>
                                            </div>))
                                        }
                                        {
                                            rideData.map(({ name, image }) => (<div className="searchResultCard d-flex justify-content-around rounded py-3 px-2 mb-2">
                                                {rideData && <img className="w-25" src={image} alt={name} />}
                                                <h4> 4</h4>
                                                <h4>$69</h4>
                                            </div>))
                                        }
                                        {
                                            rideData.map(({ name, image }) => (<div className="searchResultCard d-flex justify-content-around rounded py-3 px-2 mb-2">
                                                {rideData && <img className="w-25" src={image} alt={name} />}
                                                <h4> 4</h4>
                                                <h4>$69</h4>
                                            </div>))
                                        }

                                        <button className="btn btn-danger" onClick={() => setIsSearch(false)}>Clear Result</button>
                                    </div>
                            }
                        </div>
                        :
                        <div className="col-md-3">
                            <h5 className="bg-danger p-3 text-white rounded">You did not select any ride, so you can not search for a location or rent a ride. For location search or ride booking you have to come to this page after selecting any ride on the home page.</h5>
                            <Link to="/" className="btn btn-danger mt-2">Go To Home</Link>
                        </div>
                }


                <div className="col-md-8 map">
                    {/* <Map/> */}
                </div>

            </div>
        </section>
    );
};

export default Destination;