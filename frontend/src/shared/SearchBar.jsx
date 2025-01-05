import React, { useState, useRef } from 'react';
import '../styles/search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';  // Import the navigation hook

const SearchBar = () => {
  // State for dynamic price range
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default range from 0 to 1000
  const [tourType, setTourType] = useState(''); // Tour Type (Beach, Adventure, etc.)

  // Form input refs
  const locationRef = useRef('');
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);

  const navigate = useNavigate(); // Using useNavigate for navigation

  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const newPriceRange = [...priceRange];
    newPriceRange[e.target.name === 'min' ? 0 : 1] = e.target.value;
    setPriceRange(newPriceRange);
  };

  // Handle tour type change
  const handleTourTypeChange = (e) => {
    setTourType(e.target.value);
  };

  // Search handler function
  const searchHandler = () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    // Construct query parameters based on user input
    const queryParams = new URLSearchParams();

    if (location) queryParams.append('city', location);
    if (distance) queryParams.append('distance', distance);
    if (maxGroupSize) queryParams.append('maxGroupSize', maxGroupSize);
    if (priceRange) queryParams.append('priceRange', `${priceRange[0]} - ${priceRange[1]}`);
    if (tourType) queryParams.append('tourType', tourType);

    // Construct the URL with query params
    const url = `/api/v1/search/getTourBySearch?${queryParams.toString()}`;

    // Fetch the search results from the backend
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Tours found:', data.data); // Log the results to the console
          // You can store the data in a state or navigate to a results page
          navigate('/search-results', { state: { tours: data.data } }); // Pass search results to the next page
        } else {
          console.error(data.message); // Handle no results found
        }
      })
      .catch((error) => {
        console.error('Error fetching tours:', error); // Handle fetch error
      });
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          {/* Location Field */}
          <FormGroup className="form__group form__group-fast">
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>

          {/* Distance Field */}
          <FormGroup className="form__group form__group-fast">
            <span><i className="ri-map-pin-time-line"></i></span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance (km)"
                ref={distanceRef}
              />
            </div>
          </FormGroup>

          {/* Max People Field */}
          <FormGroup className="form__group form__group-fast">
            <span><i className="ri-group-line"></i></span>
            <div>
              <h6>Max People</h6>
              <input
                type="number"
                placeholder="0"
                ref={maxGroupSizeRef}
              />
            </div>
          </FormGroup>

          {/* Price Range Field */}
          <FormGroup className="form__group">
            <span><i className="ri-money-dollar-circle-line"></i></span>
            <div>
              <h6>Price Range</h6>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[0]}
                name="min"
                onChange={handlePriceRangeChange}  // Function defined here
              />
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                name="max"
                onChange={handlePriceRangeChange}  // Function defined here
              />
              <div className="price-range-text">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </FormGroup>

          {/* Tour Type Dropdown */}
          <FormGroup className="form__group">
            <span><i className="ri-map-pin-time-line"></i></span>
            <div>
              <h6>Tour Type</h6>
              <select
                value={tourType}
                onChange={handleTourTypeChange}  // Function defined here
                className="tour-type-dropdown"
              >
                <option value="">Select Type</option>
                <option value="Beach">Beach</option>
                <option value="Adventure">Adventure</option>
                <option value="City">City</option>
                <option value="Cultural">Cultural</option>
                <option value="Nature">Nature</option>
              </select>
            </div>
          </FormGroup>

          {/* Search Button Icon */}
          <button className="search__icon" type="button" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
