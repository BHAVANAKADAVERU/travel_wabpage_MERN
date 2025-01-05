import React, { useEffect, useState } from 'react';
import CommonSection from '../shared/CommonSection';
import "../styles/tour.css";

import { Col, Container, Row } from 'reactstrap';
import SearchBar from '../shared/SearchBar';
import TourCard from '../shared/TourCard';
import Newsletter from '../shared/Newsletter';

import useFetch from '../hooks/useFetch'; // Ensure this is the custom hook you created for fetching data
import { BASE_URL } from '../utils/config'; // Ensure BASE_URL points to your backend

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);  // Total number of pages for pagination
  const [page, setPage] = useState(0);  // Current page number

  // Fetch tours data
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  
  // Fetch the total count of tours to calculate pageCount
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    // Calculate the total number of pages
    if (tourCount) {
      const pages = Math.ceil(tourCount / 8);  // Assuming 8 tours per page
      setPageCount(pages);
    }
    window.scrollTo(0, 0);  // Scroll to the top when page changes
  }, [page, tourCount]);  // Trigger when page or tourCount changes

  return (
    <>
      <CommonSection title={"All Tours"} />
      
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading.....</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? 'active__page' : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
}

export default Tours;
