import React, {useState} from 'react';

function ATMPagination({ data, pageLimit, dataLimit }) {
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
    
        {/* show the posts, 10 movies at a time */}
            <table className='table table-bordered shadow'>
                <thead className='thead-dark'>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Genres</th>
                </tr>
                </thead>
                <tbody>
                {getPaginatedData().map((d, idx) => (
                    <tr key={idx}>
                        <td>{d.movieid}</td>
                        <td>{d.title}</td>
                        <td>{d.genres}</td>
                    </tr>
                 ))}
                </tbody>
            </table>
           
    
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

export default ATMPagination;