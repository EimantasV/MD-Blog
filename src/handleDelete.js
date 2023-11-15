export default handleDelete = async (id) => {


    axios.delete('/api/delete-post',
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'id':id
      },
    })
    
    .then(response=>{
      console.log(response);
      setRefresh(!refresh);
      // navigate(`/myposts`);
    })
    
    .catch(error=>{
      console.error('Error:', error);
    })


  };