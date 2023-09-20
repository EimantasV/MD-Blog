import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
const Form = () => {
    const [data, setData] = useState(false);
    const params = useParams();

    useEffect(() => {
        console.log(params);


        axios.get(`/api/md/${params.id}`, 
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
            console.error('Failed getting post! :(');
            setData(false);
        });


    }, [])


    if(!data)
    {
        return <div><h1>404</h1></div>
    }

    return (
        <div>
            <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
    );
};

export default Form;