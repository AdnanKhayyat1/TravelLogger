import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './API';
const LogEntryForm = ({ location, onClose }) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try{
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose(); // passed in prop that removes all addEntryForms and refreshes the marker list
        } catch(error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            { error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="apiKey">API Key</label>
            <input name="apiKey" type="password" required {...register("apiKey")} />
            <label htmlFor="title">Title</label>
            <input name="title" required {...register("title")} />
            <label htmlFor="comment">Comments</label>
            <textarea name="comment" rows={3} {...register("comment")} ></textarea>
            <label htmlFor="rating">Rating</label>
            <input name="rating" type="range" min="0" max="10" {...register("rating")}></input>
            <label htmlFor="image">Image</label>
            <input name="image" {...register("image")}/>
            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" required {...register("visitDate")} />
            <button disabled={loading}>{loading ? 'Loading...' : 'Add destination'}</button>
        </form>
    );
};

export default LogEntryForm;