import React from 'react';
import { connect } from 'react-redux';

const Restaurants = ({ restaurants }) => {
    return (
        <main>
            <div>
                <div >
                    <h1>
                        Our Restaurants ({restaurants.length})
                    </h1>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        <div>
                            <h5>Total Restaurants:</h5>
                            View All <br />
                        </div>
                    </div>
                    
                    {/* Restaurant Listing Begins Here*/}
                    <div>
                        <div>
                                {
                                    restaurants.map( restaurant => {
                                        return (
                                            <div key={restaurant.id}>
                                                <div>
                                                    <div>
                                                            <p>{ restaurant.name }</p>
                                                            <p>${ restaurant.description }</p>   
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.restaurants
    }
};

export default connect(mapStateToProps, null)(Restaurants);