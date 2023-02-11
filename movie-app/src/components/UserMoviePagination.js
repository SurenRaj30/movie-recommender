import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function UserMoviePagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    //increments current page by calling setCurrentPage
    function goToNextPage() {
       setCurrentPage((page) => page + 1);
    }
  
    //decrements current page by calling setPreviousPage
    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }
  
    //changes the page based on any number of page clicked by the user
    function changePage(event) {
        //takes the text content of the paginate html tag
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
  
    //returns number of movies equal to the data limit (50)
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };
  
    //show group of page numbers in the pagination
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
  
    return (
        <div>
    
        {/* show the posts, 50 movies at a time */}
        <div className="dataContainer">
            <div className='row'>
                    {getPaginatedData().map((d, idx) => (
                    <div className='col'>
                        <RenderComponent key={idx} data={d} />
                    </div>
                ))}
            </div>
        </div>
    
        {/* show the pagination
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
        <div className="pagination">
          {/* previous button */}
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            Prev
          </button>
    
          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
              <span>{item}</span>
            </button>
          ))}
    
          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    );
}

export default UserMoviePagination;