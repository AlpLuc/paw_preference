import { useState, useEffect } from 'react';
import {catApi} from '../services/catAPI.ts';
import {type Cat} from '../types/index.ts';

function isError(err: unknown): err is Error {
    return err instanceof Error;
}


export function useCats(tags: string[]){
    const[cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchCats = async() => {
        try{
            setLoading(true);
            setError('');
            const cats: Cat[] = await catApi.getCatJson(tags);
            setCats(cats);
        } catch (err){
            if (isError(err)) {
                setError(err.message);
            } else {
                setError('An unknown error occurred while fetching cats');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect (() => {
        let isMounted = true;

        const loadCats = async() => {
            try{
                setLoading(true);
                setError('');
                const cats: Cat[] = await catApi.getCatJson(tags);
                if (isMounted) {
                    setCats(cats);
                }
            } catch (err){
                if (isMounted) {
                    if (isError(err)) {
                        setError(err.message);
                    } else{
                        setError('An unknown error occurred while loading cats');
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadCats();

        return () => {
            isMounted = false;
        };
        
    }, []);

    return { cats, loading, error, refetch: fetchCats };
}

export function useCatTags(){
    const[tags, setTags] = useState<string[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string>('');

    useEffect (() => {
        let isMounted = true;

        const fetchTags = async() => {
            try{
                setLoading(true);
                setError('');
                const tags: string[] = await catApi.getCatTag();
                if (isMounted) {
                    setTags(tags);
                }
            } catch(err){
                if (isMounted) {
                    if(isError(err)){
                        setError(err.message);
                    } else{
                        setError('An unknown error occurred while fetching cat tags');
                    }
                    
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchTags();

        return () => {
            isMounted = false;
        };
    }, []);

    return { tags, loading, error };
}