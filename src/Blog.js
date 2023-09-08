import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
const Form = () => {
    const [data, setData] = useState({});
    const params = useParams();
    useEffect(async () => {

        try {

            const response = await fetch(`/api/md/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle success (e.g., show a success message)
                // setSubmitted(true);


                // console.log(response);
                const re = await response.json();
                // console.log(re);
                setData(re);
            } else {
                // Handle errors (e.g., show an error message)
                console.error('Failed getting post! :(');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }, [])




    return (
        <div>
            <h1>gsgds</h1>
        <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  );
};

export default Form;