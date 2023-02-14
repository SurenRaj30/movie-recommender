import React, {useState} from 'react';

function FavoriteTablePagination({ data, pageLimit, dataLimit }) {
    
    //get jwt token stored in local storage
    const jwt = localStorage.getItem('jwt');
    //get user id from local storage
    const id = Number(localStorage.getItem('id'));

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

    //for delete function
   function removeFromFavorite(movieid) {

        const url = `http://localhost:8080/api/v1/user/removeFav/${movieid}/${id}`

        fetch(url, {
          method: "POST",
          headers: {
              'Authorization':'Bearer '+jwt,
              'Content-Type':'application/json'
          },
      })
      .then((response) => {
          if (response.status === 200) {
              //alerts user if removing movie from favorite was succesful
              alert("Favorite movie is removed")
              window.location.href = "/movie-favs";
          } else {
              //alerts if have any network error during post
              throw new Error("Error. Please Try Again");
          }
      })
      .catch((message) => {alert(message)})



   }
  
    return (
        <div>
    
        {/* show the posts, 10 movies at a time */}
            
            <table className='table table-bordered shadow'>
                <thead className='thead-dark'>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genres</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {getPaginatedData().map((data, idx) => (
                    <tr key={idx}>
                        <td>{data.title}</td>
                        <td>{data.genres}</td>
                        <td><button className='btn btn-danger' onClick={() => removeFromFavorite(data.favmovieid)}>Remove</button></td>
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

export default FavoriteTablePagination;